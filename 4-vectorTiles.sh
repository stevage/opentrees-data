#!/bin/bash
mkdir -p mbtiles
tippecanoe --layer=trees --force --output=mbtiles/trees.mbtiles -Z 7 -z 15 --base-zoom=11 --minimum-detail=7 --force-feature-limit -rf100000 --read-parallel tmp/allout.json