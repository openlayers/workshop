import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';

const projection = new Projection({
  code: 'EPSG:32721',
  units: 'm',
});

// metadata from https://s3.us-west-2.amazonaws.com/sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/S2B_21HUB_20210915_0_L2A.json
const sourceExtent = [300000, 6090260, 409760, 6200020];

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

new Map({
  maxTilesLoading: 1,
  target: 'map-container',
  layers: [
    new TileLayer({
      style: {
        color: [
          'interpolate',
          ['linear'],
          ndvi,
          // color ramp for NDVI values, ranging from -1 to 1
          -0.2,
          [191, 191, 191],
          0,
          [255, 255, 224],
          0.2,
          [145, 191, 82],
          0.4,
          [79, 138, 46],
          0.6,
          [15, 84, 10],
        ],
      },
      source: source,
      extent: sourceExtent,
    }),
  ],
  view: new View({
    projection: projection,
    center: getCenter(sourceExtent),
    extent: sourceExtent,
    zoom: 1,
  }),
});
