import 'ol/ol.css';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
//! [import-modify]
import Modify from 'ol/interaction/Modify';
//! [import-modify]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

sync(map);

const source = new VectorSource();

const layer = new VectorLayer({
  source: source
});
map.addLayer(layer);

map.addInteraction(new DragAndDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));

//! [modify]
map.addInteraction(new Modify({
  source: source
}));
//! [modify]
