import {Map, View} from 'ol';
import {MapboxVectorLayer} from 'ol-mapbox-style';
import {fromLonLat} from 'ol/proj';
//! [import-layer]
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
//! [import-layer]
//! [import-interaction]
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//! [import-interaction]

const map = new Map({
  target: 'map-container',
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2,
  }),
});

const layer = new MapboxVectorLayer({
  styleUrl: 'https://tiles.openfreemap.org/styles/bright',
  // or, instead of the above, try
  // styleUrl: 'mapbox://styles/mapbox/bright-v9',
  // accessToken: 'Your token from https://mapbox.com/'
});
map.addLayer(layer);

//! [layer]
const source = new VectorSource();
const info = new VectorLayer({
  source: source,
  style: {
    'stroke-color': 'red',
    'stroke-width': 4,
    //! [coalesce]
    'text-value': ['coalesce', ['get', 'layers'], ''],
    //! [coalesce]
    'text-padding': [2, 2, 2, 2],
    'text-offset-y': -15,
    'text-font': '16px sans-serif',
    'text-background-fill-color': 'gray',
  },
});
map.addLayer(info);
//! [layer]
//! [interaction]
map.on('pointermove', function (event) {
  source.clear();
  //! [get-features]
  const features = map.getFeaturesAtPixel(event.pixel, {
    layerFilter: (layer) => layer !== info,
  });
  //! [get-features]
  source.addFeatures(features);
  //! [layers-label]
  const layers = features.map((feature) => feature.get('layer'));
  source.addFeature(
    new Feature({
      geometry: new Point(event.coordinate),
      layers: Array.from(new Set(layers)).join(', '),
    })
  );
  //! [layers-label]
});
//! [interaction]
