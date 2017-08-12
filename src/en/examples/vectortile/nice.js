import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
//! [popup-import]
import Overlay from 'ol/overlay';
//! [popup-import]
//! [mapbox-style-import]
import {apply} from 'ol-mapbox-style';
//! [mapbox-style-import]

const map = new Map({
  target: 'map-container',
  view: new  View({
    center: [0, 0],
    zoom: 2
  })
});

//! [popup]
const overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10],
  autoPan: true
});
map.addOverlay(overlay);
overlay.getElement().addEventListener('click', function() {
  overlay.setPosition();
});

map.on('click', function(e) {
  overlay.setPosition();
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    markup += `${markup && '<hr>'}<table>`;
    var properties = feature.getProperties();
    for (var property in properties) {
      markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
    }
    markup += '</table>';
  }, {hitTolerance: 1});
  if (markup) {
    document.getElementById('popup-content').innerHTML = markup;
    overlay.setPosition(e.coordinate);
  }
});
//! [popup]

apply(map, './data/bright.json');
