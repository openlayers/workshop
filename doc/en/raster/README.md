# Raster Operations

Up to this point, when we have used raster data (with an XYZ tile source for example), we have used it for presentation purposes only — rendering the data directly to the map.  It is also possible to work with the pixel values in the data we fetch, run operations on these values, and manipulate things before rendering.  The `Raster` source provides a way to run pixel-wise operations on data from any number of input sources.  When the source is used in an `Image` layer, the result of the raster operation can be rendered on the map.

In these exercises, we'll work with elevation data served as XYZ tiles.  Instead of rendering the encoded elevation data directly, we'll run a pixel-wise operation on the data before rendering.

* [Map setup](map.md)
* [Render elevation data](elevation.md)
* [Render sea level](raster.md)
