# True color GeoTIFF

The [Sentinel-2](https://sentinel.esa.int/web/sentinel/missions/sentinel-2) satellite mission has resulted in the collection and dissemination of imagery covering the earth's land surface with a revisit rate of 2 to 5 days.  The sensors collect "multi-band" imagery, where each band is a portion of the electromagnetic spectrum.  The Level 2A ([L2A](https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-2-msi/product-types/level-2a)) product provides surface reflectance measures in the following bands:

| Band | Description                    | Central Wavelength (μm) | Resolution (m) |
|------|--------------------------------|-------------------------|----------------|
| B01  | Coastal aerosol                |                   0.433 |             60 |
| B02  | Blue                           |                   0.460 |             10 |
| B03  | Green                          |                   0.560 |             10 |
| B04  | Red                            |                   0.665 |             10 |
| B05  | Vegetation red edge            |                   0.705 |             20 |
| B06  | Vegetation red edge            |                   0.740 |             20 |
| B07  | Vegetation red edge            |                   0.783 |             20 |
| B08  | Near-infrared                  |                   0.842 |             10 |
| B09  | Water vapor                    |                   0.945 |             60 |
| B10  | Short-wave infrared - Cirrus   |                   1.375 |             60 |
| B11  | Short-wave infrared            |                   1.610 |             20 |
| B12  | Short-wave infrared            |                   2.190 |             20 |

When viewing multi-band imagery that includes data from outside the visible spectrum, we have to choose how to map each band to one of the three visible channels (red, green, or blue) available for rendering on digital displays.  A "true color composite" is a rendering that displays visible blue (B02 from Sentinel-2) in the blue channel, visible green (B03) in the green channel, and visible red (B04) in the red channel.  Any other mapping of satellite image bands to display channels is a "false color composite."

There are a collection of Sentinel-2 L2A products hosted as Cloud-Optimized GeoTIFFs on [Amazon S3](https://registry.opendata.aws/sentinel-2/).  In this exercise, we'll render one of these on a map.

First, reset your `index.html` so we're ready to render a full page map:

[import](../../../src/en/examples/cog/true-color.html)

Now we'll import two new components we haven't used before:

 * the `ol/source/GeoTIFF` source for working with multi-band raster data
 * the `ol/layer/WebGLTile` layer for manipulating data tiles with shaders on the GPU

Update your `main.js` to load and render a remotely hosted GeoTIFF file on a map:

[import](../../../src/en/examples/cog/true-color.js)

The trickiest part here is finding the URL for an image that you might be interested in.  To do that, you can try searching in the [EO (Earth Observation) Browser](https://apps.sentinel-hub.com/eo-browser/).  If you have the `aws` [command line interface](https://aws.amazon.com/cli/) installed, you can also list the `s3://sentinel-cogs/` bucket contents to get the paths for images by the Sentinel-2 grid cell identifier and date.  For example, to search for images around Buenos Aires from September, 2021:

```bash
aws s3 ls s3://sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/ --no-sign-request
```

The next hardest part is figuring out what `projection` and `extent` are appropriate for the map view.  In the next step, we'll make that easier.
