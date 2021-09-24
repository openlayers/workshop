import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import {fromLonLat} from 'ol/proj.js';

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

//! [layer]
const layer = new TileLayer({
  opacity: 0.6,
  source: new XYZ({
    url:
      'https://api.maptiler.com/tiles/terrain-rgb/{z}/{x}/{y}.png?key=' + key,
    maxZoom: 10,
    tileSize: 512,
    crossOrigin: 'anonymous',
  }),
});
//! [layer]

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key,
        attributions: attributions,
        crossOrigin: 'anonymous',
        tileSize: 512,
      }),
    }),
    layer,
  ],
  view: new View({
    center: fromLonLat([-58.3816, -34.6037]),
    zoom: 11,
  }),
});
