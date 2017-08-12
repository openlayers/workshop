import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
//! [import-draw]
import Draw from 'ol/interaction/draw';
//! [import-draw]
import GeoJSON from 'ol/format/geojson';
//! [import-types]
import GeometryType from 'ol/geom/geometrytype';
//! [import-types]
import Map from 'ol/map';
import Modify from 'ol/interaction/modify';
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

map.addInteraction(new Modify({
  source: source
}));

//! [draw]
map.addInteraction(new Draw({
  source: source,
  type: GeometryType.POLYGON
}));
//! [draw]