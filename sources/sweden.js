module.exports = [

  
  {
    id:'umea',
    country: 'Sweden',
    short: 'Umea',
    long: '',
    download: 'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/download/?format=shp&timezone=Europe/Stockholm&lang=en',
    info:'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/export/?disjunctive.tradart_vetenskap_namn_1_1_2&disjunctive.tradart_svenskt_namn_1_1_3',
    format: 'zip',
    crosswalk: {
        scientific: 'tradart_vet',
        common: 'tradart_sve',
        location: 'gatu_eller',
        date: 'planterings',
    }
},
{
    id: 'tradportalen',
    info: 'https://www.tradportalen.se/Summary.aspx',
    download: 'https://tradportalen.s3.eu-north-1.amazonaws.com/tradportalen.zip',
    format: 'zip',
    filename: 'data/combined.json',
    short: 'Trädportalen',
    long: 'Trädportalen',
    country: 'Sweden',
    crosswalk: {
      scientific: x => String(x.Species).split(', ')[1],
      common: x => String(x.Species).split(', ')[0],
      height: 'Height',
      dbh: x => Number(x['TrunkCircumference']) / 3.14159 * 2,
    },
    country: 'Sweden'
  }
]
