import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';
//! [import-layer]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Stroke} from 'ol/style';
//! [import-layer]
//! [import-interaction]
import {Feature} from 'ol';
import {fromExtent} from 'ol/geom/Polygon';
//! [import-interaction]

const map = apply('map-container', './data/bright.json');
//! [layer]
const source = new VectorSource();
new VectorLayer({
  map: map,
  source: source,
  style: new Style({
    stroke: new Stroke({
      color: 'red',
      width: 4
    })
  })
});
//! [layer]
//! [interaction]
map.on('pointermove', function(event) {
  source.clear();
  map.forEachFeatureAtPixel(event.pixel, function(feature) {
    const geometry = feature.getGeometry();
    source.addFeature(new Feature(fromExtent(geometry.getExtent())));
  }, {
    hitTolerance: 2
  });
});
//! [interaction]
