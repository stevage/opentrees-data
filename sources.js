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
const FEET = 3.280084;
const INCHES = 2.54;
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
            maturity:'maturity'
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
        id: 'madison',
        download: 'https://opendata.arcgis.com/datasets/b700541a20e446839b18d62426c266a3_0.zip',
        format: 'zip',
        short: 'Madison, WI',
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
        short: 'Portland, Oregon',
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
            genus: 'Genus',
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
    // {
    //     id: 'providence',
    //     download: 'https://data.providenceri.gov/api/views/uv9w-h8i4/rows.csv?accessType=DOWNLOAD',
    //     format: 'csv',
    //     short: 'Providence',
    //     long: 'Providence, Rhode Island',
    //     crosswalk: {
    //         scientific: 'Species',
    //         dbh: x => Number(x['Diameter in Inches']) * INCHES
    //     }
    // },
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
        short: 'Buffalo, NY',
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
        short: 'Boulder, CO',
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
        short: 'Cambridge, MA',
    

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
        id: 'paris',
        download: 'https://www.data.gouv.fr/en/datasets/r/c558ddb2-cc46-4e26-b96a-bd2735a8f343',
        format:'geojson',
        short: 'Paris',
        country: 'France',
        crosswalk: {
            ref: 'idemplacement',
            common: 'libellefrancais',
            genus: 'genre',
            species: 'espece',
            variety: 'varieteoucultivar',
            dbh: x => Number(x['circonferenceencm']) / 3.14159 * 2,
            maturity: 'stadedeveloppement', // A, J, JA, M. Maybe 'Jeune, jeune adulte, adulte, mûr/mature'?

        },
    },
    {
        id: 'lyon',
        // download: 'https://transcode.geo.data.gouv.fr/services/5e2a1e77fa4268bc255379c2/feature-types/ms:abr_arbres_alignement.abrarbre?format=GeoJSON&projection=WGS84',
        download: 'https://download.data.grandlyon.com/ws/grandlyon/abr_arbres_alignement.abrarbre.shp?srsname=EPSG:4326',
        // format: 'geojson',
        format: 'zip',
        filename: 'abr_arbres_alignement.abrarbre.shp',
        crosswalk: {
            scientific: 'essence',
            variety: 'variete',
            genus: 'genre',
            species: 'espece',
            location: 'localisati',
            planted: 'anneeplant',
            ref: 'identifian',
            common: 'essencefra',
        },
        short: 'Lyon',
        country: 'France',
    },
    {
        id: 'bordeaux',
        info: 'https://opendata.bordeaux-metropole.fr/explore/dataset/bor_arbres/information/',
        download: 'https://opendata.bordeaux-metropole.fr/explore/dataset/bor_arbres/download/?format=geojson&lang=en',
        format: 'geojson',
        crosswalk: {
            scientific: 'nom',
            updated: 'mdate',
            dbh: 'diametre',
            height: 'hauteur',
            family: 'famille',
            variety: 'variete',
            location: 'typo_espace',
            health: 'statut',
            planted: 'tranche_age', // not a date but a range, 42 - 63
            // age_tranche_basse
        },
        short: 'Bordeaux',
        country: 'France',
    },
    {
        id: 'nice',
        download: 'http://opendata.nicecotedazur.org/data/storage/f/2019-07-22T07%3A41%3A29.958Z/ev-arbre-opendata-2019.geojson',
        info: 'https://trouver.datasud.fr/dataset/sync149f50a-cartographie-des-arbres-communaux',
        format: 'geojson',
        crosswalk: {
            ref: 'idENT',

        },
        short: 'Nice',
        country: 'France',
    },
    {
        id: 'grenoble',
        download: 'http://entrepot.metropolegrenoble.fr/opendata/38185-GRE/EspacePublic/json/ARBRES_TERRITOIRE_VDG_EPSG4326.json',
        info: 'http://data.metropolegrenoble.fr/ckan/dataset/les-arbres-de-grenoble',
        format: 'geojson',
        crosswalk: {
            ref: 'BIEN_REFERENCE', // asset id?
            genus: 'GENRE_BOTA',
            species: 'ESPECE',
            variety: 'VARIETE',
            maturity: 'STADEDEDEVELOPPEMENT',
            description: 'REMARQUES',
            planted: 'ANNEDEPLANTATION',


        },
        short: 'Grenoble',
        country: 'France',

    },
    
    {
        id: 'montpellier',
        country: 'France',
        download: 'https://data.montpellier3m.fr/sites/default/files/ressources/MMM_MTP_ArbresAlign.zip',
        info: 'https://data.montpellier3m.fr/dataset/arbres-dalignement-de-montpellier',
        format: 'zip',
        filename: 'MMM_MTP_ArbresAlign.shp',
        crosswalk: {
            ref: 'idarbre',
            scientific: 'nom_latin',
            common: 'nom_commun',
            planted: 'plantation',
            updated: 'releva',
            crown: 'couronnem',
            height: 'hauteurm',

        },
        short: 'Montpellier',
        country: 'France',

    },
    
    {
        id: 'grand_paris_seine_ouest',
        country: 'France',
        info: 'https://www.data.gouv.fr/fr/datasets/arbres-2/',
        download: 'https://www.data.gouv.fr/fr/datasets/r/a10c7776-afa5-4b8a-8050-081788818b55',
        format: 'zip',
        filename: 'arbres-v2.shp',
        short: 'Grand Paris Seine Ouest',
        crosswalk: {
            scientific: 'genespvar',
            height: 'hauteur',
            planted: 'an_plant',
            ref: 'id_plant',
        }

    },
    {
        id: 'agen',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/fededc1c-6e42-4a6d-9469-849fd956fbfe',
        format: 'zip',
        filename: 'Arbres.shp',
        crosswalk: {
            ref: 'id_ponctue',
            common: 'espece_arb',
            scientific: 'nom_latin',

        },
        short: 'Agen',
    },
    {
        id: 'saint_quentinois',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/c6000378-1f3c-4c0c-8f62-9a5b72dc7a85',
        format: 'zip',
        filename: 'ARBRES.shp', // hmmm
        info: '',
        short: 'Saint Quentinois',
        long: 'Agglomération du Saint Quentinois',
        crosswalk: {
            scientific: 'nomlatin',
            common: 'nomfrancai',
            updated: 'EditDate',
            maturity: 'fk_stadede',
            dbh: 'tronc_diam',
            height: 'haut_tot',
            ref: 'id_arbre',


        }
    },
    {
        id: 'metz',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/3aa28eaa-9ee4-49ff-bb73-74c21d14268d',
        format: 'zip',
        filename: 'vrd_esv_arb.shp',
        info: '',
        short: 'Metz',
        crosswalk: {
            dbh: 'diametre',
            scientific: 'nom_espece', // a species code
            note: 'observatio',
        }
    },
    {
        id: 'seine_saint_denis',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/c631e78d-4d15-44eb-a40d-cd593f0e1bed',
        format: 'zip',
        filename: 'fr-dpt93-1646.shp',
        info: '',
        short: 'Seine-Saint-Denis',
        crosswalk: {
            height: 'hauteur',
            scientific: 'essence',
            maturity: 'stade_dvlp',
            dbh: x  => `Circumference: ${x.circonfere}`
        }
        // long: 'Agglomération du Saint Quentinois',
    },
    {
        id: 'versailles',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/4b9d9fe4-f8da-4db1-8057-9e83b2abf5d2',
        format: 'geojson',
        info: '',
        short: 'Versailles',
        crosswalk: {
            scientiifc: 'ESPECE', // watch out for 'VIDE' TODO
            common: 'FRANCAIS',


        }
    },
    {
        id: 'nevers',
        country: 'France',
        download: 'https://www.data.gouv.fr/fr/datasets/r/dbdc2068-ee22-474d-8a42-261554482a4f',
        format: 'zip',
        filename: 'ARBRE_ALIGNEMENT.shp',
        info: '',
        short: 'Nevers',
        long: 'Ville de Nevers',
        crosswalk: {
            scientific: 'espece',
        }
    },
    {
        // TODO fix bad geometry
        id:'toulouse',
        country: 'France',
        short: 'Toulouse',
        long: 'Toulouse Métropole',
        download: 'https://www.data.gouv.fr/fr/datasets/r/b5b275e5-ef20-43c4-ad3f-5604c67a75a3',
        info:'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-toulouse/',
        format: 'zip',
        centre: [1.44,43.60],
        // dear god, linestring geometries...
        crosswalk: {
            ref: 'id',
            common: 'patrimoine', // the horror..."44 PIN PARASOL,15 CHENE LIEGE,45 MICOCOULIER"
        }
    },
    {
        id:'orleans',
        country: 'France',
        short: 'Orléans',
        long: "Ville d'Orléans",
        download: 'https://www.data.gouv.fr/fr/datasets/r/804b8b61-9f8f-4a0d-8524-35ea5d6e265f',
        info:'https://www.data.gouv.fr/fr/datasets/arbres-ville-dorleans/',
        format: 'zip',
        crosswalk: {
            ref: 'id_arbre',
            genus: x => String(x.genre).replace(/ \?/, ''),
            species: x => String(x.species).replace(/ \?/, ''),
            variety: 'variete',
            planted: 'date_plant',
        }
    },
    {
        id:'saint_egreve',
        country: 'France',
        short: 'Saint-Egrève',
        long: 'Ville de Saint-Egrève',
        download: 'https://www.data.gouv.fr/fr/datasets/r/2bda9508-27e5-4de6-aba3-fdb0d9059a22',
        info:'https://www.data.gouv.fr/fr/datasets/les-arbres-de-saint-egreve/',
        format: 'zip',
        crosswalk: {
            genus: 'genre',
            species: 'espece',
            planted: 'anne_plan',
            common: 'essence',
        }
    },
    {
        id:'bayonne',
        country: 'France',
        short: 'Bayonne',
        long: 'Ville de Bayonne',
        download: 'https://www.data.gouv.fr/fr/datasets/r/e99bddd1-384b-4954-9f4f-483bb0fcaef0',
        info:'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-bayonne/',
        format: 'zip',
        crosswalk: {
            genus: 'genre',
            species: 'espece',
            height: 'hauteur',
            common: 'vernaculai',
            variety: 'variete',
            planted: 'anne_plan',
            scientific: 'gev', // genus espece variete?
            circumference: 'circonf',
            age: 'agechrono', // also agephysio??

        }
    },
    {
        id:'issy',
        country: 'France',
        short: 'Issy-les-Moulineaux',
        long: "Ville d'Issy-les-Moulineaux",
        download: 'https://www.data.gouv.fr/fr/datasets/r/578636b3-e9ca-4aa7-b298-e69fd0f3acc9',
        info:'https://www.data.gouv.fr/fr/datasets/r/578636b3-e9ca-4aa7-b298-e69fd0f3acc9',
        format: 'zip',
        crosswalk: {
            scientific: 'essence_sci',
            common: 'essence_com',
            circumference: 'circonferen',
            height: 'hauteur',
            maturity: 'classe_age',
            health: 'statut_emp',
            updated: 'date_maj', // mise-a-jour
        }
    },
    {
        id:'rennes1',
        country: 'France',
        short: 'Rennes',
        long: 'Rennes Métropole',
        download: 'https://www.data.gouv.fr/fr/datasets/r/85d25eb0-b34e-4559-884d-ac052e62c620',
        info:'https://www.data.gouv.fr/fr/datasets/arbres-dornement-des-espaces-verts-de-la-ville-de-rennes-1/',
        format: 'zip',
        crosswalk: {
            genus: 'genre',
            species: 'espece',
            planted: 'date_plant',
            variety: 'variete',
            circumference: 'circonfere',
        }
    },
    {
        id:'rennes2',
        country: 'France',
        short: 'Rennes',
        long: 'Rennes Métropole',
        download: 'https://www.data.gouv.fr/fr/datasets/r/c9cf6518-267c-4aa4-bdbe-d1602f78b07f',
        info:'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-en-accompagnement-de-voirie-sur-la-ville-de-rennes-1/',
        format: 'zip',
        primary: 'rennes1',
        crosswalk: {
            ref: 'numero',
            planted: 'date_plant',
            health: 'etat',
            genus: 'genre',
            species: 'espece',
            variety: 'variete',
            circumference: 'circonfere',
            height: 'hauteur',
        }
    },
    {
        id:'mulhouse',
        country: 'France',
        short: 'Mulhouse',
        long: 'Mulhouse Alsace Agglomération',
        download: 'https://www.data.gouv.fr/fr/datasets/r/3c47ef6b-10ea-4723-81b9-a3c0b99e9550',
        info:'https://www.data.gouv.fr/fr/datasets/caracteristiques-des-arbres-dalignements-geres-par-la-ville-de-mulhouse/',
        format: 'zip',
        crosswalk: {
            scientific: 'libelle_es',
            planted: 'date_plant',
            common: 'com_nom',
            ref: 'obj_ident',
        }
    },
    {
        id: 'montreal',
        info: 'http://donnees.ville.montreal.qc.ca/dataset/arbres',
        download: 'http://donnees.ville.montreal.qc.ca/dataset/3e3efad6-9f2f-4cc0-8f1b-92de1ccdb282/resource/c6c5afe8-10be-4539-8eae-93918ea9866e/download/arbres-publics.csv',
        format: 'csv',
        crosswalk: {
            scientific: 'Essence_latin',
            common: 'ESSENCE_ANG',
            dhb: 'DHP', // diametre hauteur poitrine
            updated: 'Date_releve',
            planted: 'Date_plantation',
            ref: 'EMP_NO',
            // location could be INV_TYPE
        },
        short: 'Montreal',
        country: 'Canada',
        centre: [-73.56, 45.56],
        // more csvs here - do they overlap?
    },
    {
        id: 'quebec',
        download: 'https://www.donneesquebec.ca/recherche/fr/dataset/34103a43-3712-4a29-92e1-039e9188e915/resource/de031174-cbdf-4d69-869c-21cca8036279/download/vdq-arbrerepertorie.geojson',
        info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vque_26',
        format: 'csv',
        crosswalk: {
            scientific: 'NOM_LATIN',
            common: 'NOM_FRANCAIS',
            dbh: 'DIAMETRE',
            planted: 'DATE_PLANTE',
            location: 'NOM_TOPOGRAPHIE',
        },
        short: 'Quebec City',
        country: 'Canada',
        
    },
    {
        id: 'longueuil', // Canada
        info: 'https://www.longueuil.quebec/fr/donnees-ouvertes/arbres',
        download: 'https://www.longueuil.quebec/sites/longueuil/files/donnees_ouvertes/arbres.zip',
        format: 'zip',
        filename: 'Arbres.shp',
        short: 'Longueuil (Quebec)',
        long: 'Ville de Longueuil (Quebec)',
        country: 'Canada',
        crosswalk: {
            scientific: x => String(x.Espece).split(' - ')[0],
            common:  x => String(x.Espece).split(' - ')[1],
            dbh: 'DiamTronc',

        },

    },
    {
        id: 'calgary',
        download: 'https://data.calgary.ca/api/views/tfs4-3wwa/rows.csv?accessType=DOWNLOAD',
        format: 'csv',
        short: 'Calgary',
        long: 'City of Calgary',
        country: 'Canada',
        crosswalk: {
            // DECIDUOUS_EVERGREEN...
            common: 'COMMON_NAME',
            genus: 'GENUS',
            species: 'SPECIES',
            variety: 'CULTIVAR',
            dbh: 'DBH_CM',
            health: x => {
                if (x.TREE_CONDITION_RATING_PERC >= 70)
                    return 'Good';
                else if (x.TREE_CONDITION_RATING_PERC >= 50)
                    return 'Fair';
                else
                    return 'Poor';
                // I have no idea
            },  ref: 'WAM_ID'
        }

    }, 
    {
        id: 'edmonton',
        download: 'https://data.edmonton.ca/api/views/eecg-fc54/rows.csv?accessType=DOWNLOAD',
        format: 'csv',
        short: 'Edmonton',
        long: 'City of Edmonton',
        country: 'Canada',
        crosswalk: {
            dbh: 'DIAMETER_BREAST_HEIGHT',
            scientific: 'SPECIES_BOTANICAL',
            common: 'SPECIES_COMMON',
            // GENUS, SPECIES, CULTIVAR
            health: 'CONDITION_PERCENT', // let the front end worry about this
            // health: x => {
            //     if (x.CONDITION_PERCENT >= 70)
            //         return 'Good';
            //     else if (x.CONDITION_PERCENT >= 50)
            //         return 'Fair';
            //     else
            //         return 'Poor';
            //     // I have no idea
            // },
            planted: 'PLANTED_DATE',
            location: 'LOCATION_TYPE',
            ref: 'id',
        }
    },
    {
        id: 'ottawa',
        info: 'https://ouverte.ottawa.ca/datasets/inventaire-des-arbres',
        download: 'https://opendata.arcgis.com/datasets/451e904e2753453eb699b2e853ab5857_1.csv',
        format: 'csv',
        crosswalk: {
            scientific: 'SPECIES',
            ref: 'SAP_ID',

        },
        short: 'Ottawa',
        country: 'Canada',
    },
    {
        id: 'moncton',
        info: 'http://ouvert.moncton.ca/datasets/arbres',
        download: 'https://opendata.arcgis.com/datasets/60d5b564e732444b81a650c7c4aa548a_0.csv?outSR=%7B%22latestWkid%22%3A2953%2C%22wkid%22%3A2036%7D',
        format: 'csv',
        country: 'Canada',
        crosswalk: {
            common: 'BOTNAME',
            dbh: 'DIAM',
            height: 'HT',

            updated: 'edited_date',
        },
        short: 'Moncton',
        country: 'Canada',
    },
    {
        id: 'waterloo',
        country: 'Canada',
        info:'http://data.waterloo.ca/datasets/2447415303e74bb9acdf0f43c2236b72_0',
        download: 'https://opendata.arcgis.com/datasets/2447415303e74bb9acdf0f43c2236b72_0.zip',
        format: 'zip',
        short:'Waterloo',
        crosswalk: {
            common: 'COM_NAME',
            scientific: 'LATIN_NAME',
            location: 'TREE_TYPE',
            dbh: 'DBH_CM',
            ref: 'OBJECTID'
        }
        // filename: 

    },

    {
        id: 'winnipeg',
        country: 'Canada',
        download: 'https://data.winnipeg.ca/api/views/h923-dxid/rows.csv?accessType=DOWNLOAD',
        info:'https://data.winnipeg.ca/Parks/Tree-Inventory-Map/xyma-gm38',
        format: 'csv',
        short:'Winnipeg',
        crosswalk: {
            ref: 'tree_id',
            scientific: 'botanical',
            common: 'common',
            dbh: 'dbh', 
        }
    },
    {
        id: 'vancouver',
        download: 'https://opendata.vancouver.ca/explore/dataset/street-trees/download/?format=geojson&lang=en',
        format: 'geojson',
        short: 'Vancouver',
        country: 'Canada',
        crosswalk: {
            ref: 'tree_id',
            genus: 'genus_name',
            species: 'species_name',
            variety: 'cultivar_name',
            common: 'common_name',
            height: 'height_range_id', // this is in feet? urgh
            dbh: Number('diameter')*2.54, // seriouosly, inches
            planted: 'date_planted',


        }
    },   
    {
        // TODO https://data.surrey.ca/dataset/important-trees
        // TODO https://data.surrey.ca/dataset/park-screen-trees

        id: 'surrey',
        short: 'Surrey',
        long: 'City of Surrey',
        country: 'Canada',
        download: 'http://data.surrey.ca/dataset/634d2f06-2214-49b3-9309-4baa51b61ec4/resource/86625e14-8d09-45e8-9b91-9d301d32b10e/download/parkspecimentrees.csv',
        info: 'https://data.surrey.ca/dataset/park-specimen-trees',
        format: 'csv',
        crosswalk: {
            // scientific: 'DESCRIPTION', // breakdown fields available too
            genus: 'TREE_GENUS',
            species: 'TREE_SPECIES',
            variety: 'TREE_VARIETY',
            ule: 'YRS_LIFE_EXPECTANCY',
            // health: 'CONDITION', // blank
            // updated: 'CONDITIONDATE',


        }

    },
    {
        id: 'toronto',
        short: 'Toronto',
        country: 'Canada',
        download: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/download_resource/c1229af1-8ab6-4c71-b131-8be12da59c8e',
        info:'https://open.toronto.ca/dataset/street-tree-data/',
        format:'zip',
        filename: 'TMMS_Open_Data_WGS84.shp',
        gdal_options: '-skipfailures',
        crosswalk: {
            dbh: 'DBH_TRUNK',
            common: 'COMMON_NAM',
            scientific: 'BOTANICAL_',
        }
    },
    {
        id: 'lisbon',
        country: 'Portugal',
        download: 'https://opendata.arcgis.com/datasets/202d0f1a7f234e449761af8af14436d6_0.zip',
        info: 'http://geodados.cm-lisboa.pt/datasets/arvoredo?geometry=-9.312%2C38.745%2C-9.148%2C38.768',
        format: 'zip',
        filename: 'Arvoredo.shp',
        
        crosswalk: {
            scientific: 'ESPECIE_VA',
            location: 'LOCAL',
        },
        short: 'Lisbon',
        country: 'Portugal',

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
        short: 'Buenos AIres',
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
            genus: 'nombre_gen',

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
];
