.. _openlayers.vector.basics:

Working with Vector Layers
==========================

The base ``ol.layer.Vector`` constructor provides a fairly flexible layer type. By default, when you create a new vector layer, no assumptions are made about where the features for the layer will come from, since this is the domain of ``ol.source.Vector``. In addition, a very basic style is applied when rendering those features. Customizing the rendering style is addressed in an :ref:`upcoming section <openlayers.vector.style-intro>`. This section introduces the basics of vector data :ref:`formats <openlayers.vector.basics.format>`.

.. _openlayers.vector.basics.format:

ol.format
---------

The ``ol.format`` classes in ol3 are responsible for parsing data from the server representing vector features. Most of the times you won't be using them directly, but you'll be using their corresponding source (e.g. ``ol.source.KML``). The format turns raw feature data into ``ol.Feature`` objects.  Typically, the format is also responsible for reversing this operation.

Consider the two blocks of data below. Both represent the same ``ol.Feature`` object (a point in Barcelona, Spain). The first is serialized as `GeoJSON <http://geojson.org>`_ (using the ``ol.format.GeoJSON`` parser). The second is serialized as :abbr:`KML (OGC Keyhole Markup Language)` (using the ``ol.format.KML`` parser).

GeoJSON Example
```````````````

.. code-block:: javascript

    {
        "type": "Feature",
        "id": "OpenLayers.Feature.Vector_107",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [-104.98, 39.76] 
        }
    }

KML Example
```````````

.. code-block:: xml

    <?xml version="1.0" encoding="utf-8"?>
    <kml xmlns="http://earth.google.com/kml/2.2">
      <Placemark>
        <Point>
          <coordinates>-104.98,39.76</coordinates>
        </Point>
      </Placemark>
    </kml>
