# Cloud-Optimized GeoTIFF Viewer

In this module, we'll demonstrate how to render a map visualizing data from Cloud-Optimized GeoTIFF ([COG](https://www.cogeo.org/)) sources.  GeoTIFF (or any TIFF) images are allowed to have additional "overview" images in addition to the primary full-resolution image.  In addition, the internal pixel layout of the images may be "tiled" instead of organized in strips.  The Cloud-Optimized GeoTIFF format encourages people to host data with a regular tiled layout and with overviews built in, making it more efficient for clients to render a small portion of an image (reading only the required tiles instead of the whole thing) or a lower resolution overview.

OpenLayers has a `ol/source/GeoTIFF` source that can read multi-band data from one or more remotely hosted GeoTIFF sources.  The exercises in this module walk through rendering of a single multi-band image, rendering multiple single-band images, and performing simple band math on the input data.

* [True color GeoTIFF](true-color.md)
* [Simplified view](simplified-view.md)
* [False color composite](false-color.md)
* [Band math](ndvi.md)
* [Color maps](colormap.md)
* [Visualization chooser](visualizations.md)
