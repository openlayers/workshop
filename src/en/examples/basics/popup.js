import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
//! [import-proj]
import {fromLonLat, toLonLat} from 'ol/proj';
//! [import-proj]
//! [import-vector]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//! [import-vector]
//! [import-style]
import {Style, Icon} from 'ol/style';
//! [import-style]
//! [import-popup]
import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate';
//! [import-popup]

//! [map-const]
const map = new Map({
//! [map-const]
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//! [point-layer]
const position = new VectorSource();
const vector = new VectorLayer({
  source: position
});
map.addLayer(vector);
//! [point-layer]
//! [style]
vector.setStyle(new Style({
  image: new Icon({
    src: './data/marker.png'
  })
}));
//! [style]

navigator.geolocation.getCurrentPosition(function(pos) {
  const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
  map.getView().animate({center: coords, zoom: 10});
  //! [add-point]
  position.addFeature(new Feature(new Point(coords)));
  //! [add-point]
});

//! [overlay]
var overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10]
});
map.addOverlay(overlay);
//! [overlay]
//! [listen]
map.on('click', function(e) {
  overlay.setPosition();
  var features = map.getFeaturesAtPixel(e.pixel);
  if (features) {
    var coords = features[0].getGeometry().getCoordinates();
    var hdms = toStringHDMS(toLonLat(coords));
    overlay.getElement().innerHTML = hdms;
    overlay.setPosition(coords);
  }
});
//! [listen]
