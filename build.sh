#!/bin/bash

echo "Cleaning up"
rm -rf dist/
mkdir dist
mkdir dist/styles

MAIN_FILE_NAME="index"
PALETTE="styles/palette.css"
THEME="styles/theme.css"

echo "Building..."
./node_modules/.bin/html-minifier --collapse-whitespace $MAIN_FILE_NAME.html -o dist/$MAIN_FILE_NAME.html
./node_modules/.bin/uglifyjs --compress --mangle -o dist/$MAIN_FILE_NAME.js -- $MAIN_FILE_NAME.js
./node_modules/.bin/cssnano $PALETTE dist/$PALETTE
./node_modules/.bin/cssnano $THEME dist/$THEME
./node_modules/.bin/cssnano $MAIN_FILE_NAME.css dist/$MAIN_FILE_NAME.css

echo "Build complete!"
