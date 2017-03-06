# Fournisseurs de tuiles propriétaires

Dans les sections précédentes, nous avons affiché des couches conformes au standard  WMS (OGC Web Map Service) et à des caches personnalisés de tuiles. Les cartes en ligne (ou du moins les clients de tuiles de carte) ont été largement popularisés par la disponibilité de services de tuiles de carte propriétaires. OpenLayers fournit de des types de couche qui fonctionnent avec ces services propriétaires via leurs APIs.

Dans cette section, nous allons repartir  de l'exemple développé dans la [section précédente](cached.md) en ajoutant un couche utilisant des tuiles issues de Bing.

## Bing!

Ajoutons un couche Bing.

### Tâches

1. Dans votre fichier `map.html`, trouvez où la source OSM (OpenStreetMap) est configurée et changez-la en `ol.source.BingMaps`

  ```js
    source: new ol.source.BingMaps({
      imagerySet: 'Road',
      key: '<Your Bing Maps Key Here>'
    })
  ```
  *Note* - L'API de tuiles de Bing nécessite de que vous vous enregistriez pour avoir un clé d'API à utiliser pour votre application de cartographie en ligne.  L'exemple ici utilise une clé d'API que vous ne devriez pas utiliser en production.  pour utiliser la couche Bing en production, enregistrez-vous pour une clé d'API sur https://www.bingmapsportal.com.

2.  Sauvez vos changements et rechargez `map.html` dans votre navigateur: {{ book.workshopUrl }}/map.html

  ![Une carte avec des tuiles d'un source de Bing Maps](proprietary1.png)

## Exemple fonctionnel complet

Votre fichier révisé `map.html` devrait ressembler à ceci:

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
      .ol-attribution a {
        color: black;
      }
    </style>
    <script src="/loader.js" type="text/javascript"></script>
    <title>OpenLayers example</title>
  </head>
  <body>
    <h1>My Map</h1>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.BingMaps({
              imagerySet: 'Road',
              key: '<Your Bing Maps Key Here>'
            })
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([126.97, 37.56]),
          zoom: 9
        })
      });
    </script>
  </body>
</html>
```
