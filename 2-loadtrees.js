#!/usr/bin/env node --max-old-space-size=8192

const sources = require('./sources');
const colors = require('colors');


const fs = require('fs');
const child_process = require('child_process');

child_process.execSync('cp vrt/* data');

sources.forEach(source => {
    var filename;
    var outname = `tmp/out_${source.id}.nd.geojson`;
    let extraFields = '';
    try {
        if (source.format === 'csv') {
            // if (source.latitudeField) {
            filename = `${source.id}.csv`
            extraFields = `-s_srs ${source.srs || 'EPSG:4326'} `
            
            // if (source.wktField) {
            //     extraFields += `-oo WKT=
            extraFields += `-oo GEOM_POSSIBLE_NAMES=the_geom,SHAPE,wkb_geometry,geo_shape -oo Y_POSSIBLE_NAMES=${source.latitudeField || 'Latitude,Lat,Y,Y_LAT,lat,Y_Koordina'} -oo X_POSSIBLE_NAMES=${source.longitudeField || 'Longitude,Lon,Lng,X,X_LONG,long,X_Koordina'} `;
            // } else {
            //     filename = `${source.id}.vrt`;
            // }
        } else if (source.format === 'vrt') {
            filename = `${source.id}.vrt`;
        } else if (source.format === 'geojson') {
            filename = `${source.id}.geojson`;
        } else if (source.format === 'gml') {
            filename = `${source.id}.gml`;
        } else if (source.format === 'zip') {
            if (!source.filename) {
                // detect first shapefile in directory
                filename = fs.readdirSync(`data/unzip/${source.id}`).find(f => f.match(/shp$/))
                filename = `unzip/${source.id}/${filename}`;
            } else {
                filename = `unzip/${source.id}/${source.filename}`;
            }
        } else if (source.loadname) {
            filename = source.loadname;
        } else {
            console.log('Skipping '.yellow + source.id)
        }
        if (fs.existsSync(outname)) {
            // console.log('Skipping '.yellow + source.id + ' (already exists)');
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
        console.error(e.error);
    }
});
