# Disséquez votre carte

Comme démontré dans la [section précédente](./map.md), une carte est générée en combinant balises, déclarations de style et code d'initialisation. Nous allons voir chacune de ces parties plus en détail.

## Balise HTML pour la carte

La balise pour la carte dans [l'exemple précédent](./map.md) génère un élément du DOM unique:

```html
  <div id="map"></div>
```

Cet élément `<div>` servira comme container de votre fenêtre d'affichage de carte. Ici, nous utilisons un élément `<div>`, mais le container pour la fenêtre d'affichage de carte peut être n'importe quel élement de type "block".

Dans ce cas, nous donnons au container un attribut `id` afin que nous puissions le référencer comme cible `target` de notre carte.

## Styles de carte

OpenLayers fournit une feuille de styles par défaut qui spécifie comment les principaux éléments liés à la carte devraient être stylés. Nous incluons explicitement cette feuille de style dans la page `map.html` (`<link rel="stylesheet" href="/ol.css" type="text/css">`).

OpenLayers ne fait aucune supposition concernant la taille de la carte. Pour cette raison, en suivant la feuille de style par défaut, nous avons besoin d'inclure au moins une déclaration de style personnalisée pour donner de la place à la carte sur la page.

```html
  <link rel="stylesheet" href="/ol.css" type="text/css">
  <style>
    #map {
      height: 256px;
      width: 512px;
    }
  </style>
```

Dans ce cas, nous utilisons la valeur de l'`id` du container de la carte comme sélecteur et nous spécifions la largeur (`512px`) et la hauteur (`256px`) pour le container de la carte.

Les déclarations de style sont directement incluses dans le bloc `<head>` de notre document. Dans la plupart des cas, vos déclarations de style liées à la carte seront incluses dans un thème de site web plus important, référencé dans des feuilles de style externes.

## Initialisation de la carte

La prochaine étape dans la génération de votre carte est d'inclure un peu de code pour l'initialisation. Dans notre cas, nous avons inclus un élément `<script>` en bas du corps de notre `<body>` pour faire le travail:

```html
  <script>
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
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
```

L'ordre de ces étapes est important. Avant que notre script personnalisé puisse être exécuté, la bibliothèque OpenLayers doit impérativement être chargée. Dans notre exemple, la bibliothèque OpenLayers est chargée dans le bloc `<head>` de notre document avec `<script src="/loader.js"></script>`.

De manière similaire, notre code d'initialisation de la carte (ci-dessus) ne peut être exécuté avant que l'élément du document qui sert de fenêtre d'affichage de carte, dans ce cas `<div id="map"></div>`, ne soit chargé. En incluant, le code d'initialisation à la fin du corps de `<body>`, nous nous assurons que la bibliothèque est chargée et que le container de la fenêtre d'affichage de carte est prêt avant de générer notre carte.

Regardons plus en détails ce que le script d'initialisation de la carte fait. Notre script créé un nouvel objet `ol.Map` avec quelques options de configuration:

```js
  target: 'map'
```

Nous utilisons la valeur de l'attribut `id` du container de la fenêtre d'affichage de carte pour indiquer au constructeur de la carte où faire le rendu de la carte. Dans ce cas, nous passons `"map"` comme valeur de chaîne de caractères pour le paramètre `target` (cible) du constructeur de la carte. Cette syntaxe est un raccourci par commodité. Nous pourrions être plus explicite et fournir une référence directe à l'élément (c'est à dire `document.getElementById("map")`).


La configuration de couches créé une couche qui doit être affichée dans notre carte:

```js
  layers: [
    new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {LAYERS: 'nasa:bluemarble', TILED: true}
      })
    })
  ],
```

Ne vous inquiétez pas de la syntaxe ici si cette partie est nouvelle pour vous. La création de couches sera couverte dans un autre module. La partie importante à comprendre est que la vue de notre carte est une collection de couches. Pour pouvoir voir une carte, nous avons besoin au minimum d'une couche.

L'étape finale est de définir la vue. Nous spécifions une projection, un centre et un niveau de zoom. Nous spécifions aussi une `maxResolution` pour nous assurer que nous ne demandons pas des `bounding boxes` que GeoWebCache ne peut pas gérer.

```js
  view: new ol.View({
     projection: 'EPSG:4326',
     center: [0, 0],
     zoom: 0,
     maxResolution: 0.703125
  })
```

Vous avez disséqué avec succès votre première carte! Maintenant, [apprenons en plus](./resources.md) sur le développement avec OpenLayers.
