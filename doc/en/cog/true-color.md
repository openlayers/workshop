# True color GeoTIFF

September images around Buenos Aires

```bash
aws s3 ls s3://sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/ --no-sign-request
```

First, reset your `index.html` so we're ready to render a full page map:

[import](../../../src/en/examples/cog/true-color.html)

Now we'll import two new components we haven't used before:

 * the GeoTIFF source for working with multi-band raster data
 * the WebGL tile layer for manipulating data tiles with shaders on the GPU

Update your `main.js` to load and render a remotely hosted GeoTIFF file on a map:

[import](../../../src/en/examples/cog/true-color.js)
