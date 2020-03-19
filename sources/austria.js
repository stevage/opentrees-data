module.exports = [{
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
    },
    license:'CC-BY-4.0' 

},

{
    id:'linz',
    country: 'Austria',
    short: 'Linz',
    long: 'City of Linz',
    download: 'http://data.linz.gv.at/katalog/umwelt/baumkataster/2020/FME_BaumdatenBearbeitet_OGD_20200225.csv',
    info:'https://www.data.gv.at/katalog/dataset/baumkataster',
    format: 'csv',
    crosswalk: {
        ref: 'BaumNr',
        genus: 'Gattung',
        species: x => x.Art !== '0' ? x.Art : undefined,
        common: 'NameDeutsch',
        height: 'Hoehe',
        crown: 'Schirmdurchmesser',
        dbh: 'Stammumfang',
    },
    license:'CC-BY-4.0' 
},
].map(s => ({...s, country: 'Austria' }));