# Source image vecteur

Dans l'exemple précédent utilisant une couche `ol.layer.Vector`, vous pouvez voir que les objets géographiques ont été recalculés en permanence pendant le zoom animé (la taille des symboles de points reste fixe).  Avec une couche vecteur, OpenLayers refera le rendu de la source avec chaque frame de l'animation.  Cela fournit un rendu consistant des traits de ligne, des symboles de points  et des étiquettes avec les changements de résolution de la vue.

Une stratégie alternative de rendu est d'éviter de refaire le rendu pendant les transitions de la vue et à la place de repositionner et mettre à l'échelle la sortie depuis l'état de la vue précédente.  Cela peut être accompli en utilisant une `ol.layer.Image` avec une `ol.source.ImageVector`.  Avec cette combinaison, des "snapshots" de votre donnée sont rendus quand la vue n'est pas animée, et ces snapshots sont réutilisés pendant les transitions de vue.

L'exemple ci-dessous utilise une `ol.layer.Image` avec une `ol.source.ImageVector`.  Bien que cet exemple fasse seulement un rendu d'une petite quantité de données, cette combinaison serait plus appropriée pour les applications qui font une rendu de grandes quantités de données relativement statiques.

## `ol.source.ImageVector`

Revenons à l'exemple de couche vecteur pour avoir les données des tremblements de terre au dessus d'une carte du monde.

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
          }),
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

1. Ouvrez `map.html` dans votre éditeur de texte et copiez dedans le contenu de l'exemple vecteur ci-dessus. Sauvez vos changements et confirmez que les choses fonctionnent bien dans votre navigateur: {{ book.workshopUrl }}/map.html

1. Changez la couche vecteur en:

  ```js
    new ol.layer.Image({
      title: 'Earthquakes',
      source: new ol.source.ImageVector({
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
    })
  ```

1. Rechargez {{ book.workshopUrl }}/map.html dans votre navigateur

  *Note* - Vous verrez la même donnée vecteur mais représentée comme une image. Cela rendra toujours possible des choses comme la détection des objets géographiques, mais la donnée vecteur sera moins tranchée. En fait, il s'agit d'un compromis entre performance et qualité.

### Examen de détails

Let's examine the layer creation to get an idea of what is going on.

```js
  new ol.layer.Image({
    title: 'Earthquakes',
    source: new ol.source.ImageVector({
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
  })
```

Nous utilisons une `ol.layer.Image` au lieu d'une `ol.layer.Vector`. Cependant, nous pouvons toujours utiliser les données vecteur ici via `ol.source.ImageVector` qui est connectée à notre source originale vecteur `ol.source.Vector`. Le style est fourni comme une configuration de `ol.source.ImageVector` et pas sur la couche.

### Tâches bonus

1. Vérifiez que la détection d'objets géographiques fonctionne toujours en assignant un événement de type `'singleclick'` sur votre carte qui appelle `forEachFeatureAtPixel` sur la carte et affichez les informations de tremblements de terre en dessous de la fenêtre d'affichage de carte.
