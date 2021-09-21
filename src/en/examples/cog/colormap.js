import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
//! [import]
import colormap from 'colormap';
//! [import]

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B04.tif',
      max: 10000,
    },
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B08.tif',
      max: 10000,
    },
  ],
});

const nir = ['band', 2];
const red = ['band', 1];
const difference = ['-', nir, red];
const sum = ['+', nir, red];
const ndvi = ['/', difference, sum];

//! [func]
function getColorStops(name, min, max, steps, reverse) {
  const delta = (max - min) / (steps - 1);
  const stops = new Array(steps * 2);
  const colors = colormap({colormap: name, nshades: steps, format: 'rgba'});
  if (reverse) {
    colors.reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colors[i];
  }
  return stops;
}
//! [func]

//! [layer]
const layer = new TileLayer({
  source: source,
  style: {
    color: [
      'interpolate',
      ['linear'],
      ndvi,
      // color ramp for NDVI values
      ...getColorStops('earth', -0.5, 1, 10, true),
    ],
  },
});
//! [layer]

new Map({
  target: 'map-container',
  layers: [layer],
  view: source.getView(),
});
