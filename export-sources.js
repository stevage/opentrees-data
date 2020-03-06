const sources = require('./sources');
const fs = require('fs');
const child_process = require('child_process');

function writeSources() {
    const sourcesOut = sources.map(s => {
        const os = JSON.parse(JSON.stringify(s));
        for (const k of Object.keys(s.crosswalk || {})) {
            os.crosswalk[k] = String(s.crosswalk[k])
        }
        return os;
    });

    fs.writeFileSync('sources-out.json', JSON.stringify(sourcesOut, null, 2));
    fs.writeFileSync('../opentrees/src/sources-out.json', JSON.stringify(sourcesOut, null, 2));
}

writeSources();
child_process.execSync('cp stats.json ../opentrees/src');
child_process.execSync('cp source-stats.json ../opentrees/src');
