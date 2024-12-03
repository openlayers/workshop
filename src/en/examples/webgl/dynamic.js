import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
//! [import]
import WebGLVectorLayer from 'ol/layer/WebGLVector';
//! [import]
import {Map, View} from 'ol';
import {StadiaMaps, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {parse} from 'papaparse';

const source = new VectorSource();
parse('./data/meteorites.csv', {
  download: true,
  header: true,
  complete(result) {
    source.addFeatures(
      result.data.map(
        (row) =>
          new Feature({
            mass: parseFloat(row.mass) || 0,
            year: parseInt(row.year) || 0,
            geometry: new Point(
              fromLonLat([parseFloat(row.reclong), parseFloat(row.reclat)]),
            ),
          }),
      ),
    );
  },
});

//! [layer]
const meteorites = new WebGLVectorLayer({
  source: source,
  style: {
    //! [size]
    'circle-radius': [
      '+',
      ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 9],
      4,
    ],
    //! [size]
    'circle-fill-color': 'rgba(255, 0, 0, 0.5)',
  },
});
//! [layer]

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new StadiaMaps({
        layer: 'stamen_toner',
      }),
    }),
    meteorites,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

/**
//! [operator1]
  ['get', 'mass']
//! [operator1]
//! [operator2]
  ['clamp', value, 0, 1]
//! [operator2]
//! [operator3]
  ['*', value, 9]
//! [operator3]
//! [operator4]
  ['+', value, 4]
//! [operator4]
 */
