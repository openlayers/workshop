# Understanding custom builds

OpenLayers is a big library providing a lot of functionality. So it is
unlikely that an application will need and use all the functionality OpenLayers
3 provides. Custom builds (a.k.a. application-specific builds) are OpenLayers
3 builds with just the functionality your application needs. Custom builds are
often much smaller that the full build, so creating custom builds is often
a very good idea.

## Requirements

OpenLayers builds are created by using the [Closure
Compiler](https://developers.google.com/closure/compiler/). The goal of the
Closure Compiler is to compile JavaScript to better JavaScript, that takes less
time to download and run faster.

The Closure Compiler is a Java program, so running the Compiler requires a Java
Virtual Machine. So before jumping to the next section, and creating a custom
build, make sure Java is installed on your machine.

You just need the Java Runtime Environment, which you can download from the
[Oracle Java
site](http://www.oracle.com/technetwork/java/javase/downloads/index.html). For
example, for Windows, you would download and install
`jre-8u60-windows-i586.exe`.

## Build configuration file

Creating a custom build requires writing a build configuration file. The format
of build configuration files is JSON. Here is a simple example of a build
configuration file:

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

The most relevant part of this configuration object is the `exports` array.
This array declares the functions/constructors you use in your JavaScript code.
For example, the above configuration file is what you'd use for the following
JavaScript code:

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
