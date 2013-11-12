.. _openlayers.controls.select:

Selecting Features
==================

So far we have been using WMS to render raster images and overlay them in ol3. We can also pull features as vectors and draw them on top of a base map. One of the advantages of serving vector data is that users can interact with the data. In this example, we create a vector layer where users can select and view feature information.

Create a Vector Layer and a Select Interaction
``````````````````````````````````````````````

.. rubric:: Tasks

#.  Let's start with the working example from a :ref:`previous section <openlayers.layers.vector>`.  Open ``map.html`` in your text editor and make sure it looks something like the following:
    
    .. code-block:: html

        <!doctype html>
          <html lang="en">
            <head>
            <link rel="stylesheet" href="ol3/ol.css" type="text/css">
            <style>
              .map {
                height: 256px;
                width: 512px;
              }
            </style>
            <script src="ol3/ol.js" type="text/javascript"></script>
            <title>OpenLayers 3 example</title>
          </head>
          <body>
            <h1>My Map</h1>
            <div id="map" class="map"></div>
            <script type="text/javascript">
              var map = new ol.Map({
                interactions: ol.interaction.defaults().extend([
                  new ol.interaction.Select({
                    layerFilter: function(layer) {
                      return layer.get('id') == 'vector';
                    }
                  })
                ]),
                target: 'map',
                renderer: ol.RendererHint.CANVAS,
                layers: [
                  new ol.layer.Tile({
                    title: "Global Imagery",
                    source: new ol.source.TileWMS({
                      url: 'http://maps.opengeo.org/geowebcache/service/wms',
                      params: {'LAYERS': 'bluemarble', 'VERSION': '1.1.1'}
                    })
                  }),
                  new ol.layer.Vector({
                    id: 'vector',
                    title: 'Earthquakes',
                    source: new ol.source.Vector({
                      parser: new ol.parser.GeoJSON(),
                      url: 'data/layers/7day-M2.5.json'
                    }),
                    style: new ol.style.Style({
                      rules: [
                        new ol.style.Rule({
                          filter: 'renderIntent("selected")',
                          symbolizers: [
                            new ol.style.Shape({
                              fill: new ol.style.Fill({
                                color: '#FF0000'
                              }),
                              size: 10,
                              stroke: new ol.style.Stroke({
                                color: '#000000'
                              })
                            })
                          ]
                        })
                      ],
                      symbolizers: [
                        new ol.style.Shape({
                          fill: new ol.style.Fill({
                            color: '#0000FF'
                          }),
                          size: 10,
                          stroke: new ol.style.Stroke({
                            color: '#000000'
                          })
                        })
                      ]
                    })
                  })
                ],
                view: new ol.View2D({
                  projection: 'EPSG:4326',
                  center: [0, 0],
                  zoom: 1
                })
              });
            </script>
          </body>
        </html>
        
#.  Save your changes to ``map.html`` and open the page in your browser:  @workshop_url@/map.html. To see feature selection in action, use the mouse-click to select a building:
    
    .. figure:: select1.png
   
       Using an interaction to select features from a vector layer.
