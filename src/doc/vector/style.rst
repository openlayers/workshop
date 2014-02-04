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
              background-color: gray;
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
              var style = [new ol.style.Style({
                stroke: new ol.style.Stroke({color: 'red', width: 2})
              })];
              var map = new ol.Map({
                target: 'map',
                renderer: ol.RendererHint.CANVAS,
                layers: [
                  new ol.layer.Vector({
                    title: 'Buildings',
                    source: new ol.source.KML({
                    reprojectTo: 'EPSG:4326',
                      url: 'data/layers/buildings.kml'
                    }),
                    styleFunction: function(feature, resolution) {
                      return style;
                    }
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

#.  With a basic understanding of :ref:`styling in OpenLayers <openlayers.vector.style-intro>`, we can create a ``styleFunction`` that displays buildings in different colors based on the size of their footprint. In your map initialization code, replace the styleFunction for the ``Buildings`` layer with the following:
    
    .. code-block:: javascript

            // define this before the ol.Map is constructed
            var defaultStyle = [new ol.style.Style({
              fill: new ol.style.Fill({color: 'navy'}),
              stroke: ol.style.Stroke({color: 'black', width: 1})
            })];
            var ruleStyle = [new ol.style.Style({
              fill: new ol.style.Fill({color: 'olive'}),
              stroke: new ol.style.Stroke({color: 'black', width: 1})
            })];

            // new styleFunction
            styleFunction: function(feature, resolution) {
              if (feature.get('shape_area') < 3000) {
                return ruleStyle;
              } else {
                return defaultStyle;
              }
            }

#.  Save your changes and open ``map.html`` in your browser: @workshop_url@/map.html

    .. figure:: style1.png

       Buildings colored by footprint area.
