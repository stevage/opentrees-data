module.exports = [
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
        id:'edinburgh',
        country: 'UK',
        short: 'Edinburgh',
        long: '',
        download: 'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39.zip',
        info:'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39',
        format: 'zip',
        crosswalk: {
            scientific: 'LatinName',
            common: 'CommonName',
            height: 'Height',
            spread: 'Spread',
            maturity: 'AgeGroup',
            bh: 'DiameterAt',


        }
    },
    {
        id:'dundee',
        country: 'UK',
        short: 'Dundee',
        long: 'Dundee City Council',
        download: 'https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67',
        info:'https://data.dundeecity.gov.uk/dataset/trees',
        format: 'csv',
        crosswalk: {
            ref: 'TREE_NUMBER',
            height: 'HEIGHT_M',
            circumference: 'GIRTH',
            maturity: 'AGE_CLASS',
            scientific: 'SCIENTIFIC_NAME',
            common: 'POPULAR_NAME',

        }
    },
    {
        id:'york',
        country: 'UK',
        short: 'York',
        long: 'City of York Council',
        download: 'https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.csv',
        info:'https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees',
        format: 'csv',
        crosswalk: {
            ref: 'TREEID',
            scientific: 'BOTANICAL',
            common: 'SPECIES',

        }
    },
    {
        id:'york-private',
        country: 'UK',
        short: 'York',
        long: '',
        download: 'https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.csv',
        info:'https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees',
        format: 'csv',
        crosswalk: {
            owner: 'OWNER',
            common: 'SPECIES',
            scientific: 'BOTANICAL',
        },
        primary: 'york',
    },

];