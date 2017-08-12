//
//! [imports]
import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import MVTFormat from 'ol/format/mvt';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import tilegrid from 'ol/tilegrid';
//! [imports]

//! [key]
// See https://openmaptiles.com/hosting/ for terms and API key
const key = 'lirfd6Fegsjkvs0lshxe';
//! [key]

//! [map]
const map = new Map({
  target: 'map-container',
  view: new  View({
    center: [0, 0],
    zoom: 2
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
    format: new MVTFormat(),
    url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`,
    tileGrid: new tilegrid.createXYZ({
      maxZoom: 14,
      tileSize: 512
    })
  })
});
map.addLayer(layer);
//! [layer]
