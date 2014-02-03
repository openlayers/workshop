.. _openlayers.style:

Styling Vector Layers
=====================

#.  We'll start with a working example that displays building footprints in a vector layer.  Open your text editor and save the following as ``map.html`` in the root of your workshop directory:
    
    .. code-block:: html

        <!doctype html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="ol3/ol.css" type="text/css">
            <style>
              .map {
                height: 256px;
                width: 512px;
                background-color: gray;
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
                target: 'map',
                renderer: ol.RendererHint.CANVAS,
                layers: [
                  new ol.layer.Vector({
                    title: 'Buildings',
                    source: new ol.source.Vector({
                      parser: new ol.parser.ogc.GML_v3(),
                      url: 'data/layers/buildings.gml'
                    }),
                    style: new ol.style.Style({
                      symbolizers: [
                        new ol.style.Stroke({color: 'red', width: 2})
                      ]
                    })
                  })
                ],
                view: new ol.View2D({
                  projection: 'EPSG:4326',
                  center: [-122.791859392, 42.3099154789],
                  zoom: 16
                })
              });
            </script>
          </body>
        </html>
    
#.  Open this ``map.html`` file in your browser to see buildings with a red outline:  @workshop_url@/map.html

#.  With a basic understanding of :ref:`styling in OpenLayers <openlayers.vector.style-intro>`, we can create an ``ol.style.Style`` that displays buildings in different colors based on the size of their footprint. In your map initialization code, replace the constructor for the ``Buildings`` layer with the following:
    
    .. code-block:: javascript

            new ol.layer.Vector({
              title: 'Buildings',
              source: new ol.source.Vector({
                parser: new ol.parser.ogc.GML_v3(),
                url: 'data/layers/buildings.gml'
              }),
              style: new ol.style.Style({
                symbolizers: [
                  new ol.style.Stroke({color: 'black', width: 1}),
                  new ol.style.Fill({color: 'navy'})
                ],
                rules: [
                  new ol.style.Rule({
                    filter: ol.expr.parse('shape_area < 3000'),
                    symbolizers: [
                      new ol.style.Stroke({color: 'black', width: 1}),
                      new ol.style.Fill({color: 'olive'})
                    ]
                  })
                ]
              })
            })

#.  Save your changes and open ``map.html`` in your browser: @workshop_url@/map.html

    .. figure:: style1.png

       Buildings colored by footprint area.
