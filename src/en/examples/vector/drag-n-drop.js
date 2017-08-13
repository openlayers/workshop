import 'ol/ol.css';
//! [import]
import DragDrop from 'ol/interaction/DragAndDrop';
//! [import]
import GeoJSON from 'ol/format/geojson';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';

//! [source]
const source = new VectorSource();
//! [source]

//! [map-const]
const map = new Map({
//! [map-const]
  target: 'map-container',
  //! [layers]
  layers: [
    new VectorLayer({
      source: source
    })
  ],
  //! [layers]
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//! [interaction]
map.addInteraction(new DragDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));
//! [interaction]
