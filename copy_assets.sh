#!/bin/sh

# Run `npm install` before trying to run this script.
# This script is run by `npm run build` and copies some assets
# from the reveal.js package into the assets/ directory.

cp ./node_modules/reveal.js/dist/reveal.js \
   ./node_modules/reveal.js/dist/reveal.css \
   ./assets

# adjust theme here
cp ./node_modules/reveal.js/dist/theme/black.css \
   ./assets

# include more plugins here
cp ./node_modules/reveal.js/plugin/notes/notes.js \
   ./assets
