# Entendendo `builds` personalizados

O OpenLayers é uma extensa biblioteca que fornece muitas funcionalidades. Assim, é improvável que uma aplicação precise e faça uso de todas as funcionalidades que a biblioteca possui. `Builds` personalizados (chamados de `application-specific builds`) são `builds` que contém somente as funções do OpenLayers que sua aplicação utilizará. Eles são geralmente muito menores do que um `build` completo, portanto, criar `builds` personalizados é muitas vezes uma boa ideia.

## Requerimentos

Os `builds` do OpenLayers são criados a partir do [Compilador Closure](https://developers.google.com/closure/compiler/). O objetivo deste compilador é gerar um JavaScript menor e que rode mais rápido.

O Compilador Closure é um programa java, então para executá-lo precisamos da máquina virtual Java (JVM). Portanto, antes de passar para a próxima seção e criar um `build` personalizado, veja se o Java está instalado em sua máquina.

Você precisa somente do Java Runtime Environment, que você pode baixar no [site da Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Por exemplo, para Windows, você pode baixar e instalar o arquivo `jre-8u60-windows-i586.exe`.

## Arquivo de configuração do `Build`

Criar um `build` personalizado requer um arquivo de configuração. O formato do arquivo é JSON. Segue um exemplo de arquivo de configuração:

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

A parte mais relevante da configuração é o array `exports`. Nele estão declaradas as funções/construtores que você usou em seu código JavaScript. Por exemplo, a configuração acima é o que você precisará para executar o código abaixo:

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
