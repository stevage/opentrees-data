#!/usr/bin/env node --max-old-space-size=8192
// const glob = require('glob');
const fs = require('fs');
// const processTree = require('./3-processTree');
const jsonfile = require('jsonfile');

let sources = require('./sources.json');
const cleanTree = require('./cleanTree');
// sources = 'melbourne ballarat'.split(' ').map(x => ({ id: x }));

//glob('out_*.geojson', {}, files => {
//    files.forEach(file => {


/* Given a GeoJSON feature, return a different one. */
function processTree(source, tree) {
    var src = tree.properties;
    
    var props = tree.properties = {
        source: source
    };
    let identity = {};
    Object.keys(tree.properties).forEach(p => identity[p] = p);
    const crosswalk = {
        ryde: {
            height: 'height',
        },
        melbourne: {
            ref: 'com_id',
            common: 'Common Name',
            scientific: 'Scientific Name',
            dbh: 'Diameter Breast Height',
            //planted: x => processDate(x['date planted']),
            planted: 'Date Planted',
            maturity: 'Age Description',
            ule_min: 'Useful Life Expectency',
            location: 'Located In'
        },
        southern_grampians: {
            ref: 'ref',
            scientific: 'species',
            common: 'common',
            location: 'location',
            height:'height',
            crown: 'crown',
            maturity:'maturity'
        }, colac_otways: {
            ref: 'tree_id',
            genus: 'genus_desc',
            species: 'spec_desc',
            scientific: x => `${x.genus_desc} ${x.spec_desc}`.trim(),
            common: 'common_nam',
            location: x => x.location_t.split(' ')[1],
            height: 'height_m',
            crown: 'canopy_wid',
            dbh: 'diam_breas',
            // planted: CASE WHEN length(year_plant::varchar) = 4 THEN to_date(year_plant::varchar, 'YYYY') END AS planted,
            maturity: 'life_stage'
        }, corangamite: {
            ref: 'id',
            height: 'height',
            crown: 'width',
            scientific: 'species',
            common: 'name',
            location: x => ({ 'STREET TREE': 'street', 'PARK TREE': 'park' }[x.tree_type] || '')
        }, manningham: {
            captured: 'date1',  // TODO YYYY-MM-DD
            ref: 'tree_no', 
            scientific: 'species', 
            height: 'height', 
            dbh: 'dbh'
        }, geelong: {
            ...identity,
            scientific: x => x.genus + ' ' + (x.species || '').toLowerCase(),
            // TODO captured is a date

        }, adelaide: {
            ref: 'asset id (identifier)',
            dbh: 'circum (inspection)',
            health: 'vigour (inspection)',
            height: 'height (inspection)',
            structure: 'structure (inspection)',
            maturity: 'age (inspection)',
            scientific: 'species name (inspection)',
            common: 'common name (inspection)'
        }, waite_arboretum: {
            ref: 'tree_id',
            scientific: 'scientific',
            common: 'commonname',
            //planted: CASE WHEN length(yearplant::varchar) = 4 THEN to_date(yearplant::varchar, 'YYYY') END AS planted
        }, burnside: {
            ref: 'id',
            common: 'commonname',
            maturity: 'treeage',
            height: 'treeheight'
        }, launceston: {
            ref: 'objectid',
            common: 'name',
            scientific: 'genusspeci',
            maturity: 'age',
            // planted: '', case when planteddat = '0' then NULL else planteddat::date end,
            dbh: 'diametr_c',
            height: 'height_m',
            crown: 'horizontal',
            health: 'vitality',
            captured: 'auditdate' // TODO date
        }, hobsons_bay: {
            genus: 'Genus',
            species: 'Species',
            dbh: 'DBH',
            tree_type: 'Type'
        }, glenelg: {
            ...identity
        }, perth: {
            ref: 'Tree_ID',
            common: 'Common_Nam',
            scientific: 'Botanical',
            family: 'Family',
            height: 'Height',
            health: 'Health',
            structure: 'Structure',
            maturity: 'Age_Class',
            //ule_ Life_Expec

        },
        shepparton: {
            ...identity
        }, brimbank: {
            ref: 'central_as',
            location: 'location',
            genus: 'genus',
            species: 'species',
            common: 'common_nam',
            maturity: 'age',
            height: 'height',
            crown: 'spread',
            // site_name, suburb...
        }, bendigo: {
            ref: 'assetid',
            description: 'desc',
            //type
            genus: 'genus',
            species: 'species',
            variety: 'cultivar',
            // house, st_name, st_type, st_suffix, suburb
        }, wyndham: {
            ref: 'tree_id',
            common: 'tree_commo',
            //tree_origin
            //inspection_date
            height: 'height',
            crown: 'canopy_wid',
            dbh: 'diameter_b',
            maturity: 'tree_age',
            health: 'health',
            ule: 'useful_lif',
            structure: 'structure'
        }, perth: {
            ref: 'tree_id',
            scientific: 'botanical',
            common: 'common_nam',
            family: 'family',
            height: 'height',
            dbh: 'dbh',
            crown: 'canopy_siz',
            maturity: 'age_class',
            ule: 'life_expec'
            //historical, rare_speci, canopy_den, est_age, prop_name, suburb, street_nam
        }




        /*ballarat: {
            scientific: 'species',
            crown: 'crown',
            ref: 'ref',
            common: 'common',
            location: 'maturity',
            maturity: '',
            health: '',
            structure: '',
            variety: '',
            description: '',
            ule_min: '',
            ule_max
        }*/
    
    }[source] || {};
    // TODO scrap all non-standard fields (esp lat, lon, ...)

    // TODO support standard datasets:
    /*
    ballarat

    */

    Object.keys(crosswalk).forEach(prop => {
        let val = (typeof crosswalk[prop] === 'function') ? crosswalk[prop](src) : src[crosswalk[prop]];
        tree.properties[prop] = val;
    });
    delete(tree.lat);
    delete(tree.lon);
    return tree;
}

function countSpecies(tree) {
    if (tree.genus && tree.species) {
        if (!speciesCount[tree.genus]) {
            speciesCount[tree.genus] = {};
        }
        speciesCount[tree.genus][tree.species] = 1 + (speciesCount[tree.genus][tree.species] || 0);
    }
}

function addSpeciesCount(tree) {
    if (tree.genus && tree.species) {
        tree.species_count = speciesCount[tree.genus][tree.species];
    }
}

console.log('Combining temporary files in tmp/out_* into processed tmp/allout.json');
let speciesCount = {}, outTrees = [];
sources.forEach(source => {
    let trees;
    try {
        trees = jsonfile.readFileSync('tmp/out_' + source.id + '.geojson').features;
    } catch (e) { 
        return;
    }    
    console.log(source.id + ': ' + trees.length);
    trees.forEach(tree => {
        // console.log('yerp');
        tree = processTree(source.id, tree);
        if (tree.properties._del) {
            return;
        }
        cleanTree(tree.properties);
        countSpecies(tree.properties);
    });
    outTrees.push(trees);
    console.log('Processed ' + source.id);

});
const out = fs.createWriteStream('tmp/allout.json').on('error', console.error);
process.stdout.write('Writing out: ');
outTrees.forEach(trees => {
    trees.forEach(tree => {
        addSpeciesCount(tree.properties);
        if (!tree.properties._del) {
            out.write(JSON.stringify(tree) + '\n');
        }
    });
    process.stdout.write('*');
});
console.log('\nDone.');