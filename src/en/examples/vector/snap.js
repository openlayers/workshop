import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
import Draw from 'ol/interaction/draw';
import GeoJSON from 'ol/format/geojson';
import GeometryType from 'ol/geom/geometrytype';
import Map from 'ol/map';
import Modify from 'ol/interaction/modify';
import Snap from 'ol/interaction/snap';
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

const dragDrop = new DragDrop({
  formatConstructors: [GeoJSON]
});

dragDrop.on('addfeatures', function(event) {
  source.addFeatures(event.features);
});

map.addInteraction(dragDrop);

map.addInteraction(new Modify({source: source}));

map.addInteraction(new Draw({source: source, type: GeometryType.POLYGON}));

map.addInteraction(new Snap({source: source}));
