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
]