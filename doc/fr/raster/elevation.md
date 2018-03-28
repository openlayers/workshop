# Faire le rendu des données élévation

Nous allons travailler avec des données d'élévation encodées dans les tuiles PNG (voir [le post de Mapbox](https://blog.mapbox.com/global-elevation-data-6689f1d0ba65) sur Terrain-RGB pour plus de détails). Pour cet exercice, vous devez souscrire à un compte Mapbox (https://www.mapbox.com/signup/) et utiliser votre token d'accès pour les tuiles.

Ajoutez votre token public par défaut à `main.js`:

```js
const key = '<your-default-public-token>';
```

Nous voulons manipuler les données d'élévation avant le rendu, mais nous allons d'abord ajouter les tuiles Terrain-RGB à la carte pour voir à quoi elles ressemblent. Pour ce faire, créez une source XYZ avec l'URL Terrain-RGB et votre token d'accès.

[import:'elevation'](../../../src/en/examples/raster/elevation.js)

Ensuite, créez une couche de tuilée qui utilise la source d'élévation. Ajoutez cette couche au tableau JavaScript `layers` de votre carte dans `main.js`:

[import:'layer'](../../../src/en/examples/raster/elevation.js)

Vous devriez [maintenant voir]({{book.workshopUrl}}/) des tuiles bizarrement colorées affichés par dessus votre couche de fond. Les données d'élévation dans les tuiles Terrain-RGB sont encodées dans les canaux rouge, vert et bleu. Donc, alors que ces données ne sont pas censées être rendues directement, il est intéressant de les examiner.

![Tuiles Terrain-RGB rendues au niveau de Boston](elevation.png)
