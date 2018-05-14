import 'ol/ol.css';
//! [import]
import DragAndDrop from 'ol/interaction/DragAndDrop';
//! [import]
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';

//! [map-const]
const map = new Map({
//! [map-const]
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

sync(map);

//! [source]
const source = new VectorSource();
//! [source]

//! [layers]
const layer = new VectorLayer({
  source: source
});
map.addLayer(layer);
//! [layers]

//! [interaction]
map.addInteraction(new DragAndDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));
//! [interaction]
