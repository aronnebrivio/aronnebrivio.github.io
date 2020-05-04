#!/bin/bash

MAIN_FILE_NAME="index"
SRC_FOLDER="src"
DIST_FOLDER="dist"
SCRIPTS_FOLDER="scripts"
PALETTE="styles/palette.css"
THEME="styles/theme.css"
FAVICON="favicon.png"
PROFILE="profile.jpg"
NOJEKYLL=".nojekyll"
CNAME="CNAME"

echo "Cleaning up..."
rm -rf $DIST_FOLDER/
mkdir $DIST_FOLDER
mkdir $DIST_FOLDER/styles

echo "Building..."
./node_modules/.bin/html-minifier --collapse-whitespace --remove-comments $SRC_FOLDER/$MAIN_FILE_NAME.html -o $DIST_FOLDER/$MAIN_FILE_NAME.html
./node_modules/.bin/uglifyjs --compress --mangle -o $DIST_FOLDER/$MAIN_FILE_NAME.js -- $SRC_FOLDER/$MAIN_FILE_NAME.js
./node_modules/.bin/cssnano $SRC_FOLDER/$PALETTE $DIST_FOLDER/$PALETTE
./node_modules/.bin/cssnano $SRC_FOLDER/$THEME $DIST_FOLDER/$THEME
./node_modules/.bin/cssnano $SRC_FOLDER/$MAIN_FILE_NAME.css $DIST_FOLDER/$MAIN_FILE_NAME.css
cp $SRC_FOLDER/$FAVICON $DIST_FOLDER/$FAVICON
cp $SRC_FOLDER/$PROFILE $DIST_FOLDER/$PROFILE
cp -r $SRC_FOLDER/$SCRIPTS_FOLDER $DIST_FOLDER/$SCRIPTS_FOLDER
cp $NOJEKYLL $DIST_FOLDER/$NOJEKYLL
cp $CNAME $DIST_FOLDER/$CNAME

echo "Build complete!"
