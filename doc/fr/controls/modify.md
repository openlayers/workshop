# Modifier des objets géographiques

La modification des objets géographiques fonctionne en utilisant une `ol.interaction.Select` combinée avec une `ol.interaction.Modify`. Elles partagent une collection (`ol.Collection`) en commun d'objets géographiques. Les objets géographiques sélectionnés avec `ol.interaction.Select` deviennent des candidats aux modifications avec `ol.interaction.Modify`.

## Créer une couche vecteur et une interaction de type `Modify`

### Tâches

1. Commencez avec un exemple qui fonctionne.  Ouvrez `map.html` dans votre éditeur de texte et assurez vous qu'il ressemble à ce qui suit:

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
      <script src="/loader.js" type="text/javascript"></script>
      <title>OpenLayers example</title>
    </head>
    <body>
      <h1>My Map</h1>
      <div id="map"></div>
      <script type="text/javascript">
        var source = new ol.source.Vector({
          url: '/data/layers/7day-M2.5.json',
          format: new ol.format.GeoJSON()
        });
        var style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 7,
              fill: new ol.style.Fill({
              color: [0, 153, 255, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 255, 255, 0.75],
              width: 1.5
            })
          }),
          zIndex: 100000
        });
        var select = new ol.interaction.Select({style: style});
        var modify = new ol.interaction.Modify({
          features: select.getFeatures()
        });
        var map = new ol.Map({
          interactions: ol.interaction.defaults().extend([select, modify]),
          target: 'map',
          layers: [
            new ol.layer.Tile({
              title: 'Global Imagery',
              source: new ol.source.TileWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {LAYERS: 'nasa:bluemarble', TILED: true}
              })
            }),
            new ol.layer.Vector({
              title: 'Earthquakes',
              source: source,
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 5,
                  fill: new ol.style.Fill({
                    color: '#0000FF'
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#000000'
                  })
                })
              })
            })
          ],
          view: new ol.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 1
          })
        });
      </script>
    </body>
  </html>
  ```

2.  Sauvez vos changements de `map.html` et ouvrez la page dans votre navigateur:  {{ book.workshopUrl }}/map.html. Pour voir la modification des objets géographiques en action, utilisez le clic souris pour sélectionner un tremblement de terre et ensuite bougez pour déplacer le point.

## Examen de détails

Examinons comment la modification des objets géographiques fonctionne.

```js
  var style = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
        fill: new ol.style.Fill({
        color: [0, 153, 255, 1]
      }),
      stroke: new ol.style.Stroke({
        color: [255, 255, 255, 0.75],
        width: 1.5
      })
    }),
    zIndex: 100000
  });
  var select = new ol.interaction.Select({style: style});
  var modify = new ol.interaction.Modify({
    features: select.getFeatures()
  });
```

Nous créons 2 interactions, une `ol.interaction.Select` pour sélectionner les objets géographiques avant de les modifier, et une `ol.interaction.Modify` pour modifier réellement les géométries. Elles partagent la même `ol.Collection` d'objets géographiques. Les objets géographiques sélectionnés en utilisant `ol.interaction.Modify` deviennent candidats à la modification avec `ol.interaction.Modify`. Comme précédemment, `ol.interaction.Select` est configurée avec une objet `style`, qui définit effectivement le style utilisé pour dessiner les objets géographiques sélectionnés. Quand un utilisateur clique sur la carte à nouveau, l'objet géographique est dessiné en utilisant le style de la couche.
