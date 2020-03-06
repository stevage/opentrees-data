module.exports = [
    {
        id:'halle',
        country: 'Germany',
        short: 'Halle',
        long: 'Halle (Saale)',
        download: 'https://www.halle.de/pushOD.aspx?FileName=f2087a53-2c10-f7c5-4dba-9ad5112a90cb_shp.zip',
        info:'https://www.halle.de/de/Verwaltung/Online-Angebote/Offene-Verwaltungsdaten/Mit-Kartenbezug/index.aspx?ID=f2087a53-2c10-f7c5-4dba-9ad5112a90cb',
        format: 'zip',
        crosswalk: {
            planted: 'pflanzjahr',
            crown: 'krone_m',
            height: 'hoehe_m',
            // gefaellt - removed?
            ref: 'baum_nr',
            scientific: 'art_botan',
            common: 'art_deut',
            // baumart? Laubbaum

        }
    },
    {
        id:'utrecht',
        country: 'Netherlands',
        short: 'Utrecht',
        long: '',
        download: 'https://ckan.dataplatform.nl/datastore/dump/2d6893b4-d56d-4865-b6cc-0bda42e547f5?bom=True',
        info:'https://ckan.dataplatform.nl/dataset/bomenkaart/resource/2d6893b4-d56d-4865-b6cc-0bda42e547f5',
        format: 'csv',
        crosswalk: {
            scientific: 'Naam_Wet',
            common: 'Naam_NL',
            planted: 'Plantjaar',
            ref: 'Boomnr',
            owner: 'Eigenaar',
            
        }
    },
    {
        id:'leipzig',
        country: 'Germany',
        short: 'Leipzig',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/918dfaa87b754c4384ddcf869cfd6dc6_0.zip',
        info:'https://hub.arcgis.com/datasets/esri-de-content::stra%C3%9Fenbaumkataster-leipzig',
        format: 'zip',
        crosswalk: {
            scientific: 'Baumart_wi',
            common: 'Baumart_de',
            planted: 'Pflanzjahr',
            ref: 'STANDORTNR',
        }
    },

    {
        id:'bonn',
        country: 'Germany',
        short: 'Bonn',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/f8f130c1dd4e4ea9b5fe1f2385673cab_0.zip',
        info:'http://opendata.gis.ms.gov/datasets/esri-de-content::baumkataster-bonn',
        format: 'zip',
        crosswalk: {
            ref: 'baum_id',
            scientific: 'lateinisch',
            common: 'deutscher_',
            // alter_ ?
        }
    },
    {
        id: 'koeln',
        country: 'Germany',
        short:'Köln',
        long:'Stadt Köln',
        download: 'https://offenedaten-koeln.de/sites/default/files/Bestand_Einzelbaeume_Koeln_0.csv',
        info:'https://offenedaten-koeln.de/dataset/baumkataster-koeln',
        format: 'csv',
        srs: 'EPSG:3044',
        crosswalk: {
            ref: 'Baum-Nr.',
            // STAMMVON, STAMMBIS,
            crown: 'KRONE',
            height: 'HöHE',
            age: 'AlterSchätzung',
            genus: 'Gattung',
            species: 'Art',
            common: 'DeutscherN',            

        },
        centre: [6.9796, 50.9356],
    },
    {
        id:'berlin',
        country: 'Germany',
        short: '',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/05c3f9d7dea6422b86e30967811bddd7_0.zip',
        info:'',
        format: 'zip',
        crosswalk: {
            scientific: 'Art_Bot',
            common: 'Art_Dtsch',
            // Gattung, //
            planted: 'Pflanzjahr', 
            height: 'BaumHoehe',
            location: 'Kategorie', // maybe others Staummfg... 
        },
        centre: [13.43, 52.485],
    },
    {
        id:'frankfurt',
        country: 'Germany',
        short: 'Frankfurt',
        long: 'Frankfurt am Main',
        download: 'https://opendata.arcgis.com/datasets/8c50110f190e43599baf50701aaff13a_0.zip',
        info:'https://hub.arcgis.com/datasets/esri-de-content::baumkataster-frankfurt-am-main',
        format: 'zip',
        crosswalk: {
            scientific: x => String(x.Gattung_Ar).split(', ')[0],
            common: x => String(x.Gattung_Ar).split(', ')[1],
            ref: 'Baumnummer',
            planted: 'Pflanzjahr',
            crown: 'Kronendurc',

        }
    },
    {
        id:'hamburg_hafen',
        country: 'Germany',
        short: 'Hamburg Hafen',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/35950460a3744fa4b088570b2df55718_0.zip',
        info:'https://hub.arcgis.com/datasets/esri-de-content::stra%C3%9Fenbaumkataster-hamburg-hafen',
        format: 'zip',
        crosswalk: {
            scientific: 'art_latein',
            common: 'art_deutsc',
            description: 'sorte', // contains variety...
            planted: 'pflanzjahr',
            crown: 'kronendurc', //kronendmza??
            circumference: 'stammumfan',
            // stand-bear??
            owner:'zustaendig',


        }
    },
].map(s => {s.country = 'Germany'; return s; });