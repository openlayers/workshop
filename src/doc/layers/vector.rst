.. _openlayers.layers.vector:

Vector Layers
=============

Previous sections in this module have covered the basics of raster layers with ol3. This section deals with vector layers - where the data is rendered for viewing in your browser.

ol3 provides facilities to read existing vector data from the server and  determine how features should be styled in the map.

Though browsers are steadily improving in terms of JavaScript execution speed (which helps in parsing data), there are still serious rendering bottlenecks which limit the quantity of data you'll want to use in practice. The best advice is to try your application in all the browsers you plan to support, to limit the data rendered client side until performance is acceptable, and to consider strategies for effectively conveying information without swamping your browser with too many vector features (the technical vector rendering limits of your browser often match the very real limitations of your users to absorb information).

Rendering Features Client-Side
------------------------------

Let's go back to the :ref:`WMS example <openlayers.layers.wms.example>` to get a basic world map.  We'll add some feature data on top of this in a vector layer.

.. rubric:: Tasks

#.  Open ``map.html`` in your text editor and copy in the contents of the initial :ref:`WMS example <openlayers.layers.wms.example>`. Save your changes and confirm that things look good in your browser: @workshop_url@/map.html


#.  In your map initialization code add another layer (paste the following). This adds a new vector layer to your map that requests a set of features stored in GeoJSON:
    
    .. code-block:: javascript

        new ol.layer.Vector({
          title: 'Earthquakes',
          source: new ol.source.Vector({
            parser: new ol.parser.GeoJSON(),
            url: 'data/layers/7day-M2.5.json'
          })
        })
    
.. figure:: vector1.png
   
    World map with white circles representing earthquake locations.
    
A Closer Look
`````````````

Let's examine that vector layer creation to get an idea of what is going on.

.. code-block:: javascript

    new ol.layer.Vector({
       title: 'Earthquakes',
       source: new ol.source.Vector({
        parser: new ol.parser.GeoJSON(),
        url: 'data/layers/7day-M2.5.json'
      })
    })

The layer is given the title ``"Earthquakes"`` and some custom options. In the options object, we've included a ``source`` of type ``ol.source.Vector`` which points to a url and a parser to parse the returned document.

.. rubric:: Bonus Tasks

#.  The white circles on the map represent ``ol.Feature`` objects on your ``ol.layer.Vector`` layer. Each of these features has attribute data with ``title``, ``description``, and ``link`` properties. Register a singleclick listener on your map, that calls ``getFeatures`` on the map, and display earthquake information below the map viewport.

#.  The data for the vector layer comes from an earthquake feed published by the USGS (http://earthquake.usgs.gov/earthquakes/catalogs/).  See if you can find additional data with spatial information in a format supported by ol3.  If you save another document representing spatial data in your ``data`` directory, you should be able to view it in a vector layer on your map.
