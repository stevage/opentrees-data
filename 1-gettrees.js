#!/usr/bin/env node --max-old-space-size=8192
/*
Step 1:
  - download file, call it something sensible on disk
  - if it's a zip file, unzip it into a sensible directory name
*/
/* jshint esnext:true */
const fs = require('fs');
const colors = require('colors');
const download = require('download');
const extract = require('extract-zip');
const sources = require('./sources');
const child_process = require('child_process');
const { match, formatForSource, extensionForSource } = require('./utils');

['./data', './data/unzip', './tmp'].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

let skipCount = 0;
sources.forEach(function(source) {
    var urls = source.download;
    if (!Array.isArray(urls)) {
        urls = [urls];
    }
    urls.forEach(async url => {
        const extension = extensionForSource(source);
        
        var filename = 'data/' + source.id + '.' + extension;
        if (!fs.existsSync(filename)) {
            console.log('Downloading '.cyan + /*source.download + ' to ' + */ filename);

            try {
                const data = await download(url)
                    // .pipe(fs.createWriteStream(filename));
            
                fs.writeFileSync(filename, data);            
                console.log('Downloaded '.green + filename);
                if (extension === 'zip') {
                    console.log('Unzipping ' + filename);
                    try {
                        child_process.execSync(
                            `unzip -d ${process.cwd()}/data/unzip/${source.id} "${filename}"`,
                            { stdio: 'inherit' }
                        );
                        console.log('Unzipped '.green + filename);
                    } catch (err) {
                        console.error('Error unzipping '.error + filename + ': ' + err);
                    }

                }
            } catch (err) {
                console.error((filename + ': ').red + err);
                child_process.execSync(`mv "data/${filename}" "data/${filename}.bad"`);
                // remove the partially downloaded file?
            };
        } else {
            skipCount++;
            // console.log('(Skip ' + filename + ')');
        }
    });
});
console.log(`Skipped ${skipCount} sources that already existed on disk.`);
