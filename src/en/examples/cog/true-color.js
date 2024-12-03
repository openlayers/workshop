import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import {transformExtent} from 'ol/proj';

// metadata from https://s3.us-west-2.amazonaws.com/sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/S2B_21HUB_20210915_0_L2A.json
const projection = 'EPSG:32721';

const extent = transformExtent(
  [-59.19991, -35.32718, -57.98062, -34.32183],
  'EPSG:4326',
  projection,
);

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/TCI.tif',
    },
  ],
});

const layer = new TileLayer({
  source: source,
});

new Map({
  target: 'map-container',
  layers: [layer],
  view: new View({
    projection: projection,
    center: getCenter(extent),
    extent: extent,
    zoom: 1,
  }),
});
