#!/usr/bin/env node
require('make-dir').sync('mbtiles');
const tippecanoe = require('tippecanoe');
const fs = require('fs');
const child_process = require('child_process');
const optionList = [
    { name: 'separate-mbtiles', type: Boolean, defaultValue: false, description: 'Generate individual mbtilesfiles.' },
    { name: 'single-source', type: Boolean, defaultValue: false, description: 'Use a combined allout.geojson file' },
    { name: 'just-join', type: Boolean, defaultValue: false, description: 'Skip generation, just join existing mbtiles.' },
    { name: 'help', type: Boolean, alias: 'h' },

];
require('colors');
let options;
try {
    options = require('command-line-args')(optionList);
} catch (e) {
    console.error(`Error: ${e.name.red} ${e.optionName || ''}` );
    help();
    process.exit(1);
}


const fields = {
    captured: 15,
    class: 15,
    common: 10,
    crown: 13,
    dbh: 13,
    description: 13,
    family: 10,
    genus: 1,
    health: 9,
    height: 13,
    id: 13,
    location: 15,
    maturity: 12,
    planted: 15,
    ref: 13,
    scientific: 10,
    source: 8,
    species: 1,
    species_count: 10,
    structure: 15,
    subclass: 15,
    tree_type: 15,
    ule: 15,
    ule_max: 15,
    ule_min: 15,
    updated: 15,
    variety: 13
}

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
function makeTiles(input, output) {
    tippecanoe(input, {
        // tippecanoe(['tmp/allout.json'], {
            layer:'trees',
            force:true, 
            output,
            minimumZoom: 1,
            maximumZoom: 15,
            baseZoom: 10,
            minimumDetail:7,
            forceFeatureLimit: true,
            rf: 200000 ,
            readParallel: true,
            featureFilter: { 'trees': ['all', 
                ...Object.keys(fields).map(f => [
                    'attribute-filter', 
                    f, 
                    ['>=', '$zoom', fields[f]]
                ])]
            }
        }, { echo: true });
}        

if (options.help) {
    help();
    process.exit(0);
}


const files = fs.readdirSync('out').filter(f => f.match(/\.geojson$/));

if (options['separate-mbtiles'] || options['just-join']) {
    if (options['separate-mbtiles']) {
        console.log('Generating separate mbtiles for each source.');
        for (let file of files) {
            const mbtilesFile = `mbtiles/out-${file.replace(/\..*/, '')}.mbtiles`;
            if (!fs.existsSync(mbtilesFile) || fs.existsSync(`${mbtilesFile}-journal`)) {
                makeTiles(`out/${file}`, mbtilesFile)
            }
        }
    }
    const tilesFiles = fs.readdirSync('mbtiles').filter(f => f.match(/out-.*\.mbtiles$/)).map(f => `mbtiles/${f}`);
    console.log(`Combining ${tilesFiles.length} mbtiles files.`);
    const cmd = `tile-join -f -o mbtiles/trees-wip.mbtiles ${tilesFiles.join(' ')}`;
    console.log(cmd.green);
    child_process.execSync(cmd);


} else if (options['single-source']) {
    console.log('Generating a single mbtiles file from allout.geojson.');
    makeTiles(['tmp/allout.geojson'], 'mbtiles/trees-wip.mbtiles');
    child_process.execSync('mv mbtiles/trees.mbtiles mbtiles/trees-old.mbtiles');
    child_process.execSync('mv mbtiles/trees-wip.mbtiles mbtiles/trees.mbtiles');
    console.log('Tiles now in mbtiles/trees.mbtiles');

} else {
    console.log('Generating a single mbtiles file from many sources.');
    makeTiles(files.map(f => `out/${f}`), 'mbtiles/trees-wip.mbtiles');
    child_process.execSync('mv mbtiles/trees.mbtiles mbtiles/trees-old.mbtiles');
    child_process.execSync('mv mbtiles/trees-wip.mbtiles mbtiles/trees.mbtiles');
    console.log('Tiles now in mbtiles/trees.mbtiles');
}
//

