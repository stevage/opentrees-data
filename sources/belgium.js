module.exports = [
    {
        id:'antwerpen_be',
        country: 'Belgium',
        short: 'Antwerp',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/0293af55ca454b44ba789ee14c82543a_676.zip',
        info:'https://portaal-stadantwerpen.opendata.arcgis.com/datasets/boom/data',
        crosswalk: {
            scientific: 'LATBOOMSOO',
            dbh: 'STAMOMTREK',
            ref: 'ANTW_ID',

        }
    },
    {
        id:'wallonie_bruxelles_be',
        short: 'Wallonie-Bruxelles',
        long: '',
        download: 'https://www.odwb.be/explore/dataset/arbustum/download/?format=shp',
        info:'https://www.odwb.be/explore/dataset/arbustum/information/',
        crosswalk: {
        },
        license: '',
    },
    {
        id:'gent_be',
        short: 'Gent',
        long: 'Stad Gent',
        download: 'https://datatank.stad.gent/4/milieuennatuur/bomeninventaris.json',
        info:'https://datatank.stad.gent/4/milieuennatuur/bomeninventaris',
        srs: 'EPSG:3857', // why....
        crosswalk: {
        },
        license: 'https://overheid.vlaanderen.be/sites/default/files/documenten/ict-egov/licenties/hergebruik/modellicentie_gratis_hergebruik_v1_0.html',
    },
].map(s => ({...s, country: 'Belgium' }));
