.. _openlayers.vector.basics:

Working with Vector Layers
==========================

The base ``ol.layer.Vector`` constructor provides a fairly flexible layer type. By default, when you create a new vector layer, no assumptions are made about where the features for the layer will come from, since this is the domain of ``ol.source.Vector``. In addition, a very basic style is applied when rendering those features. Customizing the rendering style is addressed in an :ref:`upcoming section <openlayers.vector.style-intro>`. This section introduces the basics of vector data :ref:`formats <openlayers.vector.basics.format>`.

.. _openlayers.vector.basics.format:

ol.parser
---------

The ``ol.parser`` classes in ol3 are responsible for parsing data from the server representing vector features. The parser turns raw feature data into ``ol.Feature`` objects.  Typically, the parser is also responsible for reversing this operation.

Consider the two blocks of data below. Both represent the same ``ol.Feature`` object (a point in Barcelona, Spain). The first is serialized as `GeoJSON <http://geojson.org>`_ (using the ``ol.parser.GeoJSON`` parser). The second is serialized as :abbr:`GML (OGC Geography Markup Language)` (using the ``ol.parser.ogc.GML_v3`` parser).

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

GML Example
```````````

.. code-block:: xml

    <?xml version="1.0" encoding="utf-16"?>
    <gml:featureMember 
        xsi:schemaLocation="http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd" 
        xmlns:gml="http://www.opengis.net/gml" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <feature:feature fid="OpenLayers.Feature.Vector_107" xmlns:feature="http://example.com/feature">
            <feature:geometry>
                <gml:Point>
                    <gml:pos>-104.98, 39.76</gml:pos>
                </gml:Point>
            </feature:geometry>
        </feature:feature>
    </gml:featureMember>

