import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';

//! [source]
const source = new GeoTIFF({
  sources: [
    {
      // red reflectance
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B04.tif',
      max: 10000,
    },
    {
      // near-infrared reflectance
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B08.tif',
      max: 10000,
    },
  ],
});
//! [source]

//! [expression]
// near-infrared is the second band from above
const nir = ['band', 2];

// near-infrared is the first band from above
const red = ['band', 1];

const difference = ['-', nir, red];
const sum = ['+', nir, red];

const ndvi = ['/', difference, sum];
//! [expression]

//! [layer]
const layer = new TileLayer({
  source: source,
  style: {
    color: [
      'interpolate',
      ['linear'],
      ndvi,
      -0.2, // ndvi values <= -0.2 will get the color below
      [191, 191, 191],
      0, // ndvi values between -0.2 and 0 will get an interpolated color between the one above and the one below
      [255, 255, 224],
      0.2,
      [145, 191, 82],
      0.4,
      [79, 138, 46],
      0.6,
      [15, 84, 10],
    ],
  },
});
//! [layer]

new Map({
  target: 'map-container',
  layers: [layer],
  view: source.getView(),
});
