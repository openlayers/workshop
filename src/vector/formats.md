# Working with Vector Formats

The base `ol.layer.Vector` constructor provides a fairly flexible layer type. By default, when you create a new vector layer, no assumptions are made about where the features for the layer will come from, since this is the domain of `ol.source.Vector`.  Before getting into styling vector features, this section introduces the basics of vector formats.

## `ol.format`

The `ol.format` classes in OpenLayers 3 are responsible for parsing data from the server representing vector features. The format turns raw feature data into `ol.Feature` objects.

Consider the two blocks of data below. Both represent the same `ol.Feature` object (a point in Barcelona, Spain). The first is serialized as [GeoJSON](http://geojson.org>) (using the `ol.format.GeoJSON` parser). The second is serialized as KML (OGC Keyhole Markup Language) (using the `ol.format.KML` parser).

### GeoJSON Example

```json
{
  "type": "Feature",
  "id": "OpenLayers.Feature.Vector_107",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [-104.98, 39.76]
  }
}
```

### KML Example

```xml
<?xml version="1.0" encoding="utf-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Placemark>
    <Point>
      <coordinates>-104.98,39.76</coordinates>
    </Point>
  </Placemark>
</kml>
```
