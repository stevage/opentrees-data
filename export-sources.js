const sources = require('./sources');
require('fs').writeFileSync('sources-out.json', JSON.stringify(sources));