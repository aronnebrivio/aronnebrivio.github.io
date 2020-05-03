#!/bin/bash

SRC_FOLDER="src"
MAIN_FILE_NAME="index"
PALETTE="styles/palette.css"
THEME="styles/theme.css"
FAVICON="favicon.png"
PROFILE="profile.jpg"

echo "Cleaning up..."
rm -rf dist/
mkdir dist
mkdir dist/styles

echo "Building..."
./node_modules/.bin/html-minifier --collapse-whitespace $SRC_FOLDER/$MAIN_FILE_NAME.html -o dist/$MAIN_FILE_NAME.html
./node_modules/.bin/uglifyjs --compress --mangle -o dist/$MAIN_FILE_NAME.js -- $SRC_FOLDER/$MAIN_FILE_NAME.js
./node_modules/.bin/cssnano $SRC_FOLDER/$PALETTE dist/$PALETTE
./node_modules/.bin/cssnano $SRC_FOLDER/$THEME dist/$THEME
./node_modules/.bin/cssnano $SRC_FOLDER/$MAIN_FILE_NAME.css dist/$MAIN_FILE_NAME.css
cp $SRC_FOLDER/$FAVICON dist/$FAVICON
cp $SRC_FOLDER/$PROFILE dist/$PROFILE

echo "Build complete!"
