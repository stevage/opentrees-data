module.exports = [
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
].map(s => { s.country = 'France'; return s });