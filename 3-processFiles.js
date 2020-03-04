#!/usr/bin/env node --max-old-space-size=8192
/* jshint esnext:true */
// const glob = require('glob');
const fs = require('fs');
// const processTree = require('./3-processTree');
const jsonfile = require('jsonfile');
const readJson = require ('util').promisify(jsonfile.readFile);
const colors = require('colors');

let sources = require('./sources');
const cleanTree = require('./cleanTree');
const taxa = require('./taxa');
const ndjson = require('ndjson');
const fsNdjson = require('fs-ndjson');
const child_process = require('child_process');
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
    // let identity = {};
    // Object.keys(src).forEach(p => identity[p] = p);

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
        tree.species_count = taxoCount.species[tree.genus + ' ' + tree.species];
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


console.log('Combining temporary files in tmp/out_* into processed tmp/allout.json');
let taxoCount = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };

try {
    taxoCount = require('./taxoCount.json');
} catch(e) {
    console.warn("No taxoCount.json found. Regenerate it after processing with 3a-updateTaxoCount.js.");
}

async function loadSource(source, out) {
    // const outName = `out/${source.id}.geojson`
    // if (fs.existsSync(outName)) {
    //     console.log(`Skipping ${outName}`);
    // }
    let keepCount = 0, delCount = 0, noGeomCount=0;
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(`tmp/out_${source.id}.nd.geojson`)
            .pipe(ndjson.parse())
            .on('data', tree => {
                try {
                    if (source.id === 'oakland') {
                        // dear god why
                        tree.geometry = {
                            type: 'Point',
                            coordinates: tree.properties['Location 1'].split('\n').reverse()[0].split(/[(), ]/).filter(Number).map(Number).reverse()
                        }
                        if (tree.geometry.coordinates.length < 1) {
                            tree.geometry = null;
                        }
                    }
                    if (!tree.geometry) {
                        noGeomCount ++;
                        return;
                    } else if (tree.geometry.type === 'Point') {
                        const [x, y] = tree.geometry.coordinates;
                        if (!source.bounds) {
                            source.bounds = [x, y, x, y];
                        }
                        const [x1, y1, x2, y2] = source.bounds;
                        source.bounds = [Math.min(x, x1), Math.min(y, y1), Math.max(x, x2), Math.max(y, y2)];
                    }
                    tree = processTree(source.id, tree);
                    cleanTree(tree.properties);
                    if (tree.properties._del) {
                        delCount ++;
                        return;
                    }
                    addTaxa(tree.properties);
                    addSpeciesCount(tree.properties);

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

                resolve();
            })
            // .pipe(out);
        });

}

function loadSources(out) {
    require('make-dir').sync('out');
    return Promise.all(sources
        // .filter(s => s.id === 'nyc')
        .map(source => loadSource(source, out)));
}

let totalCount = 0;
function writeSources() {
    const sourcesOut = sources.map(s => {
        const os = JSON.parse(JSON.stringify(s));
        for (const k of Object.keys(s.crosswalk || {})) {
            os.crosswalk[k] = String(s.crosswalk[k])
        }
        return os;
    });

    fs.writeFileSync('sources-out.json', JSON.stringify(sourcesOut, null, 2));
}
async function process() {
    const outFile = fs.createWriteStream('tmp/allout.json').on('error', console.error);
    await loadSources(outFile);
    console.log('Writing out: ');
    showBadSpeciesCounts();
    const notOpenCount = 31589; // Sydney
    const stats = {
        sources: sources.length,
        keptTrees: totalCount,
        openTrees: totalCount - notOpenCount,
        countries: [...(new Set(sources.map(s => s.country).filter(Boolean))).keys()]
    }
    fs.writeFileSync('./stats.json', JSON.stringify(stats));
    console.log(`${stats.openTrees.toLocaleString()} open data trees from ${stats.sources} sources.`);
    console.log('\nDone.');
    writeSources();
    child_process.execSync('cp stats.json ../opentrees/src');
    child_process.execSync('cp sources-out.json ../opentrees/src');
}

process();