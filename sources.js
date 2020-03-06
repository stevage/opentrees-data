module.exports = [    

    {
        id: 'barcelona',
        download: 'https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/28034af4-b636-48e7-b3df-fa1c422e6287/download',
        format: 'csv',
        short: 'Barcelona',
        long: 'City of Barcelona',
        latitudeField: 'LATITUD_WGS84',
        longitudeField: 'LONGITUD_WGS84',
        country: 'Spain',
        crosswalk: {
            common: 'NOM_CASTELLA', // there's also NOM_CATALA.
            scientific: 'NOM_CIENTIFIC',
            planted: 'DATA_PLANTACIO',
            ref: 'CODI',
            crown: x => ({ PETITA: 'small', MITJANA: 'average', GRAN: 'large' }[x.ALCADA] || x.ALCADA),
            // dbh: 'MIDA_ESCOCELL', // this is the size of the tree pit
            // ALCADA (reach): PETITA (small), MITJANA (average), GRAN (big)
        },

    },
    {
        id: 'london',
        download: 'https://data.london.gov.uk/download/local-authority-maintained-trees/c52e733d-bf7e-44b8-9c97-827cb2bc53be/london_street_trees_gla_20180214.csv',
        format: 'csv',
        short: 'London',
        long: 'Greater London Authority',
        country: 'UK',
        centre: [-0.1051, 51.5164],

        crosswalk: {
            ref: 'gla_id',
            scientific: 'species_name',
            common: 'common_name',
            description: 'display_name',
            //gla_id,borough,species_name,common_name,display_name,load_date,easting,northing,longitude,latitude

        },
    },
    {
        id: 'birmingham',
        download: 'https://cc-p-birmingham.ckan.io/dataset/e9c314fc-fb6d-4189-a19c-7eec962733a8/resource/4bfd9191-a520-42fb-9ebf-8fefaededf6c/download/trees-dec2016.csv',
        format: 'csv',
        short: 'Birmingham',
        country: 'UK',
        crosswalk: {
            scientific: 'species',
            maturity: 'age',
            height: 'height',
            location: 'site_name',
        }

    },
    {
        id: 'bristol',
        country: 'UK',
        download: 'https://opendata.bristol.gov.uk/explore/dataset/trees/download/?format=geojson&timezone=Australia/Sydney&lang=en',
        info: 'https://opendata.bristol.gov.uk/explore/dataset/trees/export/',
        format: 'geojson',
        crosswalk: {
            dbh: 'dbh',
            height: 'crown_height',
            common: 'common_name',
            scientific: 'latin_name',
            common: 'full_common_name',
            crown: x => x['crown_width'],

        },
        short: 'Bristol',
    },


    {
        id: 'vienna',
        country: 'Austria',
        // downloads soooo slowly
        download: 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BAUMKATOGD&srsName=EPSG:4326&outputFormat=csv',
        info:'https://www.data.gv.at/katalog/dataset/c91a4635-8b7d-43fe-9b27-d95dec8392a7',
        format: 'csv',
        short: 'Vienna',
        crosswalk: {
            ref: 'BAUM_ID',
            dbh: x => x.STAMMUNGFANG / 3.14159 * 2,
            height: 'BAUMHOEHE',
            scientific: 'GATTUNG_ART',
            crown: 'KRONENDURCHMESSER',
            

        }
    },
    {
        id: 'belfast',
        country: 'UK',
        download: 'https://www.belfastcity.gov.uk/nmsruntime/saveasdialog.aspx?lID=14543&sID=2430',
        info:'https://www.belfastcity.gov.uk/council/Openandlinkeddata/opendatasets.aspx',
        format: 'csv',
        short: 'Belfast',
        crosswalk: {
            location: 'TYPEOFTREE',
            common: 'SPECIESTYPE',
            scientific: 'SPECIES',
            maturity: 'AGE',
            health: 'CONDITION',
            dbh: 'DIAMETERinCENTIMETRES',
            spread: 'SPREADRADIUSinMETRES',
            height: 'TREEHEIGHTinMETRES'
        }
    },
    {
        id:'copenhagen',
        country: 'Denmark',
        download: 'http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326',
        info:'https://www.opendata.dk/city-of-copenhagen/trae_basis',
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
        id:'buenos_aires',
        country: 'Argentina',
        short: 'Buenos Aires',
        // long: '',
        // shapefile was incomplete?
        download: 'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-en-espacios-verdes/arbolado-en-espacios-verdes.csv',
        info:'https://data.buenosaires.gob.ar/dataset/arbolado-espacios-verdes',
        format: 'csv',
        crosswalk: {
            ref: 'id_arbol',
            height: 'altura_tot',
            dbh: 'diametre',
            common: 'nombre_com',
            scientific: 'nombre_cie',
            family: 'nombre_fam',
            // genus: 'nombre_gen', // not good to include without species

        }
    },
    {
        id:'buenos_aires2',
        country: 'Argentina',
        short: 'Buenos Aires',
        // long: '',
        download: 'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-publico-lineal/arbolado-publico-lineal-2017-2018.geojson',
        // maybe more datasets
        info:'https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal',
        format: 'geojson',
        crosswalk: {
            ref: 'nro_registro',
            scientific: 'nombre_cientifico',
            // ancho_acera?
            dbh: 'diametro_altura_pecho',
            height: 'altura_arbol',
        },
        primary: 'buenos_aires'
    },
    {
        id:'hamburg',
        country: 'Germany',
        short: 'Hamburg',
        // long: '',
        download: 'http://daten-hamburg.de/umwelt_klima/strassenbaumkataster/Strassenbaumkataster_HH_2019-06-19.zip',
        // info:'',
        format: 'zip',
        filename: 'Strassenbaumkataster_HH_2019-06-19.gml',
        crosswalk: {
            ref: 'baumid',
            scientific: 'art_latein',
            common: 'art_deutsch',
            planted: 'pflanzjahr',
            // kronendurchmesser
            dbh: 'stammumfang', // TODO verify
            //
        }
        /*
        TODO investigate
        BERROR 1: Layer 'strassenbaumkataster_hpa' does not already exist in the output dataset, and cannot be created by the output driver.
        ERROR 1: Terminating translation prematurely after failed
        translation of layer strassenbaumkataster_hpa (use -skipfailures to skip errors)
        Error with unzip/hamburg/Strassenbaumkataster_HH_2019-06-19.gml (hamburg)
        */
    },
    {
        id:'santiago',
        country: 'Spain',
        short: 'Santiago de Compostela',
        long: 'Concello de Santiago de Compostela',
        download: 'https://datos.santiagodecompostela.gal/catalogo/dataset/60b1928e-32a9-442a-8f69-0215ba0862a4/resource/fab2344b-3c5c-466b-9e63-2e05e11fd9ce/download/arboredo_points.zip',
        info:'https://datos.santiagodecompostela.gal/catalogo/gl/dataset/arboredo',
        format: 'zip',
        crosswalk: {
            location: 'tipolexia',
        }
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
        id:'fingal',
        country: 'Ireland',
        short: 'Fingal',
        long: 'Fingal County',
        download: 'http://data.fingal.ie/datasets/csv/Trees.csv',
        info:'https://data.smartdublin.ie/dataset/tableview/ebf9151e-fd30-442e-93cb-fa88c2affc93',
        format: 'csv',
        crosswalk: {
            ref: x=>Math.round(x.TREE_ID),
            scientific: 'Species_Desc',
            common: 'Common_Name',
            maturity: 'Age_Desc',
            height: 'Height',
            spread: 'Spread',
            dbh: x => (x['Actual_Trunk'] || '').replace('cm', ''),
            health: 'Condition',
        }
    },
    {
        id:'edinburgh',
        country: 'UK',
        short: 'Edinburgh',
        long: '',
        download: 'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39.zip',
        info:'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39',
        format: 'zip',
        crosswalk: {
            scientific: 'LatinName',
            common: 'CommonName',
            height: 'Height',
            spread: 'Spread',
            maturity: 'AgeGroup',
            bh: 'DiameterAt',


        }
    },
    {
        id:'dundee',
        country: 'UK',
        short: 'Dundee',
        long: 'Dundee City Council',
        download: 'https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67',
        info:'https://data.dundeecity.gov.uk/dataset/trees',
        format: 'csv',
        crosswalk: {
            ref: 'TREE_NUMBER',
            height: 'HEIGHT_M',
            circumference: 'GIRTH',
            maturity: 'AGE_CLASS',
            scientific: 'SCIENTIFIC_NAME',
            common: 'POPULAR_NAME',

        }
    },
    {
        id:'york',
        country: 'UK',
        short: 'York',
        long: 'City of York Council',
        download: 'https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.csv',
        info:'https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees',
        format: 'csv',
        crosswalk: {
            ref: 'TREEID',
            scientific: 'BOTANICAL',
            common: 'SPECIES',

        }
    },
    {
        id:'york-private',
        country: 'UK',
        short: 'York',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.csv',
        info:'https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees',
        format: 'csv',
        crosswalk: {
            owner: 'OWNER',
            common: 'SPECIES',
            scientific: 'BOTANICAL',
        },
        primary: 'york',
    },

  
    {
        id:'umea',
        country: 'Sweden',
        short: 'Umea',
        long: '',
        download: 'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/download/?format=shp&timezone=Europe/Stockholm&lang=en',
        info:'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/export/?disjunctive.tradart_vetenskap_namn_1_1_2&disjunctive.tradart_svenskt_namn_1_1_3',
        format: 'zip',
        crosswalk: {
            scientific: 'tradart_vet',
            common: 'tradart_sve',
            location: 'gatu_eller',
            date: 'planterings',
        }
    },
    {
        id:'palmerston_north',
        country: 'New Zealand',
        short: 'Palmerston North',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18.zip?outSR=%7B%22latestWkid%22%3A2193%2C%22wkid%22%3A2193%7D',
        info:'http://data-pncc.opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18/data',
        format: 'zip',
        crosswalk: {
            scientific: 'botanical_',
            common: 'species',


        }
    },

    {
        id:'basel',
        country: 'Switzerland',
        short: 'Basel',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/3f81c83f4f4548a8b619f605019e238d_1.zip',
        info:'https://hub.arcgis.com/datasets/swissgeohub::baumbestand-baum',
        format: 'zip',
        crosswalk: {
            scientific: x => String(x.ART).replace(/ \(.*/, ''),
            common: x => (String(x.ART).match(/\((.*)\)/) || ['',''])[1],
            planted: 'PFLANZDATU', 
            age: 'BAUMALTER',
            // STANDJAHR?
        }
    },
    
    {
        id:'oslo',
        country: 'Norway',
        short: 'Oslo',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19.zip',
        info:'https://hub.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19?geometry=10.516%2C59.709%2C10.873%2C59.884',
        format: 'zip',
        crosswalk: {
            updated: 'last_edi_1',
            scientific: 'BotNavn',
            common: 'Artsnavn',
            // lots of others...
        }
    },
    {
        id:'zurich',
        country: 'Switzerland',
        short: 'Zurich',
        long: '',
        download: 'https://www.ogd.stadt-zuerich.ch/geodaten/download/Baumkataster?format=10008',
        info:'https://data.stadt-zuerich.ch/dataset/geo_baumkataster',
        format: 'csv',
        srs: 'EPSG:2056',
        crosswalk: {
        }
    },
    
    {
        id:'amsterdam1',
        country: 'Netherlands',
        short: 'Amsterdam',
        long: 'Gemeente Amsterdam',
        download: 'https://maps.amsterdam.nl/open_geodata/excel.php?KAARTLAAG=BOMEN&THEMA=bomen1',
        info:'https://maps.amsterdam.nl/open_geodata/?k=254',
        format: 'csv',
        crosswalk: {
            common: 'Soortnaam_NL',
            scientific: 'Soortnaam_WTS',
            location: 'Boomtype',
            height: 'Boomhoogte',
            planted: 'Plantjaar',
            owner: 'Eigenaar',


        }
    },
    {
        id:'amsterdam2',
        country: 'Netherlands',
        short: 'Amsterdam',
        long: 'Gemeente Amsterdam',
        download: 'https://maps.amsterdam.nl/open_geodata/excel.php?KAARTLAAG=BOMEN&THEMA=bomen2',
        info:'https://maps.amsterdam.nl/open_geodata/?k=255',
        format: 'csv',
        crosswalk: {
            common: 'Soortnaam_NL',
            scientific: 'Soortnaam_WTS',
            location: 'Boomtype',
            height: 'Boomhoogte',
            planted: 'Plantjaar',
            owner: 'Eigenaar',
        },
        primary: 'amsterdam1'
    },

    {
        id:'amsterdam3',
        country: 'Netherlands',
        short: 'Amsterdam',
        long: 'Gemeente Amsterdam',
        download: 'https://maps.amsterdam.nl/open_geodata/excel.php?KAARTLAAG=BOMEN&THEMA=bomen3',
        info:'https://maps.amsterdam.nl/open_geodata/?k=256',
        format: 'csv',
        crosswalk: {
            common: 'Soortnaam_NL',
            scientific: 'Soortnaam_WTS',
            location: 'Boomtype',
            height: 'Boomhoogte',
            planted: 'Plantjaar',
            owner: 'Eigenaar',
        },
        primary: 'amsterdam1'
    },

    {
        id:'amsterdam4',
        country: 'Netherlands',
        short: 'Amsterdam',
        long: 'Gemeente Amsterdam',
        download: 'https://maps.amsterdam.nl/open_geodata/excel.php?KAARTLAAG=BOMEN&THEMA=bomen4',
        info:'https://maps.amsterdam.nl/open_geodata/?k=257',
        format: 'csv',
        crosswalk: {
            common: 'Soortnaam_NL',
            scientific: 'Soortnaam_WTS',
            location: 'Boomtype',
            height: 'Boomhoogte',
            planted: 'Plantjaar',
            owner: 'Eigenaar',
        },
        primary: 'amsterdam1'
    },

    ...require('./sources/canada'),
    ...require('./sources/australia'),
    ...require('./sources/france'),
    ...require('./sources/usa'),
    ...require('./sources/germany'),
];

    /*
    TODO: Belgium (Wallonne) - http://hub.arcgis.com/datasets/esribeluxdata::arbres-et-groupes-darbres?geometry=3.373%2C50.114%2C5.989%2C50.421
     - some are 'groups of trees' which is ugly

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

