# Créer des `build` personnalisés

Dans cette section, nous allons créer un `build` personnalisé pour la carte que nous avons créée dans le [dernier chapitre](../vector/style.md).

1. Commençons avec le fichier `map.html` que vous avez créé précédemment:

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

2. Créez un fichier de configuration de 'build' `ol-custom.json` pour cette carte:

```json
!INCLUDE "../../shared/vector-chapter-build-config.json"
```

3. Créez le `build` personnalisé en utilisant le script Node `build.js` d'OpenLayers:

  ```shell
  $ node node_modules/openlayers/tasks/build.js ol-custom.json ol-custom.js
  ```

  Cela va générer le `build` personnalisé `ol-custom.js` à la racine du projet.

4. Maintenant, changez `map.html` pour utiliser le `build` personnalisé (`ol-custom.js`) plutôt que le chargeur de développement.

   Ainsi, changez

   ```html
      <script src="/loader.js" type="text/javascript"></script>
   ```

   par

   ```html
      <script src="/ol-custom.js" type="text/javascript"></script>
   ```

La page devrait maintenant se charger plus rapidement!
