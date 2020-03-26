/*
Schema (incomplete):
id (required): internal identifier used in naming files and linking things.
short: Short name for the city, shown on the map (eg Melbourne)
long: Full name for the government body (eg City of Melbourne)
download (required): URL to get data from
info: URL that is the landing page for more information about dataset
format: The file extension, eg zip/geojson/csv. Not required if present in download URL.
filename: If the specific file to pass to OGR2OGR needs to be set. Useful for complex zip files, or vrt files.
latitudeField,longitudeField: for csv files, the specific fields containing lat/long. Can usually be guessed, so not required.
license: SPDX specifier for license (eg CC-BY-4.0) or URL
licenseUrl: URL for full text of license
licenseName: longer text version of licence name (eg "Creative Commons Attribution 4.0 International")
crosswalk: set of fields that map to opentrees schema. If a function is given, it's called with geojson properties object.
country: name of country the source is within.
srs: Source SRS if not EPSG:4326 or available within Shapefile .prj file. Passed to ogr2ogr as -s_srs
gdalOptions: String, other options to pass to ogr2ogr, eg "-skipfailures"
delFunc: called with (tree.properties, tree) for each row. If it returns true, that row is excluded.
primary: the id of the main datasource for this city (in cases where 2+ datasets constitute the inventory)
keepExtension: don't change the extension of a file when it's downloaded (usually paired with filename=)
centre: [lon, lat] - where to place the city marker, in case the automatic placement is bad due to data errors


Crosswalk (opentrees schema):
scientific: full botanical name
genus: scientific genus (eg Melaleuca)
species: species epithet (eg linariifolia)
variety: everything that comes after species, including cultivar, variety etc.
common: Common name (eg "Brittle gum")
dbh: diameter at breast height, in centimetres
health: rating of health of tree, ideally in Dead/Poor/Fair/Good/Very good/Excellent
height: height of tree in metres
crown: width of crown, in metres
spread: crown spread, in metres (TODO reconcile this and crown)
ule: useful life expectancy, in years (TODO a better way of doing this with absolute years)
updated: date that data was last updated (TOOD distinguish between various kinds of updates maybe)
planted: Date that tree was planted as a seed (not used much - need to be clearer about semantics and date format)

Future fields:
- installation date?
- language
- units (metric/imperial), assume metric unless US




*/
const fs = require('fs');
const sources = [
    {
        id: 'copenhagen',
        country: 'Denmark',
        download:
            'http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326',
        info: 'https://www.opendata.dk/city-of-copenhagen/trae_basis',
        format: 'csv',
        crosswalk: {
            scientific: 'traeart',
            common: 'dansk_navn',
            // Slaegstnavn "family name" has values like Lind
            planted: 'planteaar',
            // Stammeofma "tribal embrace(?)" - crown?,
            health: 'sundhed',
            // TODO sooo many other fields
        },
        short: 'Copenhagen',
    },
    {
        id: 'buenos_aires',
        country: 'Argentina',
        short: 'Buenos Aires',
        // long: '',
        // shapefile was incomplete?
        download:
            'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-en-espacios-verdes/arbolado-en-espacios-verdes.csv',
        info:
            'https://data.buenosaires.gob.ar/dataset/arbolado-espacios-verdes',
        format: 'csv',
        crosswalk: {
            ref: 'id_arbol',
            height: 'altura_tot',
            dbh: 'diametre',
            common: 'nombre_com',
            scientific: 'nombre_cie',
            family: 'nombre_fam',
            // genus: 'nombre_gen', // not good to include without species
        },
    },
    {
        id: 'buenos_aires2',
        country: 'Argentina',
        short: 'Buenos Aires',
        // long: '',
        download:
            'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-publico-lineal/arbolado-publico-lineal-2017-2018.geojson',
        // maybe more datasets
        info: 'https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal',
        format: 'geojson',
        crosswalk: {
            ref: 'nro_registro',
            scientific: 'nombre_cientifico',
            // ancho_acera?
            dbh: 'diametro_altura_pecho',
            height: 'altura_arbol',
        },
        primary: 'buenos_aires',
    },

    // these are probably generated from lidar or satellite and don't contain any actual information about each tree
    // {
    //     id:'loudoun',
    //     country: 'USA',
    //     short: 'Loudoun',
    //     // long: '',
    //     download: 'http://geohub-loudoungis.opendata.arcgis.com/datasets/21ece36a6fbd447b95b9446f752552a4_0.zip',
    //     info:'https://catalog.data.gov/dataset/loudoun-trees-9b144',
    //     format: 'zip',
    //     crosswalk: {
    //         ref: 'TR_LOUD_ID',
    //     }
    // },
    {
        id: 'fingal',
        country: 'Ireland',
        short: 'Fingal',
        long: 'Fingal County',
        download: 'http://data.fingal.ie/datasets/csv/Trees.csv',
        info:
            'https://data.smartdublin.ie/dataset/tableview/ebf9151e-fd30-442e-93cb-fa88c2affc93',
        format: 'csv',
        crosswalk: {
            ref: x => Math.round(x.TREE_ID),
            scientific: 'Species_Desc',
            common: 'Common_Name',
            maturity: 'Age_Desc',
            height: 'Height',
            spread: 'Spread',
            dbh: x => (x['Actual_Trunk'] || '').replace('cm', ''),
            health: 'Condition',
        },
    },

    {
        id: 'palmerston_north',
        country: 'New Zealand',
        short: 'Palmerston North',
        long: '',
        download:
            'https://opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18.zip?outSR=%7B%22latestWkid%22%3A2193%2C%22wkid%22%3A2193%7D',
        info:
            'http://data-pncc.opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18/data',
        format: 'zip',
        crosswalk: {
            scientific: 'botanical_',
            common: 'species',
        },
    },

    {
        id: 'basel',
        country: 'Switzerland',
        short: 'Basel',
        long: '',
        download:
            'https://data.bs.ch/explore/dataset/100052/download/?format=shp&timezone=Australia/Sydney&lang=en',
        info: 'https://data.bs.ch/explore/dataset/100052/information/',
        format: 'zip',
        crosswalk: {
            scientific: x => String(x.art).replace(/ \(.*/, ''),
            common: x => (String(x.art).match(/\((.*)\)/) || ['', ''])[1],
            planted: 'pflanzdatu',
            age: 'baumalter',
            // STANDJAHR? //
        },
    },

    {
        id: 'oslo',
        country: 'Norway',
        short: 'Oslo',
        long: '',
        download:
            'https://opendata.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19.zip',
        info:
            'https://hub.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19?geometry=10.516%2C59.709%2C10.873%2C59.884',
        format: 'zip',
        crosswalk: {
            updated: 'last_edi_1',
            scientific: 'BotNavn',
            common: 'Artsnavn',
            // lots of others...
        },
    },
    // { // requires email registration then subsequent download, blergh
    //     id:'zurich',
    //     country: 'Switzerland',
    //     short: 'Zurich',
    //     long: '',
    //     download: 'https://www.ogd.stadt-zuerich.ch/geodaten/download/Baumkataster?format=10008',
    //     info:'https://data.stadt-zuerich.ch/dataset/geo_baumkataster',
    //     format: 'csv',
    //     srs: 'EPSG:2056',
    //     crosswalk: {
    //     }
    // },

    {
        id: 'luxembourg',
        country: 'Luxembourg',
        short: 'Luxembourg',
        long: 'Grand-Duchy of Luxembourg',
        download:
            'https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20200129-134525/ps.protectedsitesnatureconservation-trees.gml',
        info:
            'https://catalog.inspire.geoportail.lu/geonetwork/srv/eng/catalog.search#/metadata/bf367452-c965-4ae1-b652-bd2c86400be5',
        format: 'gml',
        crosswalk: {
            ref: 'localId',
            scientific: x => String(x.text).split(' - ')[0],
            common: x => String(x.text).split(' - ')[1],
        },
    },

    {
        id: 'chile-osm',
        country: 'Chile',
        short: 'Chile (OSM)',
        long: '',
        download:
            'https://emscycletours.site44.com/opentrees-data/chile.geojson',
        info: '',
        format: '',
        crosswalk: {
            common: 'name',

            //leaf_cycle, leaf_type
        },
        centre: [-70.877, -29.859],
    },

    // we need to support individual shapefile download
    // {
    //     id:'thessaloniki_gr',
    //     short: 'Thessaloniki',
    //     country: 'Greece',
    //     long: '',
    //     download: '',
    //     info:'https://opendata.thessaloniki.gr/el/dataset/%CE%B1%CF%81%CF%87%CE%B5%CE%AF%CE%BF-%CE%B3%CE%B5%CF%89%CE%B3%CF%81%CE%B1%CF%86%CE%B9%CE%BA%CE%AE%CF%82-%CE%B1%CF%80%CF%8C%CE%B4%CE%BF%CF%83%CE%B7%CF%82-%CF%83%CE%B7%CE%BC%CE%B5%CE%B9%CE%B1%CE%BA%CE%AC-%CE%B4%CE%B5%CE%B4%CE%BF%CE%BC%CE%AD%CE%BD%CE%B1-%CF%84%CF%89%CE%BD-%CE%B8%CE%AD%CF%83%CE%B5%CF%89%CE%BD-%CE%B4%CE%AD%CE%BD%CE%B4%CF%81%CF%89%CE%BD-%CF%83%CF%84%CE%BF-%CE%B4%CE%AE%CE%BC%CE%BF-%CE%B8%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7%CF%82-9',
    //     crosswalk: {
    //     },
    //     license: '',
    // },

    {
        id: 'bologna_it',
        short: 'Bologna',
        long: 'Comune di Bologna',
        country: 'Italy',
        download: 'http://dati.comune.bologna.it/download/file/fid/3989',
        info: 'http://dati.comune.bologna.it/node/207',
        format: 'zip',
        crosswalk: {
            scientific: 'decodifi_4',
            circumference: 'decodifi_2', //??
            ref: 'NUM_PT',
            // CL_H? height? health?
        },
        license: 'CC-BY-3.0 IT', // CC-BY-3.0 IT
        licenseUrl: 'http://dati.comune.bologna.it/node/165',
    },
    {
        id: 'villa_manin_it',
        short: 'Villa_Manin',
        country: 'Italy',
        long: '',
        download:
            'https://www.dati.friuliveneziagiulia.it/api/views/uqpq-dr8x/rows.csv?accessType=DOWNLOAD',
        info:
            'https://www.dati.friuliveneziagiulia.it/dataset/Alberi-di-Villa-Manin/uqpq-dr8x',
        // coordsFunc: x => x['Nuova colonna georeferenziata'].split(/[(), ]/).filter(Number).map(Number),
        crosswalk: {
            location: 'dove',
            scientific: 'specie',
            family: 'familia',
            updated: 'data rilievo',
            // lots more fields with very weird names like 'SFRC|SFR', 'PIP|PI'
        },
        license: '',
    },
    // broken somehow
    // {
    //     id:'cascais_pt',
    //     short: 'Cascais',
    //     long: 'Câmara Municipal de Cascais',
    //     download: 'https://dadosabertos.cascais.pt/dataset/5ae9100a-01ea-45da-bb02-e033aa5ebe90/resource/9a3f0648-de96-4075-88d5-f0e15ded4d2a/download/mnarvore.geojson',
    //     info:'http://dadosabertos.cascais.pt/dataset/arvores-em-espaco-publico',
    //     crosswalk: {
    //     },
    //     license: '',
    // },
    {
        id: 'monterrey_mx',
        short: 'Monterrey',
        long: 'Zona Metropolitana de Monterrey',
        download:
            'http://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/6f1f1fe9-40c7-4527-8e2e-78b0f0c86a40/download/bumfiltercsv.csv',
        info:
            'http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey',
        crosswalk: {
            ref: 'Arbol_id',
            planted: x =>
                x.Fecha_plantado !== '0000-00-00' ? x.Fecha_plantado : null,
            scientific: 'Especie',
            updated: 'Fecha_registro',
        },
        license: '',
    },
];
fs.readdirSync(`sources`).forEach(sourceName =>
    sources.push(...require(`./sources/${sourceName}`))
);

module.exports = sources;
// module.exports = sources.filter(x => x.id === 'cupertino')
// module.exports = require('./sources/usa').slice(require('./sources/usa').findIndex(x => x.id === 'anaheim_ca'))

/*
    TODO: Belgium (Wallonne) - http://hub.arcgis.com/datasets/esribeluxdata::arbres-et-groupes-darbres?geometry=3.373%2C50.114%2C5.989%2C50.421
     - some are 'groups of trees' which is ugly

     Esri "community data": - http://hub.arcgis.com/datasets/esri::trees/data

    - Engerwitzdorf (Austria): https://www.data.gv.at/katalog/dataset/baumkataster-der-gemeinde-engerwitzdorf/resource/bed4f301-a8be-4262-98e2-bc3b94463679
      - Rar file contains a dozen directories of shapefiles




    */
/*{
        id:'langley',
        country: 'Canada',
        short: 'Langley',
        long: 'Township of Langley',
        // download: 'https://opendata.arcgis.com/datasets/dd533ef0e4ab4ae585051b79de33c2ed_86.zip?outSR=%7B%22latestWkid%22%3A26910%2C%22wkid%22%3A26910%7D',
        download: 'https://opendata.arcgis.com/datasets/dd533ef0e4ab4ae585051b79de33c2ed_86.geojson',
        info:'http://data-tol.opendata.arcgis.com/datasets/trees',
        format: 'geojson',
        crosswalk: {
        }
    },*/

/*
    Edinburgh:  https://data.edinburghopendata.info/dataset/edinburgh-council-trees-dataset
    - pain to work with, 5 separate datasets, in XLS, with no column headers, and a projection.
    - maybe another angle through http://edinburghtreemap.org/ and carto?

    London Canada: https://opendata.london.ca/datasets/15a0bfc0a5334d52b4b8cf510b954fd4_45
    - aerial imagery, no species

    */
/*
    // bah, site is down. can access API but it's not standard format
    {
        // TODO maybe other related datasets http://datos.gob.cl/dataset?q=arboles
        id:'providencia',
        country: 'Chile',
        short: 'Providencia',
        long: 'Commune de Providencia',
        download: 'http://datos.providencia.cl/datastreams/92199-catrastro-de-arboles-en-la-comuna-de-providencia.csv',
        info:'http://datos.gob.cl/dataset/catrastro_de_arboles_en_la_comuna_de_providencia/resource/c4a710d5-c221-4da6-8a91-c0d8c9500164',
        format: 'csv',
        srs: 'EPSG:32719', // guessed by WhatTheProj
        crosswalk: {
        }
    },
    */

//EPSG:32719

/*
    TODO

    http://datos.gob.cl/dataset?q=arboles // maybe a weird projection?
    */

// eww, this is not GeoJSON, and doesn't actually contain data.
// {
//     id:'ballerup',
//     country: 'Denmark',
//     short: 'Ballerup',
//     long: 'Ballerup Kommune',
//     download: 'http://ballerup.mapcentia.com/api/v1/sql/ballerup?q=SELECT%20*%20FROM%20drift.mapgo_punkter%20WHERE%20underelement%20=%20%27Fritvoksende%20tr%C3%A6er%27&lifetime=0&srs=4326&client_encoding=UTF8',
//     info:'https://www.opendata.dk/ballerup-kommune/fritvoksende-trae',
//     format: 'geojson',
//     crosswalk: {
//     }
// },
// This is not geojson. TODO: construct a GeoJSON endpoint from the WFS one:
// http://kortservice.vejle.dk/gis/services/OPENDATA/Vejle/MapServer/WFSServer?request=GetCapabilities&service=WFS
// {
//     id:'vejle',
//     country: 'Denmark',
//     short: 'Vejle',
//     long: 'Vejle Kommune',
//     download: 'http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/12/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson',
//     info:'https://www.opendata.dk/city-of-vejle/parkdrift-parkpleje-punktdata',
//     format: 'geojson',
//     crosswalk: {
//     }
// }

// Bengaluru: https://api.mapbox.com/datasets/v1/gubbilabs/ciydajj8h008m33qrmu9gch34/features?access_token=sk.eyJ1IjoiZ3ViYmlsYWJzIiwiYSI6ImNpeWRhb2Q0YTAwODUzMnFyZ3ZndDZubGIifQ.IB9WEb26TGWsMSV9n18Txg ?

// { // not usable
//     id: 'berlin',
//     download: 'https://www.berlin.de/ba-steglitz-zehlendorf/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/gruenflaechen/baeume/baumpflanzungen/index.php/index/all.csv?q=',
//     format: 'csv',
// }

// act:
// http://www.arcgis.com/home/webmap/viewer.html?url=https://data.actmapi.act.gov.au/arcgis/rest/services/data_extract/Environment/MapServer/14

// no locations?
// https://enterprisecontentnew-usfs.hub.arcgis.com/datasets/a920b4a7f56445d298d252b664e68e38

// more: https://wiki.openstreetmap.org/wiki/City_tree_registers#cite_note-1
