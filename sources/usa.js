const FEET = 3.280084;
const INCHES = 2.54;

function numeric(x) {
    return Number.isFinite(x) ? x : null;
}

function inches(field) {
    return tree => numeric(Number(tree[field]) * 2.54);
}

function feet(field) {
    return tree => numeric(Number(tree[field]) / 3.280084);
}

module.exports = [
{
    id: 'madison',
    download: 'https://opendata.arcgis.com/datasets/b700541a20e446839b18d62426c266a3_0.zip',
    format: 'zip',
    short: 'Madison',
    country: 'USA',
    filename: 'Street_Trees.shp',
    crosswalk: {
        common: 'SPECIES',
        dbh: x => Number(x.DIAMETER) * INCHES
    }
},
{
    id: 'pdx-street',
    download: 'https://opendata.arcgis.com/datasets/eb67a0ad684d4bb6afda51dc065d1664_25.zip',
    format: 'zip',
    filename: 'Street_Trees.shp',
    short: 'Portland',
    long: 'Portland, Oregon',
    country: 'USA',
    crosswalk: {
        scientific: 'Scientific',
        genus: 'Genus',
        family: 'Family',
        common: 'Common',
        health: 'Condition',
        dbh: x => Math.round(x.DBH * 2.54 * 10) / 10, // assume inches
        note: 'Notes',
        //Size, Edible, Species_De, DBH, Species (two letters), Planted_By, Plant_Date, Collected_, NEighborho, Address, Functional, Notes, Site_Size,Site_Devel, Wires, Site_Width,Site_Type,
        // { 'type': 'Feature', 'properties': { 'OBJECTID': 1, 'Date_Inven': '2010-08-21T00:00:00.000Z', 'Species': 'CO', 'DBH': 1.0, 'Condition': 'Good', 'Site_Type': null, 'Site_Width': 9.0, 'Wires': 'High voltage', 'Site_devel': 'Improved', 'Site_Size': 'Medium', 'Notes': null, 'Address': '5234 NE 35TH PL', 'Neighborho': 'CONCORDIA', 'Collected_': 'volunteer', 'Planted_By': null, 'Plant_Date': null, 'Scientific': 'Cornus spp.', 'Family': 'Cornaceae', 'Genus': 'Cornus', 'Common': 'dogwood', 'Functional': 'BD', 'Size': 'S', 'Edible': 'no', 'Species_De': null }, 'geometry': { 'type': 'Point', 'coordinates': [ -122.627555010562858, 45.561116824606664 ] } },
    },
},
{
    id: 'pdx-park',
    download: 'https://opendata.arcgis.com/datasets/83a7e3f6a1d94db09f24849ee90f4be2_220.zip?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D&session=undefined',
    format: 'zip',
    filename: 'Parks_Tree_Inventory.shp',
    short: 'Portland, Oregon',
    long: 'Portland, Oregon',
    country: 'USA',
    crosswalk: {
        dbh: x => Math.round(x.DBH * 2.54 * 10) / 10, // assume inches
        height: x => Math.round(x.HEIGHT / 3.280084 * 10) / 10, // assume feet
        health: 'Condition',
        crown: 'CrownWidth', // inches??
        family: 'Family',
        // genus: 'Genus',
        scientific: 'Genus_spec',
        common: 'Common_nam',
        description: 'Species_fa',
        // lots more
    },
    primary: 'pdx-street',
},
{
    id: 'nyc',
    download: 'https://data.cityofnewyork.us/api/views/uvpi-gqnh/rows.csv?accessType=DOWNLOAD',
    format: 'csv',
    filename: 'nyc.vrt',
    short: 'New York',
    long: 'New York City',
    country: 'USA',
    crosswalk: {
        ref: 'tree_id',
        dbh: x => x.tree_dbh * 2.54,
        scientific: 'spc_latin',
        common: 'spc_common',
        health: 'health',
        // sooo many other fields.

    },
},
// TODO there is a lat lon buiried in "Property Address" field
{
    id: 'providence',
    download: 'https://data.providenceri.gov/api/views/uv9w-h8i4/rows.csv?accessType=DOWNLOAD',
    format: 'csv',
    short: 'Providence',
    long: 'Providence, Rhode Island',
    coordsFunc: x => x['Property Address'].split('\n').reverse()[0].split(/[(), ]/).filter(Number).map(Number).reverse(),
    crosswalk: {
        scientific: 'Species',
        dbh: x => Number(x['Diameter in Inches']) * INCHES
    },
    centre: [-71.43, 41.83],
},
{
    id: 'washington-dc',
    download: 'https://opendata.arcgis.com/datasets/f6c3c04113944f23a7993f2e603abaf2_23.zip',
    format: 'zip',
    filename: 'Urban_Forestry_Street_Trees.shp',
    short: 'Washington DC',
    long: 'Washington DC',
    country: 'USA',
    centre: [-77, 38.92],
    crosswalk: {
        dbh: x => x.DBH * 2.54, 
        common: 'COMMON.NAME',
        scientific: 'SCI_NM',
        planted: 'DATE_PLANT',
        family: 'FAM_NAME',
        // simpler to not populate genus and have it extracted from scientific
        // genus: 'GENUS_NAME',
        note: 'TREE_NOTES',
        health: 'CONDITION',
        // maybe ref: 'FACILITYID'


    },
},

{
    id: 'buffalo-ny',
    download: 'https://data.buffalony.gov/api/views/n4ni-uuec/rows.csv?accessType=DOWNLOAD',
    format: 'csv',
    short: 'Buffalo',
    long: 'City of Buffalo, NY',
    country: 'USA',
    crosswalk: {
        scientific: 'Botanical Name',
        common: 'Common Name',
        dbh: x => Number(x.DBH) * 2.54, // assuming
        id: 'Site ID',   
    },
},
// {
    // these seem to be included in london already, in better quality.
//     id: 'camden-uk',
//     download: 'https://opendata.camden.gov.uk/api/views/csqp-kdss/rows.csv?accessType=DOWNLOAD',
//     format: 'csv',
//     short: 'Camden',
//     long: 'Camden Council, UK'
        // crosswalk: {
        //     scientific: 'Scientific Name',
        //     common: 'Common Name',
        //     height: 'Height in Metres',
        //     spread: 'Spread in Metres',
        //     dbh: 'Diameter In Centimetres At Breast Height',
        //     maturity: 'Maturity',
        //     health: 'Physiological Condition',
        //     id: 'Identifier'

        // },

// },
{
    id: 'san_francisco',
    // download: 'https://data.sfgov.org/api/geospatial/tkzw-k3nq?method=export&format=GeoJSON',
    download: 'https://data.sfgov.org/api/views/337t-q2b4/rows.csv?accessType=DOWNLOAD',
    format:'csv',
    short: 'San Francisco',
    long: 'City of San Francisco',
    country: 'USA',
    crosswalk: {
        id: 'TreeID',
        scientific: x => String(x.qSpecies).split(' :: ')[0],
        common:  x => String(x.qSpecies).split(' :: ')[1],
        description: 'qSiteInfo',
        dbh: x => Number(x.DBH) * 2.54, // assuming
        planted: 'PlantDate',


        // also qLegalStatus (private/DPW), qCaretaker, PlantType
    }, 
    centre: [-122.435, 37.77],

}, 
{
    id: 'philadelphia',
    download: 'http://data.phl.opendata.arcgis.com/datasets/957f032f9c874327a1ad800abd887d17_0.csv',
    format: 'csv',
    short: 'Philadelphia',
    long: 'City of Philadelphia',
    country: 'USA',
    crosswalk: {
           // Species, Status, DBH fields but they are all blank. bleh.
    }
}, 
{
    id: 'denver',
    download: 'https://data.colorado.gov/api/views/wz8h-dap6/rows.csv?accessType=DOWNLOAD',
    format: 'csv',
    short: 'Denver',
    country: 'USA',
    crosswalk: {
        ref: 'SITE_ID',
        scientific: 'SPECIES_BO',
        common: 'SPECIES_CO',
        dbh: 'DIAMETER',
        location: 'LOCATION_NAME',

    },
    centre: [-104.9454,39.7273],
    
}, 
{
    id: 'boulder',
    country: 'USA',
    download: 'https://opendata.arcgis.com/datasets/dbbae8bdb0a44d17934243b88e85ef2b_0.zip',
    info: 'https://data-boulder.opendata.arcgis.com/datasets/dbbae8bdb0a44d17934243b88e85ef2b_0',
    format: 'zip',
    short: 'Boulder',
    long: 'City of Boulder, Colorado',
    filename: 'Tree_Inventory.shp',
    crosswalk: {
        scientific: 'LATINNAME',
        common: 'COMMONNAME',
        variety: 'CULTIVAR',
        dbh: x => 'DBHINT' * 2.54,
        location: 'LOCTYPE',
        // also interesting attributes on deciduous, broadlaved etc.

    },

},
{
    id: 'cambridge',
    country: 'USA',
    download: 'https://data.cambridgema.gov/api/views/q83f-7quz/rows.csv?accessType=DOWNLOAD',
    info: 'https://data.cambridgema.gov/Public-Works/Street-Trees/ni4i-5bnn',
    format: 'csv',
    crosswalk: {
        common: 'CommonName',
        scientific: 'Scientific',
        ref: 'TreeID',
        dbh: 'diameter',
        updated: 'last_edite',
        planted: 'PlantDate',
        health: x => String(x.TreeCondit).replace(/ \(.*/, '') // strings like "Good (EW 2013)"
    },
    short: 'Cambridge',


},
{
    id: 'berkeley',
    country: 'USA',
    download: 'https://data.cityofberkeley.info/api/views/x39z-ushg/rows.csv?accessType=DOWNLOAD',
    info:'https://data.cityofberkeley.info/Natural-Resources/City-Trees/9t35-jmin',
    format:'csv',
    crosswalk: {
        scientific: 'SPECIES',
        common: 'Common_Nam',
        height: x => Number(x.HEIGHT_FT) / FEET,
        dbh: x => Number(x.DBH_IN) * INCHES,
        health: 'CONDITION', // numeric...
        note: 'note',

    },
    short: 'Berkeley',

},
{
    id: 'pittsburgh',
    country: 'USA',
    download: 'https://data.wprdc.org/dataset/9ce31f01-1dfa-4a14-9969-a5c5507a4b40/resource/d876927a-d3da-44d1-82e1-24310cdb7baf/download/trees_img.geojson',
    info: 'https://data.wprdc.org/dataset/city-trees',
    format: 'geojson',
    centre: [-80,40.436],
    short: 'Pittsburgh',
    crosswalk: {
        common: 'common_name',
        ref: 'id',
        scientific: 'scientific_name',
        height: 'height',
        health: 'condition',
    }

},
{
    id: 'colombus',
    country: 'USA',
    download: 'https://opendata.arcgis.com/datasets/674e4a358e8042f69a734f229a93823c_1.zip?outSR=%7B%22wkt%22%3A%22PROJCS%5B%5C%22Ohio%203402%2C%20Southern%20Zone%20(1983%2C%20US%20Survey%20feet)%5C%22%2CGEOGCS%5B%5C%22NAD%2083%20(Continental%20US)%5C%22%2CDATUM%5B%5C%22NAD%2083%20(Continental%20US)%5C%22%2CSPHEROID%5B%5C%22GRS%2080%5C%22%2C6378137.0%2C298.257222101%5D%5D%2CPRIMEM%5B%5C%22Greenwich%5C%22%2C0.0%5D%2CUNIT%5B%5C%22Degree%5C%22%2C0.0174532925199433%5D%5D%2CPROJECTION%5B%5C%22Lambert_Conformal_Conic%5C%22%5D%2CPARAMETER%5B%5C%22False_Easting%5C%22%2C1968500.0%5D%2CPARAMETER%5B%5C%22Central_Meridian%5C%22%2C-82.5%5D%2CPARAMETER%5B%5C%22Standard_Parallel_1%5C%22%2C38.7333333333%5D%2CPARAMETER%5B%5C%22Standard_Parallel_2%5C%22%2C40.0333333333%5D%2CPARAMETER%5B%5C%22Latitude_Of_Origin%5C%22%2C38.0%5D%2CUNIT%5B%5C%22U.S.%20Foot%5C%22%2C0.3048006096012%5D%5D%22%7D',
    info: 'http://opendata.columbus.gov/datasets/public-owned-trees',
    format: 'zip',
    filename: 'Public_Owned_Trees.shp',
    short: 'Colombus',
    crosswalk: {
        ref: 'OBJECTID',
        dbh: x => Number('DIAM_BREAS') * INCHES,
        updated: 'INSPECTION',
        health: 'CONDITION1',
        maturity: 'LIFE_STAGE',
        common: 'SP_CODE',
        description: 'STR_NAME',
    }

},

{
    id:'austin',
    country: 'USA',
    short: 'Austin',
    long: '',
    download: 'https://data.austintexas.gov/api/views/7aq7-a66u/rows.csv?accessType=DOWNLOAD',
    info:'https://catalog.data.gov/dataset/downtown-tree-inventory-2013',
    format: 'csv',
    crosswalk: {
        scientific: 'SPECIES',
        common: 'COM_NAME',
        dbh: x => x.DBH * INCHES,
        height: x => x.HEIGHT / FEET,
        health: 'CONDITION',
        location: 'LAND_TYPE',


    }
},
{
    id:'cornell',
    country: 'USA',
    short: 'Cornell University',
    // long: '',
    download: 'https://cugir-data.s3.amazonaws.com/00/80/25/cugir-008025.zip',
    info:'https://cugir.library.cornell.edu/catalog/cugir-008025',
    format: 'zip',
    filename: 'cugir-008025/CornellTree2009.shp',
    crosswalk: {
        scientific: 'Botanic',
        common: 'Common',
        dbh: x => x.DBH * INCHES,
        note: 'Comment',
        updated: 'SurveyDate'
    }
},

{
    id:'cary',
    country: 'USA',
    short: 'Cary',
    long: '',
    download: 'https://data.townofcary.org/api/v2/catalog/datasets/cary-trees/exports/csv',
    info:'https://catalog.data.gov/dataset/cary-trees',
    format: 'csv',
    crosswalk: {
        updated: 'editdate',
        common: 'name',
        description: 'description',

    }
},
{
    id:'rochester',
    country: 'USA',
    short: 'Rochester',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/4c209944e2984b4a908a14b0cbe48075_0.zip',
    info:'http://hub.arcgis.com/datasets/RochesterNY::trees-open-data',
    format: 'zip',
    crosswalk: {
        description: 'TREE_NAME',
        health: 'COND',
        dbh: x => String(x.DBH).replace('"','') * INCHES,
        ref: 'TREE_NUMBE',
        note: 'NOTES'
    }
},
{
    id:'seattle',
    country: 'USA',
    short: 'Seattle',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/0b8c124ace214943ab0379623937eccb_6.zip',
    info:'http://hub.arcgis.com/datasets/SeattleCityGIS::trees',
    format: 'zip',
    crosswalk: {
        ref: 'UNITID',
        health: 'CONDITION',
        owner: 'OWNERSHIP',
        updated: 'LAST_VERIF',
        planted: 'PLANTED_DA',
        scientific: 'SCIENTIFIC',
        common: 'COMMON_NAM',
        height: x => x.TREEHEIGHT / FEET,
        dbh: x => x.DIAM * INCHES,
        condition: x => ['Very poor', 'Poor','Fair','Good','Excellent'][x.CONDITIO_3 - 1],
        // lots more https://www.seattle.gov/Documents/Departments/SDOT/GIS/Trees_OD.pdf
    }
},
{
    id:'cupertino',
    country: 'USA',
    short: 'Cupertino',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/caa50a924b7d4b5ba8e8a4cbfd0d7f13_29.csv',
    info:'http://hub.arcgis.com/datasets/Cupertino::trees',
    format: 'csv',
    latitudeField: 'LONG', // sigh, really, yes.
    longitudeField: 'LAT',
    crosswalk: {
        ref: 'AssetID',
        updated: 'UpdateDate',
        scientific: 'Species',
        common: 'SpeciesCommonName',
        dbh: x => Number(x.DiameterBreastHeight) * INCHES,
        height: x => Number(x.Height) / FEET,
        location: 'LocationType',
        health: 'Condition',


    },
    centre: [-122.03987,37.31706],
},
{
    id:'oxnard',
    country: 'USA',
    short: 'Oxnard',
    long: 'City of Oxnard',
    download: 'https://opendata.arcgis.com/datasets/a5aa2d1dfd344ef79d61507d33cdbc02_1.csv',
    info:'http://hub.arcgis.com/datasets/a5aa2d1dfd344ef79d61507d33cdbc02_1',
    format: 'csv',
    crosswalk: {
        // FICTITIOUS?
        scientific: 'BOTANICALN',
        common: 'COMMONNAME',
        dbh: x => Number(x.DBH) * INCHES,
        height: x => Number(x.HEIGHT) / FEET,


    }
},
{
    id:'wake_forest',
    country: 'USA',
    short: 'Wake Forest',
    long: 'Town of Wake Forest',
    download: 'https://opendata.arcgis.com/datasets/ba930858554a43cca1be2f06a44d2449_0.csv',
    info:'http://hub.arcgis.com/datasets/wakeforestnc::trees',
    // format: 'csv',
    crosswalk: {
        scientific: 'SPECIES_LA',
        common: 'SPECIES_CO',
        health: 'STATUS', // alive / not
    }
},
{
    id:'aurora',
    country: 'USA',
    short: 'Aurora',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/1dbb32bf07ca421db4f01dac6beb812d_85.csv',
    info:'http://hub.arcgis.com/datasets/AuroraCo::trees-city',
    format: '',
    crosswalk: {
        ref: 'TREE_ID_NO',
        common: 'SPECIES',
        dbh: x => Number(x.DIAMETER) * INCHES,
        health: 'CONDITION', // what, there is "CONDITION_RATING_NUMERIC" which has "Good" twhereas condition is "Fair"...
        updated: 'ACTIVITY_DATE',
        // genus: 'GENUS', // "Pine" is not a genus...

    }
},
{
    id:'bakersfield',
    short: 'Bakersfield',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/b7a17f7ecb564be4b26ced85016ed1da_0.csv',
    info:'http://hub.arcgis.com/datasets/cob::city-trees?geometry=-129.468%2C33.767%2C-108.539%2C36.903',
    crosswalk: {
        updated: 'DATE_',
        scientific: 'BOTANICAL_',
        common: 'COMMON_N',
        dbh: inches('DIAMETER'),
        height: feet('HEIGHT'),
        crown: feet('CROWN_RADI'),
        health: 'RATING', // out of 10?
        note: 'COMMENT',
        ref: 'TREE_ID',
        
    }
},
{
    id:'las_vegas',
    short: 'Las Vegas',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/23364bb40f2640ff841ba4a8680b6421_0.csv',
    info:'http://hub.arcgis.com/datasets/lasvegas::trees',
    format: '',
    crosswalk: {
        location: 'LOC_TYPE',
        scientific: 'BOTANICAL',
        common: 'COMMON',
        // water_use!
        dbh: 'DBH', // "25-30",
        spread: 'WIDTH',
        height: 'HEIGHT',
        health: 'COND',
        note: 'NOTES',

    }
},
{
    id:'mountain_view',
    short: 'Mountain View',
    long: 'City of Mountain View',
    download: 'https://opendata.arcgis.com/datasets/72667718eb9b427d95b6eb55e25c36a7_0.csv',
    info:'http://hub.arcgis.com/datasets/MountainView::trees',
    format: '',
    crosswalk: {
        scientific: 'SPECIES',
        common: 'NAME',
        ref: 'FACILITYID',
        age: 'TREEAGE',
        dbh: inches('DIAMETER'), // TRUNKDIAM?
        height: feet('HEIGHT'),
        planted: 'INSTALLDATE',
        health: 'CONDITION',
        updated: 'LASTUPDATE',
        // TROUPGROUP: deciduous/evergreen


    }
},
{
    id:'three_rivers',
    short: 'Three Rivers',
    long: 'Three Rivers Park District',
    download: 'https://opendata.arcgis.com/datasets/ffbb9401412141a79c7164ade8d2ee2d_0.csv',
    info:'http://hub.arcgis.com/datasets/trpd::managed-trees-open-data?geometry=-96.405%2C44.562%2C-90.563%2C45.243',
    crosswalk: {
        common: 'CommonName',
        scientific: 'ScientificName',
        planted: 'YearPlanted',
        ref: 'CartedID', //?
    }
},
{
    id:'richardson',
    short: 'Richardson',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/cd10a9e85354488dbdb697ce97ccb064_0.csv',
    info:'http://hub.arcgis.com/datasets/richardson::trees',
    crosswalk: {
        common: 'NAME',
        genus: 'GENUS',
        species: 'SPECIES',
        age: 'TREEAGE',
        dbh: inches('DIAMETER'), // also TRUNKDIAM
        height: feet('HEIGHT'),
        owner: 'OWNEDBY',
        structure: 'TRUNKSTRCT', // also BRANCHSTRCT
        note: 'COMMENTS',
        updated: 'last_edited_date'


    }
},
{
    id:'allentown',
    short: 'Allentown',
    long: 'City of Allentown',
    download: 'https://opendata.arcgis.com/datasets/4383052db35e4f93bbd83e5bde468a00_0.csv',
    info:'http://hub.arcgis.com/datasets/AllentownPA::city-trees',
    crosswalk: {
        common: 'TR_COMMON',
        scientific: 'TR_GENUS',
        dbh: inches('TR_DIA'),
        health: 'CONDITION',
        // lots of others
        updated: 'INPUT_DATE',


    }
},
{
    id:'sioux_falls',
    short: 'Sioux Falls',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/c880d62ae5fb4652b1f8e6cbca244107_10.csv',
    info:'http://hub.arcgis.com/datasets/cityofsfgis::trees',
    crosswalk: {
        ref: 'AssetID',
        location: 'Location',
        common: 'FullName',
        scientific: 'Species',
        family: 'Family',
        //TreeType: Deciduous
        Spread: 'Spread',
        height: feet('Height'),
        dbh: inches('Diameter'),
        health: 'Condition', // /100,
        Note: 'SpecialComments',
        updated: 'last_edited_date',
    }
},
{
    id:'amherst',
    short: 'Amherst',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/b4a74ab24f114f22b438a19e589f6f76_0.zip',
    info:'http://hub.arcgis.com/datasets/AmherstMA::street-trees',
    crosswalk: {
        ref: 'TreeID',
        updated: 'LastEdit',
        common: 'Species',
        note: 'Notes',
        // TreeSize?
    },
    centre: [-72.49307,42.3818],
},
{
    id:'colorado_springs',
    short: 'Colorado Springs',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/91758518026d4b1089f2180602399d73_0.csv',
    info:'http://hub.arcgis.com/datasets/coloradosprings::trees/data?geometry=-106.259%2C38.699%2C-103.338%2C39.073',
    crosswalk: {
        common: 'Common_Name',
        dbh: inches('DBH'),

    }
},
{
    id:'marysville_oh',
    short: 'Marysville',
    long: 'City of Marysville',
    download: 'https://opendata.arcgis.com/datasets/44b6c7a1307d48ff99d2034b5695c149_0.csv',
    info:'http://hub.arcgis.com/datasets/Marysville::individual-trees-sites',
    delFunc: x => x.status === 'Site - Vacant',
    crosswalk: {
        ref: 'treeid',
        common: 'common',
        genus: 'genus',
        species: 'sp_epith',
        variety: 'variety',
        location: 'type',
        dbh: inches('dbh'),
        height: feet('height'),
        health: 'trcond',
        updated: 'last_edited_date'


    }
},
{
    id:'springfield_mo',
    short: 'Springfield',
    long: 'City of Springfield',
    download: 'https://opendata.arcgis.com/datasets/7a890a7b54d6438f80bd60e5e34c8e62_34.csv',
    info:'http://hub.arcgis.com/datasets/COSMO::tree-inventory',
    crosswalk: {
        health: 'Condition',
        common: 'TreeType',
        scientific: 'SciName',
        height: 'Height', // 11-20
        dbh: inches('Diameter'),
        spread: 'Spread',


    }
},
{
    id:'anaheim_ca',
    short: 'Anaheim',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/0f96c6cf73904424bc9ce14197990201_41.csv',
    info:'https://data-anaheim.opendata.arcgis.com/datasets/city-trees',
    crosswalk: {
        common: 'COMMONNAME',
        scientific: 'BOTANICALNAME',
        dbh: 'DBH', //13-18
        height: 'HEIGHT',
        // FICTITIOUS?


    },
    centre: [-117.86, 33.83],
},
{
    id:'charlottesville_nc',
    short: 'Charlottesville',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/e7c856379492408e9543a25d684b8311_79.csv',
    info:'http://hub.arcgis.com/datasets/charlottesville::tree-inventory-point',
    format: '',
    delFunc: x => x.Removal_Date,
    crosswalk: {
        planted: 'Install_Date',
        common: 'Common_Name',
        owner: 'Agency',
        genus: 'Genus',
        species: 'Species',
        updated: 'last_edited_date',

        //Removal_Date?

    }
},
{
    id:'west_chester_pa',
    short: 'West Chester',
    long: 'West Chester Borough',
    download: 'https://opendata.arcgis.com/datasets/7fdf2b5d2b674e99b33e8d77d052e30c_0.csv',
    info:'http://hub.arcgis.com/datasets/WCUPAGIS::borotrees-1?geometry=-87.273%2C38.460%2C-63.905%2C41.408',
    format: '',
    crosswalk: {
        dbh: inches('DBH'),
        ref: 'ID_1',
        genus: 'Genus',
        species: 'Species_1',
        common: 'CommonName',
        health: 'Condition_1',

    }
},
{
    id:'durango_co',
    short: 'Durango',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/3e3e00d6224b43ee9acc514244fffdb9_0.csv',
    info:'http://hub.arcgis.com/datasets/CityOfDurango::city-trees',
    format: '',
    crosswalk: {
        planted: 'DATEID', //?
        ref: 'ID',
        //type: 'Deciduous',
        common: 'COMMON',
        genus: 'GENUS',
        species: 'SPECIES',
        variety: 'CULTIVAR',
        dbh: inches('DBH'),
        health: 'CONDITION',
        updated: 'LASTMODDATE',
    }
},
{
    id:'washington_me',
    short: 'Washington',
    long: 'Washington County',
    download: 'https://opendata.arcgis.com/datasets/ae14fc063c1e44a995e750805b1c864b_0.csv',
    info:'http://hub.arcgis.com/datasets/WCMN::tree-inventory',
    format: '',
    crosswalk: {
        common: 'Tree_Type',
        health: 'Health',
        note: 'Comments',
        ref: 'OBJECTID',
    }
},
{
    id:'westerville_oh',
    short: 'Westerville',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/137785bc78da47b4a2159f9c76218d55_0.csv',
    info:'http://hub.arcgis.com/datasets/Westerville::comm-parks-rec-trees/data?geometry=-83.315%2C40.085%2C-82.585%2C40.177',
    format: '',
    crosswalk: {
        dbh: inches('DBH'),
        common: 'COMMON_NAME',
        //class: deciduous
        location: 'TREE_TYPE',
        health: 'CONDITION',
        scientific: 'SCIENTIFIC',

    }
},
{
    id:'st_augustine_fl',
    short: 'St Augustine',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/8372c7d0f5a24764bd10f62f0b2f1b65_0.csv',
    info:'http://hub.arcgis.com/datasets/STAUG::trees?geometry=-93.005%2C28.223%2C-69.637%2C31.556',
    format: '',
    crosswalk: {
        updated: 'INSPECT_DT',
        note: 'NOTES',
        scientific: 'SPP', // often "Palm" though
        dbh: 'DBH', //13-14
    }
},
{
    id:'weston_fl',
    short: 'Weston',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/c95f89a4db39414a89f5c29bcb6fb48d_6.csv',
    info:'http://hub.arcgis.com/datasets/westonfl::trees',
    format: '',
    crosswalk: {
        common: 'NAME',
        genus: 'GENUS',
        species: 'SPECIES',
        age: 'TREEAGE',
        dbh: inches('TRUNKDIAM'),
        height: feet('HEIGHT'),
        health: 'CONDITION',
        owner: 'OWNEDBY',
        updated: 'LASTUPDATE',
        scientific: 'BOTNAME',
        family: 'FAMILY'


    }
},
/*
// broken
// alternative, also broken: http://opendata.minneapolismn.gov/datasets/tree-inventory/data
{
    id:'minneapolis_mn',
    short: 'Minneapolis',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/5c607cf94314467f87e285526b72e4d6_0.csv',
    info:'http://hub.arcgis.com/datasets/cityoflakes::tree-inventory',
    format: '',
    crosswalk: {
    }
},*/
{
    id:'pacific_grove_ca',
    short: 'Pacific Grove',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/87bcc6e824214422be859b3251350829_3.csv',
    info:'http://hub.arcgis.com/datasets/CityPacificGrove::trees',
    format: '',
    crosswalk: {
        common: 'Type',
        scientific: 'BOTANICAL',
        variety: 'CULTIVAR',
        dbh: inches('DBH'),
        condition: x => String(x.CONDITION).split(' - ')[0],
        comment: 'NOTES',

        // DATE_1 - 2015-ish. planted? updated?
    }
},
{
    id:'bozeman_mt',
    short: 'Bozeman',
    long: 'City of Bozeman',
    download: 'https://opendata.arcgis.com/datasets/ba0dea7927184014a8b84e64af5c7684_0.csv',
    info:'http://hub.arcgis.com/datasets/bozeman::trees',
    format: '',
    crosswalk: {
        genus: 'Genus',
        species: 'Species',
        variety: 'Cultivar',
        dbh: inches('DBH'),
        health: 'Condition',
        updated: 'last_edited_date',
        common: 'Common_Name',
        ref: 'FacilityID',
    }
},
{
    id:'champaign_il',
    short: 'Champaign',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv',
    info:'http://hub.arcgis.com/datasets/cityofchampaign::city-owned-trees',
    format: '',
    crosswalk: {
        ref: 'ID',
        scientific: 'SPP',
        common: 'COMMON',
        dbh: inches('DBH'),
        health: 'COND',
        updated: 'INSPECT_DT',
        note: 'NOTES',
        family: 'FAMILY',
    }
},
{
    id:'placentia_ca',
    short: 'Placentia',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/8efcbe9c80ed42a29e6ad5483bd01c32_0.csv',
    info:'http://hub.arcgis.com/datasets/placentia::city-trees',
    format: '',
    crosswalk: {
        ref: 'INVENTORYI',
        scientific: 'BOTANICALN',
        common: 'COMMONNAME',
        dbh: 'DBH', //07-12
        height: 'HEIGHT', // 15-30
        updated: 'EditDate',

    }
},
// broken - generating
// {
//     id:'ucsb',
// //     short: 'UC Santa Barbara',
//     long: 'University of California, Santa Barbara',
//     download: 'https://opendata.arcgis.com/datasets/c6eb1b782f674be082f9eb764314dda5_0.csv',
//     info:'http://hub.arcgis.com/datasets/ucsb::treekeeper-012116',
//     format: '',
//     crosswalk: {
//     }
// },
{
    id:'sarasota_fl',
    short: 'Sarasota',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/4deeb30f44bc4b60847cf43aed1a4670_0.csv',
    info:'http://hub.arcgis.com/datasets/sarasota::tree-inventory',
    format: '',
    crosswalk: {
        scientific: 'Species', // often common names like "Laurel Oak',
        dbh: inches('DBH_1_99_'),
        height: feet('Height_1_1'),
        health: 'Condition',
        owner: 'Ownership',
        note: 'Notes',
        updated: 'last_edited_date',
    }
},
{
    id:'nichols_arboretum',
    short: 'Nichols Arboretum',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/febee55e7dac43298952af77c8f8d809_0.csv',
    info:'http://hub.arcgis.com/datasets/umich::nichols-arboretum-inventory-survey',
    format: '',
    crosswalk: {
        common: 'COMMON',
        scientific: 'BOTANICAL',
        variety: 'CULTIVAR',
        dbh: inches('DBH'),
        health: 'COND',
        note: 'NOTES',
        updated: 'DATE', // EDITTIME? 


    }
},
{
    id:'unt',
    short: 'UNT',
    long: 'University of North Texas',
    download: 'https://opendata.arcgis.com/datasets/ee33bf4535cd47bbb1c5661d2333d834_0.csv',
    info:'http://hub.arcgis.com/datasets/untgis::tree',
    format: '',
    crosswalk: {
        note: 'NOTES',
        common: 'NAME_COMN',
        ref: 'UNT_ID',
    }
},
{
    id:'escondido_ca',
    short: 'Escondido',
    long: 'City of Escondido',
    download: 'https://opendata.arcgis.com/datasets/ac9caf3c7a9847b78100cc8860ddf51a_0.csv',
    info:'http://hub.arcgis.com/datasets/CityofEscondido::tree-inventory?geometry=-122.895%2C32.313%2C-111.211%2C33.923',
    format: '',
    crosswalk: {
        ref: 'TREEID',
        // FICTITIOUS ??
        scientific: 'BOTANICAL',
        common: 'COMMON',
        dbh: 'DBH_RANGE', //19-24 also EXACTDBH
        height: feet('HEIGHT_RAN'), // 30-45
        health: 'CONDITION',
        updated: 'LAST_EDITED_DATE',

    }
},
{
    id:'wylie_tx',
    short: 'Wylie',
    long: 'City of Wylie',
    download: 'https://opendata.arcgis.com/datasets/82060fffb84045fdafbe2a56c989b353_0.csv',
    info:'http://hub.arcgis.com/datasets/WylieTX::treesurvey',
    format: '',
    crosswalk: {
        ref: 'TK_ID',
        common: 'COMMON',dbh: inches('DBH'),
        health: 'CONDITION',
        updated: 'INSPECT_DT',
        
    }
},
{
    id:'auburn_me',
    short: 'Auburn',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/91bffc476216422481b511a48796a327_0.csv',
    info:'http://hub.arcgis.com/datasets/AuburnME::treeinventory?geometry=-81.930%2C42.701%2C-58.562%2C45.462',
    format: '',
    crosswalk: {
        ref: 'ID',
        common: 'COMMON',
        scientific: 'BOTANICAL',
        dbh: 'DBH', // many blanks...?
        health: 'COND',
        note: 'NOTES',
    }
},
// not downloading
// {
//     id:'uc_davis',
// //     short: 'UC Davis',
//     long: 'University of California Davis',
//     download: '',
//     info:'http://hub.arcgis.com/datasets/ucda::uc-davis-tree-database',
//     format: 'https://opendata.arcgis.com/datasets/07939ef894984a95b58098315f80c046_0.zip',
//     crosswalk: {
//     }
// },
{
    id:'hudson_river_park',
    short: 'Hudson River Park',
    long: 'Hudson River Park Trust',
    download: 'https://opendata.arcgis.com/datasets/51b5e5da030f4331af48cb052f2d2d5e_1.csv',
    info:'http://hub.arcgis.com/datasets/SustainableMSU::tree',
    format: '',
    crosswalk: {
        scientific: 'Species_Latin_Name',
        common: 'Species_Common_Name',
        height: feet('Height'),
        dbh: inches('DBH'),
        structure: 'Structural_Value',
        ref: 'HRPT_Numbering_1',

    }
},
{
    id:'cape_coral_fl',
    short: 'Cape Coral',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/e988fe06668e44ea996a53c4365531b9_0.csv',
    info:'http://hub.arcgis.com/datasets/CapeGIS::tree-inventory',
    format: '',
    crosswalk: {
        common: 'SPECIES',
        dbh: 'DBH', // 0-6"
        crown: 'CANOPY',
        location: 'SITE',
        health: 'CONDITION',
        updated: 'last_edited_date',
        heaght: 'HEIGHT', //11-20
        note: 'COMMENTS',
    }
},
{
    id:'naperville_il',
    short: 'Naperville',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/51d4726531cd4ef99bfa24b99ae3ba24_0.csv',
    info:'http://hub.arcgis.com/datasets/naperville::right-of-way-tree-inventory',
    format: '',
    crosswalk: {
        common: 'ROWTREE_TYPE',
        ref: 'FACILITYID',
        health: 'CONDITION_CLASS',
        updated: 'DATE_CHANGED',
        planted: 'DatePlanted',
        dbh: inches('EST_DBH'),
        family: 'FAMILY',
        variety: 'CULTIVAR',
        genus: 'GENUS', // no species?
    }
},
{
    id:'san_jose_ca1',
    short: 'San Jose',
    long: 'San Jose Medians and Backups',
    download: 'https://opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_1.csv',
    info:'http://hub.arcgis.com/datasets/csjdotgis::trees-medians-and-backups',
    format: '',
    crosswalk: {
        scientific: 'NAMESCIENTIFIC',
        age: 'TREEAGE',
        dbh: inches('TRUNKDIAM'),
        height: feet('HEIGHT'),
        crown: feet('DIAMETER'),
        health: x=> String(x.CONDITION).split(' ')[0],
        note: 'NOTES',
        updated: 'EditDate',
        owner: 'OWNEDBY',

    }
},
{
    id:'san_jose_ca2',
    short: 'San Jose',
    long: 'San Jose Special Districts',
    download: 'https://opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_0.csv',
    info:'http://hub.arcgis.com/datasets/csjdotgis::trees-special-districts',
    format: '',
    crosswalk: {
        scientific: 'NAMESCIENTIFIC',
        age: 'TREEAGE',
        dbh: inches('TRUNKDIAM'),
        height: feet('HEIGHT'),
        crown: feet('DIAMETER'),
        health: x=> String(x.CONDITION).split(' ')[0],
        note: 'NOTES',
        updated: 'EditDate',
        owner: 'OWNEDBY',
    },
    primary: 'san_jose_ca1'

},
{
    id:'san_jose_ca3',
    short: 'San Jose',
    long: 'San Jose General Fund',
    download: 'https://opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_2.csv',
    info:'http://hub.arcgis.com/datasets/csjdotgis::trees-general-fund-street',
    format: '',
    crosswalk: {
        scientific: 'NAMESCIENTIFIC',
        age: 'TREEAGE',
        dbh: inches('TRUNKDIAM'),
        height: feet('HEIGHT'),
        crown: feet('DIAMETER'),
        health: x=> String(x.CONDITION).split(' ')[0],
        note: 'NOTES',
        updated: 'EditDate',
        owner: 'OWNEDBY',
    },
    primary: 'san_jose_ca1'
},
// maybe https://opendata.arcgis.com/datasets/a31898f9fff4417ab6f784c9b4fe5f43_27.csv

// OSU: http://hub.arcgis.com/datasets/2b4fc9ac4cdc43b7bba6f2b1e0d6f75f_29


// oh yeah, this guy:
// http://hub.arcgis.com/datasets/usfs::raw-urban-street-tree-inventory-data-for-49-california-cities


].map(s => { s.country = 'USA'; return s; });

// Sigh, every point has the exact same geometry.
// {
    
//     id: 'oakland',
//     download: 'https://data.oaklandnet.com/api/views/4jcx-enxf/rows.csv?accessType=DOWNLOAD',
//     format: 'csv',
//     short: 'Oakland',
//     crosswalk: {
//         scientific: 'SPECIES',
//         ref: 'OBJECTID'

//     }
// },
 
 
/*
https://pg-cloud.com/hawaii/
- can't really use this in this form
*/