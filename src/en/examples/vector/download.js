import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import GeometryType from 'ol/geom/GeometryType';
import {DragAndDrop, Draw, Modify, Snap} from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
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

map.addInteraction(new Modify({
  source: source
}));

map.addInteraction(new Draw({
  source: source,
  type: GeometryType.POLYGON
}));

map.addInteraction(new Snap({
  source: source
}));

//! [clear]
const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
  source.clear();
});
//! [clear]

//! [download]
const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function() {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = 'data:text/json;charset=utf-8,' + json;
});
//! [download]
