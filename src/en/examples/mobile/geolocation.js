import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
//! [import-layer]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
//! [import-layer]
//! [import-geolocation]
import Feature from 'ol/Feature';
import {circular} from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
//! [import-geolocation]
//! [import-control]
import Control from 'ol/control/Control';
//! [import-control]

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSMSource()
    })
  ],
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2
  })
});
//! [layer]
const source = new VectorSource();
const layer = new VectorLayer({
  source: source
});
map.addLayer(layer);
//! [layer]
//! [geolocation]
navigator.geolocation.watchPosition(function(pos) {
  const coords = [pos.coords.longitude, pos.coords.latitude];
  const accuracy = circular(coords, pos.coords.accuracy);
  source.clear(true);
  source.addFeatures([
    new Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
    new Feature(new Point(fromLonLat(coords)))
  ]);
}, function(error) {
  alert(`ERROR: ${error.message}`);
}, {
  enableHighAccuracy: true
});
//! [geolocation]
//! [control]
const locate = document.createElement('div');
locate.className = 'ol-control ol-unselectable locate';
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener('click', function() {
  if (!source.isEmpty()) {
    map.getView().fit(source.getExtent(), {
      maxZoom: 18,
      duration: 500
    });
  }
});
map.addControl(new Control({
  element: locate
}));
//! [control]
