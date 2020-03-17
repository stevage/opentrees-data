#!/usr/bin/env node --max-old-space-size=8192
const fs = require('fs');
const ndjson = require('ndjson');
const sourceTaxoCount = require('./sourceTaxoCount.json');
const taxoCount = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };

for (const count of Object.values(sourceTaxoCount)) {
    for (const level of Object.keys(count)) {
        for (const taxon of Object.keys(count[level])) {
            taxoCount[level][taxon] = count[level][taxon] + (taxoCount[level][taxon] || 0);
        }
    }
}
const outFile = 'taxoCount.json'
fs.writeFileSync(outFile, JSON.stringify(taxoCount));
console.log(`${outFile} written.`);