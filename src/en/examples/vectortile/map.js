//
//! [imports]
import 'ol/ol.css';
import {Map, View} from 'ol';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {fromLonLat} from 'ol/proj';
//! [imports]

//! [key]
// See https://openmaptiles.com/hosting/ for terms and API key
const key = 'lirfd6Fegsjkvs0lshxe'; // use your own instead
//! [key]

//! [map]
const map = new Map({
  target: 'map-container',
  view: new View({
    center: fromLonLat([-117.1625, 32.715]),
    zoom: 6
  })
});
//! [map]

//! [layer]
const layer = new VectorTileLayer({
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`,
    maxZoom: 14
  })
});
map.addLayer(layer);
//! [layer]
