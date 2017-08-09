import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/geojson';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';
import interaction from 'ol/interaction';

const source = new VectorSource();

const dragDrop = new DragDrop({
  formatConstructors: [GeoJSON]
});

dragDrop.on('addfeatures', function(event) {
  source.addFeatures(event.features);
});

new Map({
  target: 'map-container',
  interactions: interaction.defaults().extend([dragDrop]),
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
