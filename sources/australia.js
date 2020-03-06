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
module.exports = [
    {
    id: 'corangamite',
    download: 'https://data.gov.au/geoserver/corangamite-shire-trees/wfs?request=GetFeature&typeName=ckan_d9677ebb_f3db_45f3_88eb_04089debb9e0&outputFormat=json',
    format: 'geojson',
    gdal_options: '-s_srs EPSG:4326',
    short: 'Corangamite',
    long: 'Corangamite Shire',
    country: 'Australia',
    crosswalk: {
        ref: 'id',
        height: 'height',
        crown: 'width',
        scientific: 'species',
        common: 'name',
        location: x => ({ 'STREET TREE': 'street', 'PARK TREE': 'park' }[x.tree_type] || '')
    },

},
{
    id: 'colac_otways',
    download: 'http://data.gov.au/geoserver/colac-otway-shire-trees/wfs?request=GetFeature&typeName=ckan_3ce1805b_cb81_4683_8f46_e7bd2d2a3b7c&outputFormat=json',
    format: 'geojson',
    short: 'Colac-Otways',
    long: 'Colac-Otways Shire',
    country: 'Australia',
    crosswalk:  {
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
    }, 
},
{
    // BAD 404
    id: 'ballarat',
    download: 'https://data.gov.au/geoserver/ballarattrees/wfs?request=GetFeature&typeName=ckan_eabaee3f_a563_449b_a04a_1ec847566ea1&outputFormat=json',
    // download: 'http://data.gov.au/dataset/eabaee3f-a563-449b-a04a-1ec847566ea1/resource/2f5eb80f-55fa-418c-915c-0b6de7653719/download/BallaratTrees.csv',
    format: 'geojson',
    // 'filename': 'ballarat.vrt',
    // gdal_options: '-skipfailures',
    short: 'Ballarat',
    long: 'City of Ballarat',
    country: 'Australia',
    crosswalk: {
        ...identity,
        genus: () => undefined, // contains same as species, this way it gets generated properly.
        scientific: 'species'
        // aohplaque, maintenance, description
    },
},
{
    id: 'manningham',
    download: 'https://data.gov.au/geoserver/manningham-streettrees/wfs?request=GetFeature&typeName=ckan_1aef5123_24ff_4084_a0f1_a52ca71e9e99&outputFormat=json',
    format: 'geojson',
    short: 'Manningham',
    long: 'City of Manningham',
    country: 'Australia',
    crosswalk: {
        captured: 'date1',  // TODO YYYY-MM-DD
        ref: 'tree_no', // hansen_id?
        scientific: 'species', 
        height: 'height', 
        dbh: 'dbh'
    },

},
{
    id: 'geelong',
    download: 'https://data.gov.au/geoserver/geelong-trees/wfs?request=GetFeature&typeName=ckan_13b1196c_7fb7_436a_86bc_ab24c16526de&outputFormat=json',
    format: 'geojson',
    short: 'Geelong',
    long: 'City of Greater Geelong',
    country: 'Australia',
    crosswalk: {
        ...identity, // requires Node 10
        scientific: x => x.genus + ' ' + (x.species || '').toLowerCase(),
        // TODO captured is a date

    },     
},
{
    id: 'melbourne',
    download: 'https://data.melbourne.vic.gov.au/api/views/fp38-wiyy/rows.csv?accessType=DOWNLOAD',
    format: 'csv',
    'filename': 'melbourne.vrt',
    short: 'Melbourne',
    long: 'City of Melbourne',
    country: 'Australia',
    crosswalk: {
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
},
{
    id: 'adelaide',
    download: 'http://opendata.adelaidecitycouncil.com/street_trees/street_trees.csv',
    format: 'vrt',
    'filename': 'adelaide.vrt',
    gdal_options: '-skipfailures',
    // srs: 'EPSG:28354',
    short: 'Adelaide',
    long: 'City of Adelaide',
    centre: [138.59979, -34.91802],
    country: 'Australia',
    crosswalk: {
        ref: 'Asset Id (identifier)',
        dbh: x => x['Circum (Inspection)'] + ' circumference',
        health: x => 'Vigour (Inspection)',
        height: 'Height (Inspection)',
        structure: 'Structure (Inspection)',
        maturity: 'Age (Inspection)',
        scientific: 'Species Name (Inspection)',
        common: 'Common Name (Inspection)'
    },
},
{
    id: 'waite',
    download: 'http://data.sa.gov.au/storage/f/2014-06-23T06%3A12%3A22.180Z/waitetreeid-2014-app-joined-19062014.zip',
    format: 'zip',
    'filename': 'WaiteTreeID_2014_App_Joined_19062014.shp',
    short: 'Waite Arboretum',
    long: 'Waite Arboretum (Adelaide)',
    country: 'Australia',
    crosswalk: {
        ref: 'tree_id',
        scientific: 'scientific',
        common: 'commonname',
        //planted: CASE WHEN length(yearplant::varchar) = 4 THEN to_date(yearplant::varchar, 'YYYY') END AS planted
    },  
},
{
    id: 'burnside',
    download: 'https://data.sa.gov.au/data/dataset/b7e1c8f6-169c-41bd-b5d7-140395a41c38/resource/6d1912aa-4775-4f5e-b00d-18456ad872a5/download/burnsidetrees.geojson',
    format: 'geojson',
    short: 'Burnside',
    long: 'City of Burnside',
    country: 'Australia',
    crosswalk: {
        ref: 'TreeID',
        common: 'CommonName',
        height: 'TreeHeight',
        scientific: 'BotanicalN',
        dbh: 'Circumfere' // TODO reconcile
    },

},
{
    id: 'launceston',
    download: 'http://lcc.launceston.opendata.arcgis.com/datasets/63b09a3688804a17b0edc4b3b072a0d7_1.zip',
    format: 'zip',
    'filename': 'Trees.shp',
    short: 'Launceston',
    long: 'City of Launceston',
    country: 'Australia',
    crosswalk: {
        ref: 'objectid',
        common: 'name',
        scientific: 'genusspeci',
        maturity: 'age',
        // planted: '', case when planteddat = '0' then NULL else planteddat::date end,
        dbh: 'diametr_c',
        height: 'height_m',
        crown: 'horizontal',
        // health: 'vitality', // used to be present?
        captured: 'auditdate' // TODO date
    }, 
},
{
    id: 'hobsons_bay',
    download: 'https://data.gov.au/dataset/80051ffe-04d5-4602-b15b-60e0d0e3d153/resource/ea1ec6fc-02bd-4e36-8e43-c990b6a9268d/download/hbcc_street_and_park_trees.json',
    format: 'geojson',
    short: 'Hobson\'s Bay',
    long: 'City of Hobson\'s Bay',
    country: 'Australia',
    crosswalk: {
        genus: 'Genus',
        species: 'Species',
        dbh: 'DBH',
        tree_type: 'Type'
    },
    centre: [144.833, -37.85],
},
{
    id: 'glenelg',
    download: 'http://data.gov.au/dataset/3721ad67-7b5b-4815-96b1-9d8b1a89dbd7/resource/b9ff3d44-17b4-4f87-8a28-2d540fa37d8f/download/Glenelg-Street-and-Park-Trees.csv',
    format: 'csv',
    latitudeField: 'lat',
    longitudeField: 'lon',
    short: 'Glenelg',
    long: 'Glenelg Shire',
    country: 'Australia',
    crosswalk: identity,
},
{
    id: 'ryde',
    download: [ 
        'http://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/47843888-f9b6-4ae3-ba80-9318ff60a120/download/Public-Trees-2013.dbf',
        'http://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/1372b28f-4201-46ab-9099-be0458a317bb/download/Public-Trees-2013.prj',
        'http://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/00e339ad-e411-48b2-8cfa-ed3dfa8209ca/download/Public-Trees-2013.shp',
        'http://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/3f4f3346-52d5-4084-94fc-877bf70c0a76/download/Public-Trees-2013.shx'
    ],
    format: 'shp',
    'keepExtension': true,
    short: 'Ryde',
    long: 'City of Ryde',
    country: 'Australia',
    crosswalk: {
        height: 'Height' // sad, that's all there is.
    }

},
{
    id: 'southern_grampians',
    download: 'http://data.gov.au/geoserver/southern-grampians-street-and-park-trees/wfs?request=GetFeature&typeName=ckan_4a2843f5_8c01_438b_95f3_01ef0a518441&outputFormat=json',
    format: 'geojson',
    short: 'Southern Grampians',
    long: 'City of Southern Grampians',
    country: 'Australia',
    crosswalk: {
        ref: 'ref',
        scientific: 'species',
        common: 'common',
        location: 'location',
        height:'height',
        crown: 'crown',
        maturity:'maturity' // more like age
    },
},
{
    id: 'prospect1',
    download: 'https://data.sa.gov.au/data/dataset/5d86d41e-b6c6-47d5-9b88-4d95916c5e76/resource/d1e30913-6e91-4a1f-b576-64120cc4b242/download/city-of-prospect-tree-species-in-reserves-2016.csv',
    format: 'csv',
    short: 'Prospect',
    long: 'City of Prospect',
    country: 'Australia',
    centre: [138.6,-34.88],
    crosswalk: {
        species: 'Tree Species',
        maturity: 'Tree Age',
        dbh: x => x['Tree Circumference'] + ' circumference',
        health: 'Tree Health',
        structure: 'Tree Structure',
        height: 'Tree Height'
    }, 
},
{
    id: 'prospect2',
    download: 'https://data.sa.gov.au/data/dataset/7bf2e4a4-40cc-40fd-83a9-fabb6d854039/resource/3f6be219-d66f-4b40-bfc7-16214fbc0989/download/city-of-prospect-street-trees-2016.csv',
    format: 'csv',
    short: 'Prospect',
    long: 'City of Prospect',
    country: 'Australia',
    centre: [138.6,-34.88],
    crosswalk: {
        common: 'Species Name', // sigh
    },
    primary: 'prospect1',
},
{
    id: 'perth',
    download: 'https://opendata.arcgis.com/datasets/c5ce51d9789a4e9a8510acb8c8f3ecf4_0.zip',
    format: 'zip',
    'filename': 'PKS_AST_TREESMASTER_PV.shp',
    short: 'Perth',
    long: 'City of Perth',
    country: 'Australia',
    crosswalk: {
        scientific: 'BOTANICAL_',
        common: 'COMMON_NAM',
        family: 'FAMILY',
        height: 'TREE_HEIGH',
        plant: 'DATE_PLANT',
        ref: 'TREE_ID',
    }
    // crosswalk: {
    //     ref: 'tree_id',
    //     scientific: 'botanical',
    //     common: 'common_nam',
    //     family: 'family',
    //     height: 'height',
    //     dbh: 'dbh',
    //     crown: 'canopy_siz',
    //     maturity: 'age_class',
    //     ule: 'life_expec'
    //     //historical, rare_speci, canopy_den, est_age, prop_name, suburb, street_nam
    // },
    /*
    // what is this? old perth?
    perth: {
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
    */
},
{
    id: 'brimbank',
    download: 'https://data.gov.au/geoserver/brimbank-open-space-trees/wfs?request=GetFeature&typeName=ckan_7a57b5a1_2ca3_4171_be91_0d371cefd250&outputFormat=json',
    format: 'geojson',
    short: 'Brimbank',
    long: 'City of Brimbank',
    country: 'Australia',
    crosswalk: {
        ref: 'central_as',
        location: 'location',
        genus: 'genus',
        species: 'species',
        common: 'common_nam',
        maturity: 'age',
        height: 'height',
        crown: 'spread',
        // site_name, suburb...
    }
},
{
    id: 'bendigo',
    download: 'https://data.gov.au/geoserver/city-of-greater-bendigo-environment-trees/wfs?request=GetFeature&typeName=ckan_d17c9e50_fab1_40e6_b91d_6e665faf2656&outputFormat=json',
    format: 'geojson',
    short: 'Bendigo',
    long: 'City of Greater Bendigo',
    country: 'Australia',
    crosswalk: {
        ref: 'assetid',
        description: 'desc',
        //type
        // genus: 'genus', // contains rubbish like 'Eucalyptus M to Z' whereas scientific is clean.
        scientific: x => x.species.split(' - ')[0],
        common: x => x.species.split(' - ')[1],
        variety: x => x.cultivar !== 'Not Specified' ? x.cultivar : '',
        // house, st_name, st_type, st_suffix, suburb
    },
    centre: [144.298,-36.755],
},
{
    id: 'shepparton',
    download: 'https://data.gov.au/dataset/e794491f-2eb7-4035-8b0c-f7248c28feda/resource/a1148573-68b9-4bd8-bda4-f08030d38c9d/download/greatersheppartoncitycouncilstreetandparktrees.zip',
    format: 'zip',
    'filename': 'Greater_Shepparton_City_Council_Street_and_Park_Trees.shp',
    short: 'Shepparton',
    long: 'City of Shepparton',
    country: 'Australia',
    crosswalk: identity
},
{
    id: 'wyndham',
    // what about https://data.gov.au/dataset/ds-dga-87307c7b-b92c-48f1-841a-b5794dfb5322/details?q=trees ?
    download: 'https://data.gov.au/dataset/0254dee0-5b26-484f-a5ae-5ca3cab46601/resource/fb06e7c8-d037-489b-a963-b747271f2e54/download/trees.json',
    'download_old2': 'https://data.gov.au/dataset/0254dee0-5b26-484f-a5ae-5ca3cab46601/resource/4ab38849-d1de-4444-aeca-08719138d24f/download/trees.zip',
    gdal_options: '-s_srs unzip/OpenData_TI_Trees_LatestInspection.prj',
    format:'zip',
    'filename': 'OpenData_TI_Trees_LatestInspection.shp',
    short: 'Wyndham',
    long: 'City of Wyndham',
    country: 'Australia',
    crosswalk: {
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
    },
},
{
    id: 'port_phillip',
    download: 'https://data.gov.au/dataset/6b72d22b-d824-4281-bd08-ab62e3c38415/resource/9b0d7d55-5267-464b-85d7-3d141d779bab/download/city-of-port-phillip-trees.geojson',
    format: 'geojson',
    short: 'Port Phillip',
    long: 'City of Port Phillip',
    country: 'Australia',
    crosswalk: {
        ...identity,
        scientific: 'species'
    },
},
{
    id: 'boroondara',
    download: 'https://data.gov.au/geoserver/significant-tree/wfs?request=GetFeature&typeName=ckan_14e2b87e_c733_4071_b604_c0cb33d14a42&outputFormat=json',
    format: 'geojson',
    short: 'Boroondara',
    long: 'City of Boroondara',
    country: 'Australia',
    crosswalk: {
        species: 'botanicaln',
        common: 'commonname',
        height: 'height',
        crown: 'canopyspre', // canopysp_1?
        health: 'health',
        description: 'significan',
        location: 'locality',
        dbh: x => x.girth + ' girth'
        // suburb, groupid, qty, girth, age, position, risktotree, hazardtopu, streetnr
    },
},
{
    id: 'yarra',
    download: 'https://data.gov.au/data/dataset/f3c88ce7-504b-4ef7-907f-686037f7420c/resource/6e4186b0-3e00-48f9-a09c-cb60d1d0d49f/download/yarra-street-and-park-trees.geojson',
    format:'geojson',
    // significant? https://data.gov.au/dataset/ds-dga-4b950f69-8816-45a7-8788-951d788287bd/details?q=trees,
    short: 'Yarra',
    long: 'City of Yarra',
    country: 'Australia',
    crosswalk: {
        ...identity,
        species: s => (s.species || '').replace(/^[A-Z]\. /, '')

    },  

},
{
    id: 'glen_eira',
    download: 'https://data.gov.au/geoserver/street-and-park-trees/wfs?request=GetFeature&typeName=ckan_0553b144_9145_4458_922f_5c6175d2e100&outputFormat=json',
    format: 'geojson',
    short: 'Glen Eira',
    long: 'City of Glen Eira',
    country: 'Australia',
    crosswalk: {
        dbh: 'dbh',
        common: 'common_nam',
        scientific: 'botanical',
        height: 'height',
        crown: 'spread',
        location: 'locationty',

    },
},
{
    // TODO create a VRT file. no header.
    id: 'wodonga',
    download: 'https://data.gov.au/data/dataset/e7d6ebd3-04a8-4d73-b8ba-a9b82aa79b16/resource/180ba7ad-7bd7-490b-81f8-79c74ec0a915/download/tree.csv',
    format: 'csv',
    filename: 'wodonga.vrt',
    short: 'Wodonga',
    long: 'City of Wodonga',
    country: 'Australia',
    crosswalk: {
        ref: 'field_1',
        scientific:'field_2',
        common: 'field_3',
        //address: field_4
    },
    centre: [146.86, -36.125],
},
{
    id: 'hobart',
    download: 'http://data-1-hobartcc.opendata.arcgis.com/datasets/d50fa3c9875d43fbb7e462248160e1ee_0.geojson',
    format: 'geojson',
    short: 'Hobart',
    long: 'City of Hobart',
    country: 'Australia',
},
{
    id: 'sherwood_arboretum', //brisbane
    download: 'http://www.spatial-data.brisbane.qld.gov.au/datasets/613169f42b43494499c83640392c43e5_0.geojson',
    format: 'geojson',
    short: 'Sherwood Arboretum',
    long: 'Sherwood Arboretum (Brisbane)',
    country: 'Australia',
    crosswalk: {
        common: 'Common_Name',
        scientific: 'Scientific_Name',
        //Year_Established: '
        family: 'Family',
        height: 'Height',
        crown: 'Crown_width',
        dbh: x => x.DBH / 10 || undefined,
        id: 'ObjectId',
        // 'Nature_Conservation_Act_1992': 'Least concern'
        // 'EPBC_Act_1999': 'Not listed'
        // 'Australian': 'Yes'
        // 'Distribution': 'N NSW to SEQ'
        // 'Habitat': 'Coastal areas eucalypt forest and woodland'
        // 'Height': '7'
        // 'Crown_width': 3
        // 'DBH': 100
        // 'Species_Profile': 'Acacia concurrens commonly known as Black wattle or Curracabah is a tall shrub endemic to eastern Australia growing to a height of up to 10m. The botanic name concurrens describes the converging primary veins on the phyllodes (modified leaf stems which function as leaf). Bright yellow rod-shaped flowers are seen from late winter to early spring.', 


    }, 
},
{
    id: 'sydney',
    // not open data. see https://www.righttoknow.org.au/request/tree_data
    download: 'https://emscycletours.site44.com/opentrees-data/sydney-tree-data.csv',
    format: 'csv',
    filename: 'sydney.vrt',
    short: 'Sydney',
    long: 'City of Sydney',
    centre: [151.2, -33.892],
    country: 'Australia',
    crosswalk: {
        scientific: 'species',
    },
},
{
    id:'unley',
    country: 'Australia',
    short: 'Unley',
    long: '',
    download: 'https://opendata.arcgis.com/datasets/910774507d6a42248a50f9922054a0a0_0.zip',
    info:'http://hub.arcgis.com/datasets/unley::trees/data',
    format: 'zip',
    crosswalk: {
        // are these multitrees?
        genus: 'dom_genus_',
        species: 'dom_spcie',
        health: 'health',
        structure: 'structure',
        maturity: 'age',
        ule: 'unel___repl',

    }
},
].map(s => { 
    s.country = 'Australia';
    return s;
});