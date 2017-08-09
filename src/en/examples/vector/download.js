import 'ol/ol.css';
import DragDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/geojson';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';
import Modify from 'ol/interaction/modify';
import Draw from 'ol/interaction/draw';
import GeometryType from 'ol/geom/geometrytype';
import Snap from 'ol/interaction/snap';

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

const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
  source.clear();
});

const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function() {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = 'data:text/json;charset=utf-8,' + json;
});
