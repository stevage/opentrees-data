const FEET = 3.280084;
const INCHES = 2.54;
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
 
 