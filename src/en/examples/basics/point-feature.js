import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
//! [import-proj]
import {fromLonLat} from 'ol/proj';
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
