module.exports = [
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
        id:'valencia_es',
        short: 'Valencia',
        long: '',
        download: 'http://mapas.valencia.es/lanzadera/opendata/arboles/JSON',
        info:'https://github.com/stevage/OpenTrees/issues/29',
        format: 'geojson',
        crosswalk: {
            scientific: 'planta',
            common: 'castellano',
            //grupo?
        },
        license: 'CC-BY-4.0',
        centre: [-0.38564,39.46454],
    },
].map(x => ({ ...x, country:'Spain' }));