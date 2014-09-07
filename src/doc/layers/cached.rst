.. _openlayers.layers.cached:

Cached Tiles
============

By default, the Tile layer makes requests for 256 x 256 (pixel) images to fill your map viewport and beyond. As you pan and zoom around your map, more requests for images go out to fill the areas you haven't yet visited. While your browser will cache some requested images, a lot of processing work is typically required for the server to dynamically render images.

Since tiled layers make requests for images on a regular grid, it is possible for the server to cache these image requests and return the cached result next time you (or someone else) visits the same area - resulting in better performance all around.


.. _openlayers.layers.cached.xyz:

ol.source.XYZ
--------------------

The Web Map Service specification allows a lot of flexibility in terms of what a client can request. Without constraints, this makes caching difficult or impossible in practice.

At the opposite extreme, a service might offer tiles only at a fixed set of zoom levels and only for a regular grid. These can be generalized as tiled layers with an XYZ source - you can consider X and Y to indicate the column and row of the grid and Z to represent the zoom level.


.. _openlayers.layers.cached.osm:

ol.source.OSM
--------------------

The `OpenStreetMap (OSM) <http://www.openstreetmap.org/>`_ project is an effort to collect and make freely available map data for the world. OSM provides a few different renderings of their data as cached tile sets. These renderings conform to the basic :ref:`XYZ grid <openlayers.layers.cached.xyz>` arrangement and can be used in an OpenLayers map. The ``ol.source.OSM`` layer source accesses OpenStreetMap tiles.

.. _openlayers.layers.cached.example:

.. rubric:: Tasks

#.  Open the ``map.html`` file from the :ref:`previous section <openlayers.layers.wms>` in a text editor and change the map initialization code to look like the following:
    
    .. code-block:: html

        <script>
          var map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.transform([-93.27, 44.98], 'EPSG:4326', 'EPSG:3857'),
              zoom: 9
            }),
            controls: ol.control.defaults({
              attributionOptions: {
                collapsible: false
              }
            })
          });
        </script>

#.  In the ``<head>`` of the same document, add a few style declarations for the layer attribution.
    
    .. code-block:: html
    
        <style>
            #map {
                width: 512px;
                height: 256px;
            }
            .ol-attribution a {
                color: black;
            }
        </style>

#.  Save your changes, and refresh the page in your browser: @workshop_url@/map.html

.. figure:: cached1.png
   
    A map with a tiled layer with an OpenStreetMap source.


A Closer Look
~~~~~~~~~~~~~

Projections
```````````
Review the view definition of the map:

.. code-block:: javascript

    view: new ol.View({
      center: ol.proj.transform([-93.27, 44.98], 'EPSG:4326', 'EPSG:3857'),
      zoom: 9
    })

Geospatial data can come in any number of coordinate reference systems. One data set might use geographic coordinates (longitude and latitude) in degrees, and another might have coordinates in a local projection with units in meters. A full discussion of coordinate reference systems is beyond the scope of this module, but it is important to understand the basic concept.

OpenLayers 3 needs to know the coordinate system for your data. Internally, this
is represented with an ``ol.proj.Projection`` object. The ``transform`` function in the ``ol.proj`` namespace also takes strings that represent the coordinate reference system (``"EPSG:4326"`` and ``"EPSG:3857"`` above).

The OpenStreetMap tiles that we will be using are in a Mercator projection. Because of this, we need to set the initial center using Mercator coordinates. Since it is relatively easy to find out the coordinates for a place of interest in geographic coordinates, we use the ``ol.proj.transform`` method to turn geographic coordinates (``"EPSG:4326"``) into Mercator coordinates (``"EPSG:3857"``).

Alternative Projections
#######################

OpenLayers 3 includes transforms between Geographic (``"EPSG:4326"``) and Web Mercator (``"EPSG:3857"``) coordinate reference systems.  Because of this, we can use the ``ol.proj.transform`` function above without any extra work.  If you want to work with data in a different projection, you need to include some additional information before using the ``ol.proj.transform`` function.

For example, if you wanted to work with data in the ``"EPSG:21781"`` coordinate reference system, you would include the following two script tags in your page:

.. code-block:: html

    <script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.2.1/proj4.js" type="text/javascript"></script>
    <script src="http://epsg.io/21781-1753.js" type="text/javascript"></script>

Then in your application code, you could register this projection and set its validity extent as follows:

.. code-block:: javascript

    // This creates a projection object for the EPSG:21781 projection
    // and sets a "validity extent" in that projection object.
    var projection = ol.proj.get('EPSG:21781');
    projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

The extent information can be looked up at http://epsg.io/, using the EPSG code.

Layer Creation
``````````````

.. code-block:: javascript

    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],

As before, we create a layer and add it to the layers array of our map config object. This time, we accept all the default options for the source.

Style
`````

.. code-block:: css

    .ol-attribution a {
      color: black;
    }

A treatment of map controls is also outside of the scope of this module, but these style declarations give you a sneak preview. By default, an ``ol.control.Attribution`` control is added to all maps. This lets layer sources display attribution information in the map viewport. The declarations above alter the style of this attribution for our map (notice the Copyright line at the bottom right of the map).

Having mastered layers with publicly available cached tile sets, let's move on to working with :ref:`proprietary raster layers <openlayers.layers.proprietary>`.

Attribution Control Configuration
`````````````````````````````````

By default the ``ol.control.Attribution`` adds an ``i`` (information) button that can be pressed to actually displays the attribution information. To comply to `OpenStreetMap's Terms Of Use <http://wiki.openstreetmap.org/wiki/Legal_FAQ>`_, and always display the OpenStreetMap attribution information, the following is used in the options object passed to the ``ol.Map`` constructor:

.. code-block:: javascript

    controls: ol.control.defaults({
      attributionOptions: {
        collapsible: false
      }
    })

This removes the ``i`` button, and makes the attribution information always visible.
