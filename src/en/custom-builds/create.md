# Creating custom builds

In this section we're going to create a custom build for the map you created at
the [last chapter](../vector/style.md).

1. Start with the `map.html` file you created previously:

  ```html
    <!doctype html>
    <html lang="en">
    <head>
      <link rel="stylesheet" href="/ol.css" type="text/css">
      <style>
      #map {
        height: 256px;
        width: 512px;
      }
      </style>
      <title>OpenLayers example</title>
      <script src="/loader.js" type="text/javascript"></script>
    </head>
    <body>
      <h1>My Map</h1>
      <div id="map"></div>
      <script type="text/javascript">
        var style = (function() {
          var stroke = new ol.style.Stroke({
            color: 'black'
          });
          var textStroke = new ol.style.Stroke({
            color: '#fff',
            width: 3
          });
          var textFill = new ol.style.Fill({
            color: '#000'
          });
          return function(feature, resolution) {
            return [new ol.style.Style({
              stroke: stroke,
              text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                text: feature.get('key'),
                fill: textFill,
                stroke: textStroke
              })
            })];
          };
        })();
        var map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
              title: 'Buildings',
              source: new ol.source.Vector({
                url: '/data/layers/buildings.kml',
                format: new ol.format.KML({
                  extractStyles: false
                })
              }),
              style: style
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([-122.79264450073244, 42.30975194250527]),
            zoom: 16
          })
        });
      </script>
    </body>
    </html>
  ```

2. Create a build configuration file `ol-custom.json` for that map:

  ```json
  {
    "exports": [
      "ol.Map",
      "ol.View",
      "ol.format.KML",
      "ol.layer.Tile",
      "ol.layer.Vector",
      "ol.proj.fromLonLat",
      "ol.source.OSM",
      "ol.source.Vector",
      "ol.style.Fill",
      "ol.style.Stroke",
      "ol.style.Style",
      "ol.style.Text"
    ],
    "jvm": [],
    "umd": true,
    "compile": {
      "externs": [
        "externs/bingmaps.js",
        "externs/closure-compiler.js",
        "externs/esrijson.js",
        "externs/geojson.js",
        "externs/oli.js",
        "externs/olx.js",
        "externs/proj4js.js",
        "externs/tilejson.js",
        "externs/topojson.js"
      ],
      "define": [
        "goog.dom.ASSUME_STANDARDS_MODE=true",
        "goog.DEBUG=false",
        "ol.ENABLE_DOM=false",
        "ol.ENABLE_WEBGL=false",
        "ol.ENABLE_PROJ4JS=false",
        "ol.ENABLE_IMAGE=false"
      ],
      "jscomp_error": [
        "*"
      ],
      "jscomp_off": [
        "analyzerChecks",
        "lintChecks",
        "unnecessaryCasts",
        "useOfGoogBase"
      ],
      "extra_annotation_name": [
        "api", "observable"
      ],
      "compilation_level": "ADVANCED",
      "warning_level": "VERBOSE",
      "use_types_for_optimization": true,
      "manage_closure_dependencies": true
    }
  }
  ```

3. Create the custom build using `OpenLayers`'s `build.js` Node script:

  ```shell
  $ node node_modules/openlayers/tasks/build.js ol-custom.json ol-custom.js
  ```

  This will generate the `ol-custom.js` custom build at the root of the
  the project.

4. Now change `map.html` to use the custom build (`ol-custom.js`) rather
   than the development loader.

   So change

   ```html
      <script src="/loader.js" type="text/javascript"></script>
   ```

   to

   ```html
      <script src="/ol-custom.js" type="text/javascript"></script>
   ```

The page should now load much faster than before!
