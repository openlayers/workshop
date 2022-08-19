//
//! [import]
import MapboxVectorLayer from 'ol/layer/MapboxVector';
//! [import]
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';

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
const layer = new MapboxVectorLayer({
  styleUrl:
    'https://api.maptiler.com/maps/bright/style.json?key=lirfd6Fegsjkvs0lshxe',
  // or, instead of the above, try
  // styleUrl: 'mapbox://styles/mapbox/bright-v9',
  // accessToken: 'Your token from https://mapbox.com/'
});
map.addLayer(layer);
//! [layer]
