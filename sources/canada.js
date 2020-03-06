module.exports = [
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
        short: 'Longueuil',
        long: 'Ville de Longueuil',
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
        srs: 'EPSG:2953',
        crosswalk: {
            common: 'BOTNAME',
            dbh: 'DIAM',
            height: 'HT',

            updated: 'edited_date',
        },
        short: 'Moncton',
        country: 'Canada',
        centre: [-64.81577,46.10613],
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
        // probably duplicated by Edmonton anyway?
        id:'strathcona',
        country: 'Canada',
        short: 'Strathcona',
        long: '',
        download: 'https://data.strathcona.ca/api/views/v78i-7ntw/rows.csv?accessType=DOWNLOAD',
        info:'https://data.strathcona.ca/Environment/Tree/v78i-7ntw',
        format: 'csv',
        coordsFunc: x => x.Location.replace(/[()]/g, '').split(', ').map(Number),
        crosswalk: {
            ref: 'TreeSiteID',
            common: 'Name',

        },
        centre: [-113.54, 53.477]
    },
    {
        id:'regina',
        country: 'Canada',
        short: 'Regina',
        long: '',
        download: 'https://ckanprodstorage.blob.core.windows.net/opendata/Tree/SHP_ZIP/shp.Tree.zip',
        info:'http://open.regina.ca/dataset/city-of-regina-tree-inventory',
        format: 'zip',
        gdal_options: '-skipfailures',
        crosswalk: {
            common: 'Species',
            owner: 'Ownership',
            planted: 'Year_Plant',
            dbh: 'Diameter',
            value: 'Tree_Value'
        }
    },
    {
        id:'north_vancouver',
        country: 'Canada',
        short: 'North Vancouver',
        long: '',
        download: 'http://geoweb.dnv.org/Products/Data/SHP/EnvStreetTree_shp.zip',
        info:'http://geoweb.dnv.org/data/index.php',
        format: 'zip',
        crosswalk: {
            common: 'COMMONNAME',
            genus: 'GENUS',
            species: 'SPECIES',
            dbh: 'DBH_CM',
            height: 'HEIGHT_M',
            health: 'CONDITION', // see also CONDITION_ which has text
            ref: 'TAGNUMBER',
            location: 'AM_TYPE_RE',

        }
    },
    {
        id:'white_rock',
        country: 'Canada',
        short: 'White Rock',
        long: 'City of White Rock',
        download: 'http://wroms.whiterockcity.ca/opendata/GIS/Data/Spatial/Parks/SHP/Tree.zip',
        info:'http://data.whiterockcity.ca/dataset/tree',
        format: 'zip',
        filename: 'Open_data/GIS/Data/Spatial/Parks/SHP/Tree.shp',
        crosswalk: {
            scientific: 'SpeciesNam',
            ref: 'Tree_ID',
            // look at Removed

        }
    },
    {
        id:'kelowna',
        country: 'Canada',
        short: 'Kelowna',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/39d13a47b8f94cce82a9b4c86efc8ee7_114.zip?outSR=26911',
        info:'http://opendata.kelowna.ca/datasets/39d13a47b8f94cce82a9b4c86efc8ee7/data?geometry=-119.693%2C49.577%2C-119.178%2C49.887',
        format: 'zip',
        crosswalk: {
            genus: 'GENUS',
            species: 'species',
            common: 'species_co',
            dbh: 'DBH',
            ref: 'SITE_ID',
        },
        centre: [-119.46786, 49.89029],
    },        
    {
        id:'welland',
        country: 'Canada',
        short: 'Welland',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/4357fb7835fe49b39197a9440b2e868b_0.zip',
        info:'http://hub.arcgis.com/datasets/welland::welland-trees',
        format: 'zip',
        crosswalk: {
            description: 'Genus',
            dbh: 'DiamDBH',
            planted: 'DatePlant',
            location: 'PlantArea',
            
        }
    },
    {
        id:'ajax',
        country: 'Canada',
        short: 'Ajax',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/c5d5ff5351a54fdb8d3934abbb5cda9a_8.zip',
        info:'http://hub.arcgis.com/datasets/TownofAjax::town-trees',
        format: 'zip',
        delFunc: X => x.STATUS==='REMOVED', /// TODO implement
        crosswalk: {
            dbh: 'DBH',
            common: 'TYPE',
            updated: 'LAST_EDI_1',
            note: 'COMMENTS'


        }
    },
    {
        id:'prince_george',
        country: 'Canada',
        short: 'Prince George',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/054e46bee4594eb787d574266c832430_3.zip',
        info:'http://hub.arcgis.com/datasets/CityofPG::trees',
        format: 'zip',
        crosswalk: {
            planted: 'TreePlantD',
            common: 'CommonName',
            genus: 'GenusName',
            species: 'SpeciesNam',
            variety: 'VarietyNam',
            age: 'TreeAge',
            height: 'TreeHeight',
            dbh: 'DBH',
            crown: 'TreeCrownA',
            health: 'ConditionD',
            location: 'TreeClassi',

        }
    },
    {
        id:'oakville',
        country: 'Canada',
        short: 'Oakville',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/66e3b95688394391a433fd29873aff20_10.zip',
        info:'http://hub.arcgis.com/datasets/ExploreOakville::trees',
        format: 'zip',
        crosswalk: {
            scientific: x => String(x.SPECIES).split(' - ')[1],
            common: x => String(x.SPECIES).split(' - ')[0],
            dbh: 'DBH',
            height: 'HEIGHT',
            crown: 'CROWN_WIDT',

        }
    },
    {
        // see also http://hub.arcgis.com/datasets/VicMap::surveyed-trees
        id:'victoria_bc',
        country: 'Canada',
        short: 'Victoria',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/36e90771770542baaa89afddce69195a_15.zip',
        info:'http://hub.arcgis.com/datasets/VicMap::tree-species',
        format: 'zip',
        crosswalk: {
            scientific: 'Species',
            dbh: 'DiameterAt',
            height: 'Height',
            age: 'PlantingDa',
            planted: 'YearPlante',
            updated: 'InventoryD',

        }
    },
    {
        id:'kamloops',
        country: 'Canada',
        short: 'Kamloops',
        long: 'City of Kamloops',
        download: 'https://opendata.arcgis.com/datasets/e14c04be6c6c4692b70147edb937088c_25.zip',
        info:'http://hub.arcgis.com/datasets/kamloops::trees',
        format: 'zip',
        crosswalk: {
            // EDITBLEFRUITTREEFLAG!
            common:'SPECIES', //mapl,amur
            spread: 'SPREAD',
            planted: 'PLANTEDYEA',
            ref: 'FACILITYID',



        }
    },
    {
        id:'chestermere',
        country: 'Canada',
        short: 'Chestermere',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/72e47f7c7b194047936ebb0ce3c4d32e_0.zip',
        info:'http://hub.arcgis.com/datasets/Chestermere::tree-points',
        format: 'zip',
        crosswalk: {
            common: 'Species',
            scientific: 'Species_Sc', // null?
            planted: 'Date_Plant',
            height: 'Height__me',
            health: 'Condition',

        }
    },
    {
        id:'new_west_west',
        country: 'Canada',
        short: 'New West',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/eb043d306e4b4652a10b4b7b51f718ab_102.zip',
        info:'http://hub.arcgis.com/datasets/newwestcity::trees-west',
        format: 'zip',
        crosswalk: {
            scientific: 'Scientific',
            common: 'Common_Nam',
            variety: 'Cultivar',

        }
    },
    {
        id:'new_west_east',
        country: 'Canada',
        short: 'New West',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/341e47f1d4cd4b4aa14a8804b992cc7e_101.zip',
        info:'http://hub.arcgis.com/datasets/newwestcity::trees-east',
        format: 'zip',
        crosswalk: {
            scientific: 'Scientific',
            common: 'Common_Nam',
            variety: 'Cultivar',
        },
        primary: 'new_west_west'
    },
    {
        id:'maple_ridge',
        country: 'Canada',
        short: 'Maple Ridge',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/290505c676d64cf09989eca1320aedd3_5.zip',
        info:'http://hub.arcgis.com/datasets/mapleridge::street-tree',
        format: 'zip',
        crosswalk: {
            species: 'Type',
            common: 'CommonName',
            variety: 'Variety',
            genus: 'Genus',
            species: 'Species',
            // stuff about refunds?
        }
    },
    {
        id:'barrie',
        short: 'Barrie',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/16123463ba3d48859a83f4883a414a45_7.zip',
        info:'http://hub.arcgis.com/datasets/barrie::tree-location',
        format: 'zip',
        crosswalk: {
            ref: 'ASSETID',
            location: 'TREETYPE',

        }
    },
    // something wrong with this one, it never generates
    // {
    //     id:'langley',
    //     country: '',
    //     short: 'Langley',
    //     long: '',
    //     download: 'https://opendata.arcgis.com/datasets/1971f19fc28c489b908eab199a5d2e72_85.zip?geometry=%7B%22xmin%22%3A-122.733%2C%22ymin%22%3A49.075%2C%22xmax%22%3A-122.406%2C%22ymax%22%3A49.114%2C%22type%22%3A%22extent%22%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D',
    //     info:'http://hub.arcgis.com/datasets/esric-yourville::parks-trees?geometry=-122.733%2C49.075%2C-122.406%2C49.114',
    //     format: 'zip',
    //     crosswalk: {
    //     }
    // },
    {
        id:'victoriaville',
        country: '',
        short: 'Victoriaville',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/ae1c4b5613334d8a823359565fafb911_12.zip',
        info:'http://hub.arcgis.com/datasets/victoriaville::tree',
        format: 'zip',
        crosswalk: {
            // angle??
            // TYPE, SIZE, ANGLE, LANGUAGE,...what do we do with any of this??
        }
    },
        
].map(s => { 
    s.country = 'Canada';
    return s;
});