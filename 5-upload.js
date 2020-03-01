#!/usr/bin/env node
// const options = require('./options')('Upload vector tiles to Mapbox.');
const fs = require('fs-extra');
require('colors');

const upload = require('mapbox-upload');
const perf = require('execution-time')();
const config = require('./config.json');
console.log('5: Uploading vector tiles to Mapbox'.yellow);

const mapid = 'stevage.9slh6b3l';
perf.start('upload');
const progress = upload({
    file: 'mbtiles/trees.mbtiles',
    account: 'stevage',
    accesstoken: config.mapboxUploadToken,
    mapid,
    name: 'opentrees'
});
let prog = 0;
progress.on('progress', p => { 
    // if (Math.floor(p.percentage / 10) > prog) {
        prog = Math.floor(p.percentage / 10);
        console.log(`${mapid.cyan} ${String(Math.round(p.percentage)).yellow}%, ${Math.round(p.remaining/1024000).toLocaleString().yellow} MB to go.`);
    // }

});
progress.once('finished', p => {
    console.log(`${"opentrees".cyan} done in ${perf.stop('upload').words}.`)
});
progress.on('error', err => {
    if (err) {
        console.error(err)
    }
});