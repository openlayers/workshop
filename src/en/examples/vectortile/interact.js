import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import MVT from 'ol/format/mvt';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import tilegrid from 'ol/tilegrid';
//! [popup-import]
import Overlay from 'ol/overlay';
//! [popup-import]

// See https://openmaptiles.com/hosting/ for terms and API key
const key = 'lirfd6Fegsjkvs0lshxe';

const map = new Map({
  target: 'map-container',
  view: new  View({
    center: [0, 0],
    zoom: 2
  })
});

const layer = new VectorTileLayer({
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`,
    tileGrid: new tilegrid.createXYZ({
      maxZoom: 14,
      tileSize: 512
    })
  })
});
map.addLayer(layer);

//! [popup]
const overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10],
  autoPan: true
});
map.addOverlay(overlay);
//! [popup]
//! [popup-close]
overlay.getElement().addEventListener('click', function() {
  overlay.setPosition();
});
//! [popup-close]
//! [interact]
map.on('click', function(e) {
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    markup += `${markup && '<hr>'}<table>`;
    const properties = feature.getProperties();
    for (const property in properties) {
      markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
    }
    markup += '</table>';
  }, {hitTolerance: 1});
  if (markup) {
    document.getElementById('popup-content').innerHTML = markup;
    overlay.setPosition(e.coordinate);
  } else {
    overlay.setPosition();
  }
});
//! [interact]
