#!/bin/bash

MAIN_FILE_NAME="index"
SRC_FOLDER="src"
DIST_FOLDER="dist"
JS_LIBS_FOLDER="libs"
ASSETS_FOLDER="assets"
SCRIPTS_FOLDER="$ASSETS_FOLDER/js"
STYLES_FOLDER="$ASSETS_FOLDER/css"
IMAGES_FOLDER="$ASSETS_FOLDER/images"
MANIFEST="manifest.json"
SERVICE_WORKER="service-worker.js"
NOJEKYLL=".nojekyll"
CNAME="CNAME"

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "Cleaning up..."
rm -rf $DIST_FOLDER/
mkdir -p $DIST_FOLDER/$SCRIPTS_FOLDER
mkdir -p $DIST_FOLDER/$STYLES_FOLDER
mkdir -p $DIST_FOLDER/$IMAGES_FOLDER

echo "Building..."
# Minify HTML
./node_modules/.bin/html-minifier --collapse-whitespace --remove-comments $SRC_FOLDER/$MAIN_FILE_NAME.html -o $DIST_FOLDER/$MAIN_FILE_NAME.html

# Minify CSS files
for file in $(ls $SRC_FOLDER/$STYLES_FOLDER)
do
    npx postcss $SRC_FOLDER/$STYLES_FOLDER/$file > $DIST_FOLDER/$STYLES_FOLDER/$file
done

# Minify JS files (excluded libs folder)
for file in $(ls -p $SRC_FOLDER/$SCRIPTS_FOLDER | grep -v $JS_LIBS_FOLDER)
do
    ./node_modules/.bin/uglifyjs --compress --mangle -o $DIST_FOLDER/$SCRIPTS_FOLDER/$file -- $SRC_FOLDER/$SCRIPTS_FOLDER/$file
done

# Copy JS libs folder content
cp -a $SRC_FOLDER/$SCRIPTS_FOLDER/$JS_LIBS_FOLDER/. $DIST_FOLDER/$SCRIPTS_FOLDER/$JS_LIBS_FOLDER/

# Copy images
cp -a $SRC_FOLDER/$IMAGES_FOLDER/. $DIST_FOLDER/$IMAGES_FOLDER/
rm $DIST_FOLDER/$IMAGES_FOLDER/*.svg

# Copy other files
cp $SRC_FOLDER/$MANIFEST $DIST_FOLDER/$MANIFEST
cp $SRC_FOLDER/$SERVICE_WORKER $DIST_FOLDER/$SERVICE_WORKER
cp $NOJEKYLL $DIST_FOLDER/$NOJEKYLL
cp $CNAME $DIST_FOLDER/$CNAME

# Bump service worker version
sed -i.bak "s/VERSION/$VERSION/g" $DIST_FOLDER/$SERVICE_WORKER && rm $DIST_FOLDER/$SERVICE_WORKER.bak

echo "Build complete!"
