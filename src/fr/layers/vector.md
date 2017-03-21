# Données vecteur

Les couches vecteur sont représentées par `ol.layer.Vector` et gère l'affichage côté client des données vecteur. Actuellement, OpenLayers supporte le rendu vecteur complet dans le moteur de rendu Canvas, mais seulement pour les points pour le moteur de rendu WebGL.

## Rendu des objets géographiques côté client

Revenons à l'exemple WMS pour avoir une carte du monde basique.  Nous allons ajouter quelques données géographiques au dessus, dans une couche vecteur.

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
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            title: 'Global Imagery',
            source: new ol.source.TileWMS({
              url: 'https://ahocevar.com/geoserver/wms',
              params: {LAYERS: 'nasa:bluemarble', TILED: true}
            })
          })
        ],
        view: new ol.View({
          projection: 'EPSG:4326',
          center: [0, 0],
          zoom: 0,
          maxResolution: 0.703125
        })
      });
    </script>
  </body>
</html>
```

### Tâches

1. Ouvrez `map.html` dans votre éditeur de texte et copiez dedans le contenu de votre exemple WMS initial. Sauvez vos changements et confirmez que les choses fonctionnent bien dans votre navigateur: {{ book.workshopUrl }}/map.html

2. Dans votre code d'initialisation de la carte, ajoutez une autre couche après la couche tuilée (collez ce qui suit). Cela ajoute une nouvelle couche vecteur à votre carte qui demande un jeu d'objets géographiques sous format GeoJSON:

  ```js
    new ol.layer.Vector({
      title: 'Earthquakes',
      source: new ol.source.Vector({
        url: '/data/layers/7day-M2.5.json',
        format: new ol.format.GeoJSON()
      }),
      style: new ol.style.Style({
        image: new ol.style.Circle({
          radius: 3,
          fill: new ol.style.Fill({color: 'white'})
        })
      })
    })
  ```

  ![Emplacements de tremblements de terre](vector1.png)

### Revue de détails

Examinons la création de cette couche vecteur pour se faire une idée de ce qu'il se passe.

```js
new ol.layer.Vector({
  title: 'Earthquakes',
  source: new ol.source.Vector({
    url: '/data/layers/7day-M2.5.json',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 3,
      fill: new ol.style.Fill({color: 'white'})
    })
  })
})
```

La couche se voit donner le titre (`title`) `'Earthquakes'` et quelques options personnalisées. Dans les options de l'objet, nous avons inclus une `source` de type `ol.source.Vector` qui pointe vers une URL. Nous avons donné à la `source` un `format` qui sera utilisé pour parser les données.

*Note* - Dans le cas où vous souhaiteriez styler les objets géographiques en utilisant un attribut, vous devrez utiliser une fonction style plutôt qu'un `ol.style.Style` dans les options de configuration du `style` de la couche `ol.layer.Vector`.

### Tâches bonus

1.  Les cercles blancs sur la carte représentent des objets `ol.Feature` sur votre couche `ol.layer.Vector`. Chacun de ces objets a des données d'attributs les propriétés `title` et `summary`. Assignez un événement de type `'singleclick'` sur votre carte qui appelle `forEachFeatureAtPixel` sur la carte et affiche les informations de tremblements de terre en dessous de la fenêtre d'affichage de carte.

2.  La donnée pour la couche vecteur vient du flux d'information sur les tremblements de terre publié par l'USGS (http://earthquake.usgs.gov/earthquakes/catalogs/).  Voyez si vous pouvez trouver des données additionnelles avec des informations spatiales dans un format supporté par OpenLayers.  Si vous sauvegardez un autre document représentant des données spatiales dans votre répertoire `data`, vous devriez être capable de le voir dans une couche vecteur sur votre carte.

### Solutions

Comme solution à la première tâche bonus, vous pouvez ajouter une div `info` en dessous de la carte:

```html
<div id="info"></div>
```

et ajouter le code JavaScript suivant pour afficher le titre de l'objet cliqué:

```js
map.on('singleclick', function(e) {
  var feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
    return feature;
  });
  var infoElement = document.getElementById('info');
  infoElement.innerHTML = feature ? feature.get('title') : '';
});
```
