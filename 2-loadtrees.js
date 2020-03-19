#!/usr/bin/env node --max-old-space-size=8192



const sources = require('./sources');
const colors = require('colors');

const fs = require('fs');
const child_process = require('child_process');
const { match, formatForSource, extensionForSource } = require('./utils');
const recurseDirs = require('recursive-readdir');

child_process.execSync('cp vrt/* data');

const perf = require('execution-time')();
perf.start('load');


let skipped = 0;
sources.forEach(async source => {
    let filename;
    var outname = `tmp/out_${source.id}.nd.geojson`;
    let extraFields = '';
    let format = formatForSource(source);
    let extension = extensionForSource(source);
    try {
        filename = source.filename || `${source.id}.${extension}`;

        // ideally we'd redo all the "format: zip" as "format: shp, zip: true". or even just assume zip is true for shp.
        if (extension === 'zip') {
            if (!source.filename) {
                let searchExt = [source.format, 'shp'].find(e => e && e !== 'zip');
                // let searchExt = extension;
                // if (source.format) {
                //     searchExt = source.format === 'zip' ? 'shp' : source.format;
                // }
                // detect first shapefile/csv/whatever in directory
                // console.log(`${source.id} Looking for `, searchExt);
                filename = (await recurseDirs(`data/unzip/${source.id}`)).find(f => f.match(searchExt + '$'))
                filename = filename.replace(/^data\//, '');
                
                // filename = fs.readdirSync(`data/unzip/${source.id}`).find(f => f.match(format + '$'))
            }
            // filename = `unzip/${source.id}/${filename}`;
        } else if (source.loadname) {
            filename = source.loadname;
        }


        if (fs.existsSync(outname)) {
            // console.log('Skipping '.yellow + source.id + ' (already exists)');
            skipped++;
            return;
        }
        if (filename) {
            if (extension === 'csv') {
                source.srs = source.srs || 'EPSG:4326';
                const xFields = source.longitudeField || 'Longitude,Lon,Lng,LONG,X,X_LONG,long,X_Koordina,X-Koordinate,coord long';
                const yFields = source.latitudeField || 'Latitude,Lat,LAT,Y,Y_LAT,lat,Y_Koordina,Y-Koordinate,coord lat'
                const geomFields = source.geometryField || 'the_geom,SHAPE,wkb_geometry,geo_shape,GEOMETRIE,geom';
                extraFields += `-oo GEOM_POSSIBLE_NAMES="${geomFields}" -oo Y_POSSIBLE_NAMES="${yFields}" -oo "X_POSSIBLE_NAMES=${xFields}"`;
            }
            if (source.srs) {
                extraFields = `-s_srs ${source.srs} ${extraFields}`
            }

            console.log(filename);
            let cmd = `ogr2ogr -t_srs EPSG:4326 -gt 65536 ${extraFields} -f GeoJSONSeq ../${outname} ${source.gdal_options || ''} "${filename}"`;
            console.log(cmd.cyan);
            child_process.execSync(cmd, { cwd: 'data' });
            console.log(`Loaded ${filename}`);
            console.log('Checking for null or bad geometry');
            cmd=`head ${outname} | ndjson-filter '!d.geometry || d.geometry.coordinates[0] < -180 || d.geometry.coordinates[0] > 180 || d.geometry.coordinates[1] < -80 || d.geometry.coordinates[1] > 80' 1>&2`;
            // console.log(cmd.cyan);
            child_process.execSync(cmd);


        }
    } catch (e) {
        console.log(`Error with ${filename} (${source.id})`);
        console.error(e.error || e);
    }
});
console.log(`Finished converting trees in ${perf.stop('load').words}. Skipped ${skipped} sources.`);
