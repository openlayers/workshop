# Simplifying the map's view configuration

In the previous example, we had to configure the map's view with information about the spatial reference system and coordinate location of the image.

The first thing we need to know was an identifier for the spatial reference system.  This is used to create an OpenLayers `Projection` (which also needs to know the units):

[import:'projection'](../../../src/en/examples/cog/true-color-parts.js)

The second thing we needed to know about the imagery was its coordinate location.  This is used to create a bounding box or extent array:

[import:'extent'](../../../src/en/examples/cog/true-color-parts.js)

With this information, we are finally able to configure the view for the map:

[import:'map'](../../../src/en/examples/cog/true-color-parts.js)

GeoTIFF imagery extends regular TIFF imagery with special "geo" tags that provide information about things like the spatial reference system and coordinate location of the imagery.  The GeoTIFF source in OpenLayers parses this information and can be used to configure a map's view.

The `source.getView()` method of the GeoTIFF source returns a promise for view properties (like `projection`, `center`, `zoom`, and `extent`).  The map constructor now accepts a `view` option that can be a promise for these same properties.

Update your `main.js` so that the map constructor uses this new method for getting view properties from the source:

[import:'map'](../../../src/en/examples/cog/simplified-view.js)

Now you can remove the `projection`, `extent`, and related imports (`Projection` and `getCenter`) from your `main.js` file.