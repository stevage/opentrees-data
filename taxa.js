const d3= require('d3-dsv');
const fs = require('fs');
const byScientific = {};
const treeSearch = {};
function init() {
    // from https://biodiversity.org.au/nsl/services/export/index
    const text = fs.readFileSync('APC-taxon-2020-02-20-5349.csv', 'utf-8');
    const rows = d3.csvParse(text);
    const includeTaxa = {
        Species: true,
        Subspecies: true,
        Varietas: true,
        Genus: true
    }
    for (const row of rows) {
        if (row.taxonomicStatus === 'accepted' && row.nameType === 'scientific' && row.taxonRank in includeTaxa) {
            byScientific[row.canonicalName] = row;
        }
    }
    console.log(`${Object.keys(byScientific).length} taxa records kept out of ${rows.length}.`);
    
}

function loadTreeSearch() {
    // from https://tools.bgci.org/global_tree_search.php
    const text = fs.readFileSync('global_tree_search_trees_1_3.csv', 'utf-8');
    const rows = d3.csvParse(text);
    for (const row of rows) {
        treeSearch[row['Taxon name']] = true;
    }
    
    console.log(`${Object.keys(treeSearch).length} rows loaded for Global Tree Search.`);
}

init();
loadTreeSearch();

module.exports = {
    taxaForScientific(scientific) {
        return byScientific[scientific];
    },
    hyphens() {
        
        return Object.keys(byScientific).filter(k => k.indexOf('-') >= 0);
    },
    inGlobalTreeSearch(scientific) {
        return treeSearch[scientific];
    }
}
