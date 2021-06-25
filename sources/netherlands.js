module.exports = [
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
    {
        id:'haag',
        country: 'Netherlands',
        short: 'Den Haag',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/dd3873f6-b2d0-42e8-94c7-f7b47dcb71f0/resource/7ac8ba4a-586e-43f2-b12e-014079c83f00/download/bomen-csv.zip',
        info:'https://data.overheid.nl/dataset/bomen-csv',
        format: 'csv',
        zip: true,
        latitudeField:'LAT',
        longitudeField:'LONG',
        crosswalk: {
            ref: 'BOOMNUMMER',
            scientific: 'BOOMSOORT_WETENSCHAPPELIJ',
            dbh: 'STAMDIAMETERKLASSE',
            maturity:'LEEFTIJDSKLASSE',
            age: 'LEEFTIJD', 
            owner: 'EIGENAAR'
        },
        centre: [4.2777,52.0642],
    },
    {
        id:'hilversum',
        country: 'Netherlands',
        short: 'Hilversum',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/08fa5613-ec8f-4e43-ba2f-db986615075e/resource/2ae335c9-4228-4d4c-81a1-6688aa7218ac/download/bomenhilversum.csv',
        info:'https://data.overheid.nl/dataset/bomen-hilversum',
        format: 'csv',
        crosswalk: {
            scientific: 'BOOMSOORT_WETENSCHAPPELIJK',
            common: 'BOOMSOORT_NEDERLANDS',
            height: 'BOOMHOOGTE',
            // STAMDIAMETERKLASSE?
            planted: 'PLANTSEIZOEN', // 2015-2016
        }
    },
    {
        id:'tilburg_nl',
        country: 'Netherlands',
        short: 'Tilburg',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/96b46ab5-7638-46bb-b416-c480170b9a84/resource/6f639eb1-7497-4fc7-831b-d24e077bfe45/download/bomen.csv',
        info:'https://data.overheid.nl/dataset/bomen-tilburg',
        format: 'csv',
        crosswalk: {
            updated: 'datum_gemeten',
            ref: 'boomnummer',
            scientific: 'latijnse_boomnaam',
            common: 'nederlandse_boomnaam',
            planted: 'plantjaar',
            dbh: 'diameter_in_cm',
            height: 'boomhoogte',

        }
    },
    {
        id:'eindhoven_nl',
        country: 'Netherlands',
        short: 'Eindhoven',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/23d824dc-158f-4e23-8bbf-c10c00ce73cf/resource/0c8e87ba-0fde-48e4-a997-7abd04c7c692/download/bomen29-01.csv',
        info:'https://data.overheid.nl/dataset/bomen-eindhoven',
        format: 'csv',
        crosswalk: {
            scientific: 'LATIJNSENA',
            common: 'BOOMSOORT',
            planted: 'PLANTJAAR',
            height: 'HOOGTE',
            dbh: 'DIAMETER',
            health: 'VITALITEIT',
        }
    },
    {
        id:'amersfoot_nl',
        country: 'Netherlands',
        short: 'Amersfoot',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/a6054acf-3e41-4142-9b1a-52d73ff022f3/resource/7794f7e2-8bb9-45ba-9a9f-df910b09c40f/download/amersfoort-gemeentelijke_bomen.csv',
        info:'https://data.overheid.nl/dataset/amersfoort-gemeentelijke_bomen',
        format: 'csv',
        crosswalk: {
            location: 'BOOMKLASSE',
            height: 'BOOMHOOGTE',
            owner: 'EIGENAAR',
            crown: 'KROONDIAMETER',
            dbh: 'STAMDIAMETER',
            ref: 'ID',
            common: 'NEDERLANDSE_NAAM',
            scientific: 'BOOMSOORT',
            planted: 'PLANTJAAR',
            ule: 'LEVENSVERW',
            owner: 'BEHEERDER',

        }
    },
    {
        id:'dordrecht_nl',
        short: 'Dordrecht',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/4c1cd59b-1057-4d47-bd84-f67a9cfd0f27/resource/94612e3e-eaac-4ac4-8db1-cdda2bdf361c/download/allebomendordrecht-2016-sep-2.csv',
        // there's also another one... I think this is the superset?
        info:'https://data.overheid.nl/dataset/bomen-dordrecht',
        crosswalk: {
            ref: 'ELEMENTNUMMER',
            scientific: 'SRT_NAAM',
            common: 'Nederlandse naam',
            height: 'HOOGTE',
            dbh: 'DIAMETER',
            installed: 'AANLEGJAAR', //"introduction year"
            owner: 'EIGENDOM',


        },
        license: 'CC0-1.0',
        centre: [4.670, 51.806],
    }, 
    {
        id:'lelystad_nl',
        short: 'Lelystad',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/a510615b-165d-442a-8956-1df78feb321e/resource/c6950c16-dff5-40b4-b1b5-0b2a2dffb382/download/bomen.csv',
        info:'https://data.overheid.nl/dataset/bomen-lelystad',
        crosswalk: {
            common: 'SOORT_NED',
            scientific: 'SOORT_LATIJN',
            height: 'HOOGTE',
            health: 'CONDITIE',
            updated: 'INSPECTIEDATUM'
        },
        license: 'CC-BY-4.0',
        centre: [5.478, 52.509],
    },
    {
        id:'sliedrecht_nl',
        short: 'Sliedrecht',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/ab8997d4-8c32-4f96-aa3e-d5961baeaf6f/resource/fc898475-4fa6-47f3-9a9a-8e85acb7b6a4/download/sliedrechtbomen20170412.csv',
        info:'https://data.overheid.nl/dataset/bomen-sliedrecht',
        crosswalk: {
            installed: 'Aanlegjaar',
            common: 'Naam_NL',
            ref: 'Objectcode',
            scientific: 'Boomsort',

        },
        license: 'CC0-1.0',
        centre: [4.773, 51.82],
        srs: 'EPSG:28992',
    },
    {
        id:'assen_nl',
        short: 'Assen',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/3ad3233b9b1c4fb0bffb23b36b0474c9_0.csv',
        info:'https://data.overheid.nl/dataset/dataset-bomen-assen#panel-4-downloadable-files',
        crosswalk: {
            ref: 'BOOMNUMMER',
            updated: 'DATUM',
            scientific: 'BOOMSOORT',
            planted: 'PLANTJAAR',
            height: 'CODE_HOOGTE', // also HOOGTE
            health: 'CONDITIE',
            owner: 'EIGENAARSTYPE',
            // lots of others...


        },
        license: 'CC-BY-4.0',
        centre: [6.5475, 52.991]
    },
    {
        id:'arnhem_nl',
        short: 'Arnhem',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/4d988cd7848049d3a574fcbd477985be_0.csv',
        info:'https://data.overheid.nl/dataset/bomenkaart-arnhem#panel-4-downloadable-files',
        crosswalk: {
            ref: 'BEHEERCODE',
            scientific: 'BOOMSOORT',
            common: 'NEDERLANDSE_NAAM',
            planted: 'PLANTJAAR',
            owner: 'EIGENAAR',
            //...others

        },
        license: 'CC-BY-4.0',
        centre: [5.914, 51.984],
    },
    {
        id:'delft_nl',
        short: 'Delft',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/e510d480282944c3a16c8a46d3d99064_0.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
        info:'https://data.overheid.nl/dataset/bomen-in-beheer-door-gemeente-delft',
        format:'csv',
        crosswalk: {
            ref: 'ID_VELD',
            scientific: 'BOOMSOORT_',
            height: 'BOOMHOOGTE',
            health: 'CONDITIE_K',

        },
        license: 'CC0-1.0',
    },
    {
        id:'groningen_nl',
        short: 'Groningen',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/9861d295-21cd-4ece-8648-88b141dc3532/resource/4a52525e-04ac-4934-8294-a2566986b24f/download/gem_groningen_bomen.zip',
        info:'https://ckan.dataplatform.nl/dataset/9861d295-21cd-4ece-8648-88b141dc3532',
        crosswalk: {
            common: 'NEDNAAM',
            scientific: 'LATNAAM',
            owner: 'OMSCHRIJVP',

        },
        srs: 'EPSG:28992',
        license: 'CC0-1.0',
        centre: [6.58358, 53.2212],
    },
    {
        id:'alblasserdam_nl',
        short: 'Alblasserdam',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/74c93ecc-82cc-46fa-8210-04818ae27279/resource/5bc33717-ff42-4aab-8bed-5ed0f618b1f8/download/gegevens-bomen-2017-alblasserdam.csv',
        info:'https://data.overheid.nl/dataset/bomen-alblasserdam',
        crosswalk: {
            scientific: 'Boomsoort',
            common: 'Boomsoort Nederlands',
            
        },
        srs: 'EPSG:28992',

        license: 'CC0-1.0',
    },
    {
        id:'zvartewaterland_nl',
        short: 'Zvartewaterland',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/70e9a2ad03cf49a5a45b2076091b7ef3_0.csv',
        info:'https://data.overheid.nl/dataset/bomen-zwartewaterland',
        crosswalk: {
            common: 'NEDBOOMSOORT',
            scientific: 'LATBOOMSOORT',
            installed: 'AANLEGJAAR',

        },
        license: 'CC-BY-4.0',
    },
    // broken
    // {
    //     id:'lingewaard_nl',
    //     short: 'Lingewaard',
    //     long: '',
    //     download: 'https://geodatastore.pdok.nl/id/dataset/3251be7c-b01f-4503-8858-0958c004e6de',
    //     info:'https://data.overheid.nl/dataset/waardevolle-bomen-gemeente-lingewaard',
    //     format:'zip',
    //     crosswalk: {
    //     },
    //     license: 'CC0-1.0',
    // },
    {
        id:'barendrecht_nl',
        short: 'Barendrecht',
        format: 'csv',
        long: '',
        download: 'https://maps.bar-organisatie.nl/Online/Open%20Data%20Portaal/Barendrecht/Bomen/Bomen.CSV',
        info:'https://data.overheid.nl/dataset/58765-bomen-barendrecht',
        crosswalk: {
            owner: 'BEHEERDER',
            common: 'NEDBOOMSOORT',
            scientific: 'LATBOOMSOORT',
            dbh: 'DIAMETER',
            installed: 'AANLEGJAAR',
            updated: 'INSPECTIEDATUM',

        },
        license: 'CC0-1.0',
        srs: 'EPSG:28992',
    },
    {
        id:'zaanstad_nl',
        short: 'Zaanstad',
        long: '',
        download: 'https://ckan.dataplatform.nl/dataset/fde68bfe-9e7b-4db6-9924-485166029eaf/resource/96c805d4-fd3c-41ce-8e35-c98b30513819/download/znstdor15o-bor_vegetatie.csv',
        info:'https://data.overheid.nl/dataset/znstdor15o',
        crosswalk: {
            scientific: 'soortnaam_bomen',
        },
        license: 'CC0-1.0',
    },
    {
        id:'nijmegen_nl',
        short: 'Nijmegen',
        long: '',
        download: 'https://services.nijmegen.nl/geoservices/extern_OpenData/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=extern_kaartviewer_GRN_BOMEN&outputFormat=csv',
        info:'https://opendata.nijmegen.nl/dataset/geoserver-bomen-nijmegen',
        format:'csv',
        crosswalk: {
            ref: 'ID',
            planted: 'PLANTJAAR',
            scientific: 'BOOMSOORT',
            updated: 'DATUM_BIJGEWERKT',

        },
        license: 'CC0-1.0',
        srs: 'EPSG:28992',
    },
    {
        id:'haarlem_nl',
        short: 'Haarlem',
        long: '',
        download: 'https://data.haarlem.nl/geoserver/wfs?service=WFS&version=2.0&request=GetFeature&outputFormat=csv&srsName=EPSG%3A4326&typeName=gemeentehaarlem:bor_bomen&bbox=491380.2526954542,6859676.6140624685,532619.7473045458,6880323.3859375315,EPSG%3A3857',
        format:'csv',
        info:'https://www.haarlem.nl/opendata/open-data-detail/#/odp/odp_datasets.33',
        crosswalk: {
            ref: 'boomnummer',
            scientific: 'name',
            age: 'leeftijd',
            crown: 'kroondiameter',
            owner: 'beheerder',

        },
        license: '',
    },
    {
        id:'roosendaal_be',
        short: 'Roosendaal',
        long: 'Gemeente Roosendaal',
        download: 'https://opendata.arcgis.com/datasets/f97b4a30ac914a73aa7552a96f0ae82d_0.zip',
        info:'https://opendata.roosendaal.nl/datasets/gbi-boom-public',
        crosswalk: {
        },
        license: '',
    },
].map(x => ({ ...x, country: 'Netherlands' }));
