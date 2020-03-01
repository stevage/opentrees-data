#!/usr/bin/env node --max-old-space-size=8192

const sources = require('./sources');
const colors = require('colors');


const fs = require('fs');
const child_process = require('child_process');

child_process.execSync('cp vrt/* data');

sources.forEach(source => {
    var filename;
    var outname = `tmp/out_${source.id}.geojson`;
    try {
        if (source.format.match(/geojson|csv|shp/)) {
            filename = `${source.id}.${source.format === 'csv' ? 'vrt' : source.format}`;
        } else if (source.format === 'zip') {
            filename = 'unzip/' + source.filename;
        } else if (source.loadname) {
            filename = source.loadname;
        } else {
            console.log('Skipping '.yellow + source.id)
        }
        if (fs.existsSync(outname)) {
            console.log('Skipping '.yellow + source.id + ' (already exists)');
            return;
        }
        if (filename) {
            console.log(filename);
            let cmd = `ogr2ogr -t_srs EPSG:4326 -gt 65536 -f GeoJSON ../${outname} ${source.gdal_options || ''} ${filename}`;
            console.log(cmd.cyan);
            child_process.execSync(cmd, { cwd: 'data' });
            console.log(`Loaded ${filename}`);
        }
    } catch (e) {
        console.log(`Error with ${filename}`);
    }
})
