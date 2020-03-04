#!/usr/bin/env node --max-old-space-size=8192
const fs = require('fs');
const ndjson = require('ndjson');
const taxoCount = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };

function countSpecies({properties:tree}) {
    if (tree.genus && tree.species) {
        taxoCount.species[tree.genus + ' ' + tree.species] = 1 + (taxoCount.species[tree.genus + ' ' + tree.species] || 0)
    }
    if (tree.family) {
        taxoCount.class [tree.class] = 1 + (taxoCount.class[tree.class] || 0);
        taxoCount.subclass [tree.subclass] = 1 + (taxoCount.subclass[tree.subclass] || 0);
        taxoCount.family[tree.family] = 1 + (taxoCount.family[tree.family] || 0);
    }
}

fs.createReadStream(`tmp/allout.json`)
    .pipe(ndjson.parse())
    .on('data', countSpecies)
    .on('end', () => {
        fs.writeFile('taxoCount.json', JSON.stringify(taxoCount), () => 'taxoCount.json written')
        for (let type of ['class','subclass','family','species']) {
            console.log(`*** ${type} ***`);
            console.log(
                Object.keys(taxoCount[type])
                    .sort((a, b) => taxoCount[type][b] - taxoCount[type][a])
                    .slice(0, 20)
                    .map(k => k + ': ' + taxoCount[type][k])
                    .join('\n')
                );
        }
        
    });

