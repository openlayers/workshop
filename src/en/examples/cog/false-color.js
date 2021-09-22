import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';

//! [source]
const source = new GeoTIFF({
  sources: [
    {
      // near-infrared reflectance
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B08.tif',
      max: 5000,
    },
    {
      // red reflectance
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B04.tif',
      max: 5000,
    },
    {
      // green reflectance
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B03.tif',
      max: 5000,
    },
  ],
});
//! [source]

const layer = new TileLayer({
  source: source,
});

new Map({
  target: 'map-container',
  layers: [layer],
  view: source.getView(),
});
