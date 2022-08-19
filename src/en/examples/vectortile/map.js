//
//! [imports]
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
//! [imports]

//! [map]
const map = new Map({
  target: 'map-container',
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2,
  }),
});
//! [map]

//! [layer]
const layer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url:
      'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
      'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
    maxZoom: 14,
  }),
});
map.addLayer(layer);
//! [layer]
