.. _openlayers.layers.imagevector:

Image Vector
============
When data and styling are relatively stable, it might make sense to have OpenLayers generate an image from the vector data for performance reasons.

ol.source.ImageVector
---------------------

Let's go back to the vector layer example to get earthquake data on top of a world map.

.. code-block:: html

    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="ol3/ol.css" type="text/css">
        <style>
          #map {
            height: 256px;
            width: 512px;
          }
        </style>
        <title>OpenLayers 3 example</title>
        <script src="ol3/ol.js" type="text/javascript"></script>
      </head>
      <body>
        <h1>My Map</h1>
        <div id="map"></div>
        <script type="text/javascript">
          var map = new ol.Map({
            target: 'map',
            renderer: 'canvas',
            layers: [
              new ol.layer.Tile({
                title: "Global Imagery",
                source: new ol.source.TileWMS({
                  url: 'http://maps.opengeo.org/geowebcache/service/wms',
                  params: {LAYERS: 'bluemarble', VERSION: '1.1.1'}
                })
              }),
              new ol.layer.Vector({
                title: 'Earthquakes',
                  source: new ol.source.GeoJSON({
                  url: 'data/layers/7day-M2.5.json'
                }),
                style: new ol.style.Style({
                  image: new ol.style.Circle({
                  radius: 3,
                  fill: new ol.style.Fill({color: 'white'})
                })
              })
            })],
            view: new ol.View2D({
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

#.  Open ``map.html`` in your text editor and copy in the contents of the vector example from above. Save your changes and confirm that things look good in your browser: @workshop_url@/map.html


#.  Change the vector layer into:

    .. code-block:: javascript

        new ol.layer.Image({
          title: 'Earthquakes',
          source: new ol.source.ImageVector({
            source: new ol.source.GeoJSON({
              url: 'data/layers/7day-M2.5.json'
            }),
            style: new ol.style.Style({
              image: new ol.style.Circle({
              radius: 3,
                fill: new ol.style.Fill({color: 'white'})
              })
            })
          })
        })

#.    Reload @workshop_url@/map.html in the browser

.. note::

    You will see the same vector data but depicted as an image. This will still enable things like feature detection, but the vector data will be less sharp. So this is essentially a trade-off between performance and quality.
    
A Closer Look
`````````````

Let's examine the layer creation to get an idea of what is going on.

.. code-block:: javascript

    new ol.layer.Image({
      title: 'Earthquakes',
      source: new ol.source.ImageVector({
        source: new ol.source.GeoJSON({
          url: 'data/layers/7day-M2.5.json'
        }),
        style: new ol.style.Style({
          image: new ol.style.Circle({
          radius: 3,
            fill: new ol.style.Fill({color: 'white'})
          })
        })
      })
    })

We are using an ``ol.layer.Image`` instead of an ``ol.layer.Vector``. However, we can still use vector data here through ``ol.source.ImageVector`` that connects to our original ``ol.source.GeoJSON`` vector source. The style is provided as config of ``ol.source.ImageVector`` and not on the layer.

.. rubric:: Bonus Tasks

#.  Verify that feature detection still works by registering a singleclick listener on your map that calls ``forEachFeatureAtPixel`` on the map, and displays earthquake information below the map viewport.

.. only:: instructor

    .. code-block:: javascript

        map.on('singleclick', function(evt) {
          document.getElementById('info').innerHTML = '';
          var pixel = evt.pixel;
          var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            return feature;
          });
          if (feature) {
            document.getElementById('info').innerHTML += 'Title: ' + feature.get('title') + '<br/>';
          }
        });

