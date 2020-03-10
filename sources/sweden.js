module.exports = [
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
