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
            ref: 'tree_no', // hansen_id?
            scientific: 'species', 
            height: 'height', 
            dbh: 'dbh'
        }, geelong: {
            ...identity, // requires Node 10
            scientific: x => x.genus + ' ' + (x.species || '').toLowerCase(),
            // TODO captured is a date

        }, adelaide: {
            ref: 'Asset Id (identifier)',
            dbh: x => x['Circum (Inspection)'] + ' circumference',
            health: 'Vigour (Inspection)',
            height: 'Height (Inspection)',
            structure: 'Structure (Inspection)',
            maturity: 'Age (Inspection)',
            scientific: 'Species Name (Inspection)',
            common: 'Common Name (Inspection)'
        }, waite_arboretum: {
            ref: 'tree_id',
            scientific: 'scientific',
            common: 'commonname',
            //planted: CASE WHEN length(yearplant::varchar) = 4 THEN to_date(yearplant::varchar, 'YYYY') END AS planted
        }, burnside: {
            ref: 'TreeID',
            common: 'CommonName',
            height: 'TreeHeight',
            scientific: 'BotanicalN',
            dbh: 'Circumfere' // TODO reconcile
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
            // genus: 'genus', // contains rubbish like "Eucalyptus M to Z" whereas scientific is clean.
            scientific: x => x.species.split(' - ')[0],
            common: x => x.species.split(' - ')[1],
            variety: x => x.cultivar !== 'Not Specified' ? x.cultivar : '',
            // house, st_name, st_type, st_suffix, suburb
        }, wyndham: {
            ref: 'tree_id',
            common: 'tree_commo',
            //tree_origin
            //inspection_date
            height: 'height',
            crown: 'canopy_wid',
            // dbh: 'diameter_b',
            dbh: 'diameter_breast_height',
            maturity: 'tree_age',
            health: 'health',
            // ule: 'useful_lif',
            ule: 'useful_life_expectancy',
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
        }, port_phillip: {
            ...identity,
            scientific: 'species'
        }, prospect1: {
            species: 'Tree Species',
            maturity: 'Tree Age',
            dbh: x => x['Tree Circumference'] + ' circumference',
            health: 'Tree Health',
            structure: 'Tree Structure',
            height: 'Tree Height'
        }, prospect2: {
            common: 'Species Name', // sigh
        }, boroondara: {
            species: 'botanicaln',
            common: 'commonname',
            height: 'height',
            crown: 'canopyspre', // canopysp_1?
            health: 'health',
            description: 'significan',
            location: 'locality',
            dbh: x => x.girth + ' girth'
            // suburb, groupid, qty, girth, age, position, risktotree, hazardtopu, streetnr
        }, ryde: {
            height: 'Height' // sad, that's all there is.
        }, ballarat: {
            ...identity,
            genus: () => undefined, // contains same as species, this way it gets generated properly.
            scientific: 'species'
            // aohplaque, maintenance, description
        }, yarra: {
            ...identity,
            species: s => (s.species || '').replace(/^[A-Z]\. /, '')

        }, glen_eira: {
            dbh: 'dbh',
            common: 'common_nam',
            scientific: 'botanical',
            height: 'height',
            crown: 'spread',
            location: 'locationty',

        }, wodonga: {
            ref: 'field_1',
            scientific:'field_2',
            common: 'field_3',
            //address: field_4
        }, sherwood_arboretum: {
            common: 'Common_Name',
            scientific: 'Scientific_Name',
            //Year_Established: '
            family: 'Family',
            height: 'Height',
            crown: 'Crown_width',
            dbh: x => x.DBH / 10 || undefined,
            id: 'ObjectId',
            // "Nature_Conservation_Act_1992": "Least concern"
            // "EPBC_Act_1999": "Not listed"
            // "Australian": "Yes"
            // "Distribution": "N NSW to SEQ"
            // "Habitat": "Coastal areas eucalypt forest and woodland"
            // "Height": "7"
            // "Crown_width": 3
            // "DBH": 100
            // "Species_Profile": "Acacia concurrens commonly known as Black wattle or Curracabah is a tall shrub endemic to eastern Australia growing to a height of up to 10m. The botanic name concurrens describes the converging primary veins on the phyllodes (modified leaf stems which function as leaf). Bright yellow rod-shaped flowers are seen from late winter to early spring.", 
    

        }, sydney: {
            scientific: 'species',
        },
        'pdx-street': {
            scientific: 'Scientific',
            genus: 'Genus',
            family: 'Family',
            common: 'Common',
            health: 'Condition',
            dbh: x => Math.round(x.DBH * 2.54 * 10) / 10, // assume inches
            //Size, Edible, Species_De, DBH, Species (two letters), Planted_By, Plant_Date, Collected_, NEighborho, Address, Functional, Notes, Site_Size,Site_Devel, Wires, Site_Width,Site_Type,
            // { "type": "Feature", "properties": { "OBJECTID": 1, "Date_Inven": "2010-08-21T00:00:00.000Z", "Species": "CO", "DBH": 1.0, "Condition": "Good", "Site_Type": null, "Site_Width": 9.0, "Wires": "High voltage", "Site_devel": "Improved", "Site_Size": "Medium", "Notes": null, "Address": "5234 NE 35TH PL", "Neighborho": "CONCORDIA", "Collected_": "volunteer", "Planted_By": null, "Plant_Date": null, "Scientific": "Cornus spp.", "Family": "Cornaceae", "Genus": "Cornus", "Common": "dogwood", "Functional": "BD", "Size": "S", "Edible": "no", "Species_De": null }, "geometry": { "type": "Point", "coordinates": [ -122.627555010562858, 45.561116824606664 ] } },
        }, 'pdx-park': {
            dbh: x => Math.round(x.DBH * 2.54 * 10) / 10, // assume inches
            height: x => Math.round(x.HEIGHT / 3.280084 * 10) / 10, // assume feet
            health: 'Condition',
            crown: 'CrownWidth', // inches??
            family: 'Family',
            genus: 'Genus',
            scientific: 'Genus_spec',
            common: 'Common_nam',
            description: 'Species_fa',
            // lots more
        },
        'nyc': {
            ref: 'tree_id',
            dbh: x => x.tree_dbh * 2.54,
            scientific: 'spc_latin',
            common: 'spc_common',
            health: 'health',
            // sooo many other fields.

        },
        'washington-dc': {
            dbh: x => x.DBH * 2.54, 
            common: 'COMMON.NAME',
            scientific: 'SCI_NM',
            planted: 'DATE_PLANT',
            family: 'FAM_NAME',
            // simpler to not populate genus and have it extracted from scientific
            // genus: 'GENUS_NAME',
            description: 'TREE_NOTES',
            health: 'CONDITION',
            // maybe ref: 'FACILITYID'


        },
        'barcelona': {
            description: 'NOM_CASTELLA', // there's also NOM_CATALA. Don't think it makes sense to use as common name...
            scientific: 'NOM_CIENTIFIC',
            planted: 'DATA_PLANTACIO',
            ref: 'CODI',
            crown: x => ({ PETITA: 'small', MITJANA: 'average', GRAN: 'large' }[x.ALCADA] || x.ALCADA),
            dbh: 'MIDA_ESCOCELL', // maybe? literally translates as "scottish size"??
            // ALCADA (reach): PETITA (small), MITJANA (average), GRAN (big)
        },
        london: {
            ref: 'gla_id',
            scientific: 'species_name',
            common: 'common_name',
            description: 'display_name',
            //gla_id,borough,species_name,common_name,display_name,load_date,easting,northing,longitude,latitude

        }
        


        
    
    }[source] || {};

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

function countSpecies(tree) {
    if (tree.genus && tree.species) {
        taxoCount.species[tree.genus + ' ' + tree.species] = 1 + (taxoCount.species[tree.genus + ' ' + tree.species] || 0)
    }
    if (tree.family) {
        taxoCount.class [tree.class] = 1 + (taxoCount.class[tree.class] || 0);
        taxoCount.subclass [tree.subclass] = 1 + (taxoCount.subclass[tree.subclass] || 0);
        taxoCount.family[tree.family] = 1 + (taxoCount.family[tree.family] || 0);

    }
}

function addSpeciesCount(tree) {
    if (tree.genus && tree.species) {
        tree.species_count = taxoCount.species[tree.genus + ' ' + tree.species];
    }
}

function showSpeciesCounts() {
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
let outTrees = [],
    taxoCount = { class: {}, subclass: {}, family: {}, genus: {}, species: {} };

async function loadSource(source) {
    // const outName = `out/${source.id}.geojson`
    // if (fs.existsSync(outName)) {
    //     console.log(`Skipping ${outName}`);
    // }
    const data = await readJson(`tmp/out_${source.id}.geojson`)

    let delCount = 0;
    console.log(source.id + ': ' + data.features.length);
    // const outTrees = [];
    
    try {
        for (let tree of data.features) {
            if (!tree.geometry) {
                continue;
            }
            tree = processTree(source.id, tree);
            cleanTree(tree.properties);
            if (tree.properties._del) {
                delCount ++;
                continue;
            }
            addTaxa(tree.properties);
            countSpecies(tree.properties);
            outTrees.push(tree);
        }
        if (delCount > 0) {
            console.log(`Dropped ${delCount} from ${source.id}`);
        }
        // fsNdjson.writeFile(outName, outTrees);
    } catch(e){
        console.error(`Error loading ${source.id}`.red);
        console.error(e);
    }
}

function loadSources() {
    require('make-dir').sync('out');
    return Promise.all(sources
        // .filter(s => s.id === 'nyc')
        .map(loadSource));
}

async function process() {
    await loadSources();
    // process.exit(0);
    // return;
    const out = fs.createWriteStream('tmp/allout.json').on('error', console.error);
    // process.stdout.write('Writing out: ');
    console.log('Writing out: ');
    outTrees.forEach(tree => {
        addSpeciesCount(tree.properties);
        out.write(JSON.stringify(tree) + '\n');
    });
    showSpeciesCounts();
    showBadSpeciesCounts();
    const notOpenCount = 31589; // Sydney
    console.log(`${(outTrees.length - notOpenCount).toLocaleString()} open data trees from ${Object.keys(sources).length - 1} sources.`);
    console.log('\nDone.');
}

process();