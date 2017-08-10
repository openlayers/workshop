import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/geojson';
import Map from 'ol/map';
//! [import-modify]
import Modify from 'ol/interaction/modify';
//! [import-modify]
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';

const source = new VectorSource();

const map = new Map({
  target: 'map-container',
  layers: [
    new VectorLayer({
      source: source
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

map.addInteraction(new DragDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));

//! [modify]
map.addInteraction(new Modify({
  source: source
}));
//! [modify]
