# Criando `builds` personalizados

Nesta seção, criaremos um `build` personalizado para criação do mapa do [último capítulo](../vector/style.md).

1. Inicie com o arquivo `map.html` que você criou anteriormente:

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

2. Crie um arquivo de `build` chamado `ol-custom.json` para este mapa:   

```json
!INCLUDE "../../shared/vector-chapter-build-config.json"
```

3. Crie o `build` personalizado usando o script Node `build.js` do `OpenLayers`:

  ```shell
  $ node node_modules/openlayers/tasks/build.js ol-custom.json ol-custom.js
  ```

  Este comando vai gerar o arquivo `ol-custom.js` no diretório raiz do projeto.

4. Agora altere o arquivo `map.html` para usar o `build` personalizado (`ol-custom.js`) ao invés do carregador de desenvolvimento.

   Então altere:

   ```html
      <script src="/loader.js" type="text/javascript"></script>
   ```

   Para

   ```html
      <script src="/ol-custom.js" type="text/javascript"></script>
   ```
A página deve carregar muito mais rápido do que antes!
