.. _config.map:

Creating a Map
==============

In OpenLayers, a map is a collection of layers and various interactions and controls for dealing with user interaction. A map is generated with three basic ingredients: :ref:`markup <config.dissect.markup>`, :ref:`style declarations <config.dissect.style>`, and :ref:`initialization code <config.dissect.code>`.

.. _config.map.example:

Working Example
---------------

Let's take a look at a fully working example of an OpenLayers 3 map.

.. code-block:: html

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
        <title>OpenLayers 3 example</title>
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
                title: "Global Imagery",
                source: new ol.source.TileWMS({
                  url: 'http://maps.opengeo.org/geowebcache/service/wms',
                  params: {LAYERS: 'bluemarble', VERSION: '1.1.1'}
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

.. rubric:: Tasks

#.  Make sure you've completed the :ref:`setup instructions <setup>` to install dependencies and get the debug server running.

#.  Copy the text above into a new file called :file:`map.html`, and save it in the workshop :file:`dist` directory.

#.  Open the working map in your web browser: :workshop_url:`map.html`

.. figure:: map1.png

    A working map displaying imagery of the world.

Having successfully created our first map, we'll continue by looking more closely at :ref:`the parts <config.dissect>`.
