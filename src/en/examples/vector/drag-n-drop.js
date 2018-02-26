import 'ol/ol.css';
//! [import]
import DragDrop from 'ol/interaction/draganddrop';
//! [import]
import GeoJSON from 'ol/format/geojson';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';
import sync from 'ol-hashed';

const map = new Map({
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
map.addInteraction(new DragDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));
//! [interaction]
