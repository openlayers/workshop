# Comprendre les `build` personnalisés

OpenLayers est une grosse bibliothèque qui fournit de nombreuses fonctionnalités.
Ainsi, il est peu probable qu'une application nécessite et utilise toutes les fonctionnalités qu'OpenLayers fournit. Les `build` personnalisés (c'est à dire `build` spécifiques à une application) sont des versions de la bibliothèque OpenLayers qui embarquent juste les fonctionnalités que votre application a besoin.
 Les `build` personnalisés sont souvent plus petits que les `build` complets. Ainsi, créer des `build` personnalisés est souvent une très bonne idée.

## Pré-requis

Les `build` OpenLayers sont créés en utilisant [Closure
Compiler](https://developers.google.com/closure/compiler/). Le but de Closure Compiler est de compiler le JavaScript en un JavaScript "meilleur", qui prend moins de temps à télécharger et fonctionne plus vite.

Closure Compiler est un programme en Java. Ainsi pour qu'il fonctionne, Closure Compiler nécessite une machine virtuelle Java. De ce fait, avant de passer à la section suivante et de créer un `build` personnalisé, assurez-vous que Java est installé sur votre machine.

Vous avez juste besoin du Java Runtime Environment (JRE), que vous pouvez télécharger depuis [le site Java de Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Par exemple, pour Windows, vous téléchargerez et installerez probablement `jre-8u92-windows-x64.exe`.

## Fichier de configuration du `build`

Créez un `build` personnalisé nécessite d'écrire un fichier de configuration pour le `build`. Le format de ce fichier de configuration de `build` est le JSON. Voici un exemple simple de fichier de configuration de `build`:

```js
{
  "exports": [
    "ol.Map",
    "ol.View",
    "ol.layer.Tile",
    "ol.source.OSM"
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

La partie la plus importante de cet objet de configuration est le tableau `exports`.
Ce tableau déclare les fonctions/constructeurs que vous utilisez dans votre code JavaScript.
Par exemple, le fichier de configuration au dessus est ce que vous utiliseriez pour le code JavaScript suivant:

```js
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: [0, 0],
    zoom: 4
  })
});
```
