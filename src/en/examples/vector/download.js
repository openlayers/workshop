import GeoJSON from 'ol/format/GeoJSON';
import Link from 'ol/interaction/Link';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {DragAndDrop, Draw, Modify, Snap} from 'ol/interaction';

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

map.addInteraction(new Link());

const source = new VectorSource();

const layer = new VectorLayer({
  source: source,
});
map.addLayer(layer);

map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  })
);

map.addInteraction(
  new Modify({
    source: source,
  })
);

map.addInteraction(
  new Draw({
    source: source,
    type: 'Polygon',
  })
);

map.addInteraction(
  new Snap({
    source: source,
  })
);

//! [clear]
const clear = document.getElementById('clear');
clear.addEventListener('click', function () {
  source.clear();
});
//! [clear]

//! [download]
const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function () {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href =
    'data:application/json;charset=utf-8,' + encodeURIComponent(json);
});
//! [download]
