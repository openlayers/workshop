import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
import Draw from 'ol/interaction/draw';
import GeoJSON from 'ol/format/geojson';
import GeometryType from 'ol/geom/geometrytype';
import Map from 'ol/map';
import Modify from 'ol/interaction/modify';
//! [import-snap]
import Snap from 'ol/interaction/snap';
//! [import-snap]
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

const source = new VectorSource();

const layer = new VectorLayer({
  source: source
});
map.addLayer(layer);

map.addInteraction(new DragDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));

map.addInteraction(new Modify({
  source: source
}));

map.addInteraction(new Draw({
  source: source,
  type: GeometryType.POLYGON
}));

//! [snap]
map.addInteraction(new Snap({
  source: source
}));
//! [snap]
