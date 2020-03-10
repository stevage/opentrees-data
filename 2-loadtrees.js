#!/usr/bin/env node --max-old-space-size=8192



const sources = require('./sources');
const colors = require('colors');

const fs = require('fs');
const child_process = require('child_process');
const { match } = require('./utils');


child_process.execSync('cp vrt/* data');

const perf = require('execution-time')();
perf.start('load');


let skipped = 0;
sources.forEach(source => {
    let filename;
    var outname = `tmp/out_${source.id}.nd.geojson`;
    let extraFields = '';
    source.format = source.format || match(source.download, /\.([a-z]+)$/, 1);
    try {
        filename = source.filename || `${source.id}.${source.format}`;
        if (source.format === 'csv') {
            extraFields = `-s_srs ${source.srs || 'EPSG:4326'} `            
            extraFields += `-oo GEOM_POSSIBLE_NAMES=the_geom,SHAPE,wkb_geometry,geo_shape -oo Y_POSSIBLE_NAMES=${source.latitudeField || 'Latitude,Lat,LAT,Y,Y_LAT,lat,Y_Koordina'} -oo X_POSSIBLE_NAMES=${source.longitudeField || 'Longitude,Lon,Lng,LONG,X,X_LONG,long,X_Koordina'} `;
        }
        // ideally we'd redo all the "format: zip" as "format: shp, zip: true". or even just assume zip is true for shp.
        if (source.format === 'zip' || source.zip) {
            if (!source.filename) {
                const format = (source.format === 'zip' ? 'shp' : source.format);
                // detect first shapefile/csv/whatever in directory
                filename = fs.readdirSync(`data/unzip/${source.id}`).find(f => f.match(format + '$'))
            }
            filename = `unzip/${source.id}/${filename}`;
        } else if (source.loadname) {
            filename = source.loadname;
        }


        if (fs.existsSync(outname)) {
            // console.log('Skipping '.yellow + source.id + ' (already exists)');
            skipped++;
            return;
        }
        if (filename) {
            console.log(filename);
            let cmd = `ogr2ogr -t_srs EPSG:4326 -gt 65536 ${extraFields} -f GeoJSONSeq ../${outname} ${source.gdal_options || ''} ${filename}`;
            console.log(cmd.cyan);
            child_process.execSync(cmd, { cwd: 'data' });
            console.log(`Loaded ${filename}`);
            console.log('Checking for null geometry');
            cmd=`head ${outname} | ndjson-filter '!d.geometry' 1>&2`;
            // console.log(cmd.cyan);
            child_process.execSync(cmd);


        }
    } catch (e) {
        console.log(`Error with ${filename} (${source.id})`);
        console.error(e.error || e);
    }
});
console.log(`Finished converting trees in ${perf.stop('load').words}. Skipped ${skipped} sources.`);
