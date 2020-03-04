#!/usr/bin/env node --max-old-space-size=8192
const fs = require('fs');
const ndjson = require('ndjson');
const taxoCount = require('./taxoCount.json');
const perf = require('execution-time')();
const child_process = require('child_process');
function addSpeciesCount(tree) {
    if (tree.genus && tree.species) {
        tree.species_count = taxoCount.species[tree.genus + ' ' + tree.species];
    }
}

async function process() {
    const out = fs.createWriteStream('tmp/allout-species.json').on('error', console.error);
    console.log('Adding species counts.');
    perf.start('process');


    fs.createReadStream(`tmp/allout.json`)
    .pipe(ndjson.parse())
    .on('data', tree => {
        addSpeciesCount(tree.properties);
        out.write(JSON.stringify(tree) + '\n');
    })
    .on('error', e => {
        console.error(e)
    })
    .on('end', () => {
        console.log(`Added species counts in ${perf.stop('process').words}, renaming files.`);


        child_process.execSync('mv tmp/allout.json tmp/allout-without-species.json');
        child_process.execSync('mv tmp/allout-species.json tmp/allout.json');
        
        
    })
}

process();