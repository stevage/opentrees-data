#!/usr/bin/env node --max-old-space-size=8192
/* jshint esnext:true */
// const glob = require('glob');
const fs = require('fs');
// const processTree = require('./3-processTree');
const jsonfile = require('jsonfile');
const readJson = require ('util').promisify(jsonfile.readFile);
const colors = require('colors');

const cleanTree = require('./cleanTree');
const taxa = require('./taxa');
const ndjson = require('ndjson');
const fsNdjson = require('fs-ndjson');
const child_process = require('child_process');


const optionList = [
    { name: 'allout', type: Boolean, defaultValue: false, description: 'Use a combined allout.geojson file' },
    { name: 'help', type: Boolean, alias: 'h' },

];
let options;
function help() {
    console.log(require('command-line-usage')([
        {
            header: require('path').basename(process.argv[1]),
            content: 'Convert geojson files to vector tiles.',

        }, {
            header: 'Usage',
            optionList
        }
    ]));
}

try {
    options = require('command-line-args')(optionList);
    if (options.help) {
        help();
        process.exit(0);
    }    
} catch (e) {
    console.error(`Error: ${e.name.red} ${e.optionName || ''}` );
    help();
    process.exit(1);
}




let sources = require('./sources');

let sourceStats = {};
try {
    sourceStats = require('./source-stats.json');
} catch (e) {
    console.warn('Starting new source-stats.json');
}
sources.forEach(s => sourceStats[s.id] = sourceStats[s.id] || {});

// sources = 'melbourne ballarat'.split(' ').map(x => ({ id: x }));

//glob('out_*.geojson', {}, files => {
//    files.forEach(file => {

const identity = {
    scientific: 'scientific',
    common: 'common',
    species: 'species',
    genus: 'genus',
    variety: 'variety',
    description: 'description',
    dbh: 'dbh',
    crown: 'crown',
    height: 'height',
    maturity: 'maturity',
    health: 'health',
    structure: 'structure',
    location: 'location',
    ref: 'ref',
    planted: 'planted',
    updated: 'updated',
    ule: 'ule',
    ule_min: 'ule_min',
    ule_max: 'ule_max'

}
/* Given a GeoJSON feature, return a different one. */
function processTree(source, tree) {

    const crosswalk = sources.find(s => s.id === source).crosswalk || {};

    var origProps = tree.properties;    
    if (tree.geometry.type === 'Point') {
        tree.geometry.coordinates = tree.geometry.coordinates.slice(0,2);
    }// do we actually want polygons?
    tree = {
        type: 'Feature',
        geometry: tree.geometry,
        properties: {
            source
        }
    };

    for (const prop of Object.keys(crosswalk)) {
        let val = (typeof crosswalk[prop] === 'function') ? crosswalk[prop](origProps) : origProps[crosswalk[prop]];
        if (val !== undefined) {
            tree.properties[prop] = val;
        }
    };
    return tree;
}

function addTaxa(tree) {
    if (tree.species) {
        const taxaData = taxa.taxaForScientific(tree.genus + ' ' + tree.species);
        if (taxaData) {
            tree.class = taxaData.class;
            tree.subclass = taxaData.subclass;
            tree.family = taxaData.family;
        }
    }

}

function addSpeciesCount(tree) {
    if (tree.genus && tree.species) {
        const scientific = tree.genus + ' ' + tree.species;
        tree.species_count = taxoCount.species[scientific];
        
        sourceTaxoCount[tree.source].species[scientific] = 1 + (sourceTaxoCount[tree.source].species[scientific] || 0);
    }
}

function showBadSpeciesCounts() {
    // console.log('*** Bad species (not in Global Tree Search) ***');
    const text=Object.keys(taxoCount.species)
        .filter(species => !taxa.inGlobalTreeSearch(species))
        .sort((a, b) => taxoCount.species[b] - taxoCount.species[a])
        // .slice(0, 40)
        .map(k => k + ': ' + taxoCount.species[k])
        .join('\n');
    fs.writeFileSync('bad-species.txt', text);    
    console.log('Wrote bad-species.txt');
};


console.log(`Combining temporary files in tmp/out_* into ${options.allout ? 'tmp/allout.json' : 'out/*.nd.geojson'}`);
let taxoCount = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };
let sourceTaxoCount = {};

try {
    taxoCount = require('./taxoCount.json');
} catch(e) {
    console.warn("No taxoCount.json found. Regenerate it after processing with 3a-updateTaxoCount.js.".yellow);
}

try {
    sourceTaxoCount = require('./sourceTaxoCount.json');
} catch(e) {
    console.warn("No sourceTaxoCount.json found.".yellow);
}


async function loadSource(source, out) {
    // const outName = `out/${source.id}.geojson`
    // if (fs.existsSync(outName)) {
    //     console.log(`Skipping ${outName}`);
    // }
    let keepCount = 0, delCount = 0, noGeomCount=0;
    // let speciesCounts = {}; // per source counts // to be removed
    const inName = `tmp/out_${source.id}.nd.geojson`;
    if (!fs.existsSync(inName)) {
        console.log(`${inName.cyan} doesn't exist - run 2-loadTrees again.`);
    }

    return new Promise((resolve, reject) => {
        sourceTaxoCount[source.id] = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };
        fs.createReadStream(inName)
            .pipe(ndjson.parse())
            .on('data', tree => {
                try {
                    if (source.coordsFunc) {
                        tree.geometry = {
                            type: 'Point',
                            coordinates: source.coordsFunc(tree.properties)
                        }
                        if (!tree.geometry.coordinates || tree.geometry.coordinates.length < 1) {
                            tree.geometry = null;
                        }
                    }
                    if (source.delFunc && source.delFunc(tree.properties, tree)) {
                        delCount ++;
                        return;
                    }
                    if (!tree.geometry) {
                        noGeomCount ++;
                        return;
                    } else if (tree.geometry.type === 'Point') {
                        const [x, y] = tree.geometry.coordinates;
                        if (!sourceStats[source.id].bounds) {
                            sourceStats[source.id].bounds = [x, y, x, y];
                        }
                        const [x1, y1, x2, y2] = sourceStats[source.id].bounds;
                        sourceStats[source.id].bounds = [Math.min(x, x1), Math.min(y, y1), Math.max(x, x2), Math.max(y, y2)];
                    }
                    tree = processTree(source.id, tree);
                    cleanTree(tree.properties);
                    if (tree.properties._del) {
                        delCount ++;
                        return;
                    }
                    addTaxa(tree.properties);
                    addSpeciesCount(tree.properties);
                    // if (tree.properties.genus && tree.properties.species) {
                    //     speciesCounts[tree.properties.genus + ' ' + tree.properties.species] = 1 + (speciesCounts[tree.properties.genus + ' ' + tree.properties.species] || 0)
                    // }
            
                
                    keepCount ++;
                    totalCount ++;
                    out.write(JSON.stringify(tree) + '\n');
                } catch(e){
                    console.error(`Error loading ${source.id}`.red);
                    console.error(e);
                    reject(); // does the stream continue?
        
                }
            })
            .on('error', e => {
                console.error(source.id, e)
            })
            .on('end', () => {
                console.log(`Processed ${keepCount} from ${source.id.cyan} (dropped ${delCount}, ${noGeomCount} had no geometry)`);
                sourceStats[source.id] = {
                    ...sourceStats[source.id],
                    keepCount,
                    delCount,
                    noGeomCount,
                    differentSpecies: Object.keys(sourceTaxoCount[source.id].species).length,
                    speciesCounts: Object.keys(sourceTaxoCount[source.id].species)
                        .filter(species => sourceTaxoCount[source.id].species[species] > keepCount / 100) // keep any species that is at least X% of the total
                        .map(species => [species, sourceTaxoCount[source.id].species[species]])
                        .sort(([a_, countA], [b, countB]) => countB - countA)
                };
                

                resolve();
            })
            // .pipe(out);
        });

}


// TODO support writing each source to its own outfile then merging later.
async function loadSources() {
    let skipCount = 0;
    require('make-dir').sync('out');
    let outFile;
    if (options.allout) {
        outFile = fs.createWriteStream('tmp/allout.json').on('error', console.error);
    }
    await Promise.all(sources
        // .filter(s => s.id.match(/haag/))
        .map(source => {
            if (options.allout) {
                return loadSource(source, outFile);
            } else {
                const outName = `out/${source.id}.nd.geojson`
                
                if (!fs.existsSync(outName)) {
                    const localOutfile = fs.createWriteStream(outName).on('error', console.error);
                    return loadSource(source, localOutfile);
                } else {
                    skipCount ++
                }
            }
        }))
    console.log(`Skipped ${skipCount} sources.`);
    return skipCount;
}

const perf = require('execution-time')();
perf.start('process');

let totalCount = 0;
async function process() {
    let skipped = await loadSources();
    if (skipped > 0) {
        console.log ('Not writing out stats tables due to skipped processing.');
        
    } else {
        console.log('Writing out: ');
        // TOOD make this work on per-source basis
        showBadSpeciesCounts(); 
    }
    
    const stats = {
        sources: sources.length,
        keptTrees: sources.reduce((total, {id}) => total + sourceStats[id].keepCount, 0),
        countries: [...(new Set(sources.map(s => s.country).filter(Boolean))).keys()]
    };
    const notOpenCount = 31589; // Sydney
    stats.openTrees = stats.keptTrees - notOpenCount;
    fs.writeFileSync('./stats.json', JSON.stringify(stats));
    console.log(`${stats.openTrees.toLocaleString()} open data trees from ${stats.sources} sources.`);

    fs.writeFileSync('./source-stats.json', JSON.stringify(sourceStats, null, 2));
    fs.writeFileSync('./sourceTaxoCount.json', JSON.stringify(sourceTaxoCount, null, 2));
    console.log(`\nDone in ${perf.stop('process').words}.`);
    require('./export-sources');
    require('./3a-mergeTaxoCounts');
}

process();