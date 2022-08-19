import MapboxVectorLayer from 'ol/layer/MapboxVector';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
//! [import-layer]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';
//! [import-layer]
//! [import-interaction]
import Feature from 'ol/Feature';
import {fromExtent} from 'ol/geom/Polygon';
//! [import-interaction]

const map = new Map({
  target: 'map-container',
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2,
  }),
});

const layer = new MapboxVectorLayer({
  styleUrl:
    'https://api.maptiler.com/maps/bright/style.json?key=lirfd6Fegsjkvs0lshxe',
  // or, instead of the above, try
  // styleUrl: 'mapbox://styles/mapbox/bright-v9',
  // accessToken: 'Your token from https://mapbox.com/'
});
map.addLayer(layer);

//! [layer]
const source = new VectorSource();
new VectorLayer({
  map: map,
  source: source,
  style: new Style({
    stroke: new Stroke({
      color: 'red',
      width: 4,
    }),
  }),
});
//! [layer]
//! [interaction]
map.on('pointermove', function (event) {
  source.clear();
  map.forEachFeatureAtPixel(
    event.pixel,
    function (feature) {
      const geometry = feature.getGeometry();
      source.addFeature(new Feature(fromExtent(geometry.getExtent())));
    },
    {
      hitTolerance: 2,
    }
  );
});
//! [interaction]
