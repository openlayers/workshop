## Sélectionner des objets géographiques

Comme nous l'avons vu dans le module sur les couches, nous pouvons récupérer des objets géographiques comme des vecteurs et les dessinez par dessus une carte en fond dite "base". Un des avantages de servir des données vecteur est que les utilisateurs peuvent interagir avec la donnée. Dans cet exemple, nous créons une couche vecteur où les utilisateurs peuvent sélectionner et voir les informations des objets géographiques.

L'exemple précédent faisait la démonstration de l'utilisation d'un `ol.control.Control` sur la carte.  Les `controls` ont une représentation visuelle sur la carte ou ajoutent des éléments DOM au document.  Une `ol.interaction.Interaction` est responsable de gérer les interactions utilisateurs, mais typiquement sans représentation visuelle.  Cet exemple montre l'utilisation d'une `ol.interaction.Select` pour interagir avec les objets géographiques de couches vecteur.

## Créer un couche vecteur et une interaction de type `Select`

### Tâches

1. Commençons avec l'exemple avec la couche vecteur de la [section précédente](../layers/vector.md).  Ouvrez `map.html` dans votre éditeur de texte et assurez-vous qu'il ressemble à quelque chose comme suivant:

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
        var map = new ol.Map({
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.Select({
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 5,
                  fill: new ol.style.Fill({
                    color: '#FF0000'
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#000000'
                  })
                })
              })
            })
          ]),
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
              source: new ol.source.Vector({
                url: '/data/layers/7day-M2.5.json',
                format: new ol.format.GeoJSON()
              }),
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

2.  Sauvez vos changements de `map.html` et ouvrez la page dans votre navigateur:  {{ book.workshopUrl }}/map.html. Pour voir la sélection d'objets géographiques en action, utilisez le clic souris pour sélectionner un tremblement de terre:

  ![Utilisation d'une interaction pour sélectionner les objets géographiques issus d'une couche vecteur](select1.png)
