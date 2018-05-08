//
//! [imports]
import 'ol/ol.css';
import Overlay from 'ol/Overlay';
//! [imports]
//! [mapbox-style-import]
import {apply} from 'ol-mapbox-style';
//! [mapbox-style-import]

//! [map]
const map = apply('map-container', './data/bright.json');
//! [map]

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
//! [popup]
//! [interact]
map.on('click', function(e) {
  overlay.setPosition();
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
  }
});
//! [interact]
