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

//! [years]
const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();
//! [years]

//! [expressions]
const period = 10;
const periodStart = ['-', ['var', 'currentYear'], period];
const decay = [
  'interpolate',
  ['linear'],
  ['get', 'year'],
  periodStart,
  0,
  ['var', 'currentYear'],
  1,
];
//! [expressions]

const meteorites = new WebGLVectorLayer({
  source: source,
  //! [variables]
  variables: {
    currentYear: minYear,
  },
  // ...other options like `style`
  //! [variables]
  style: {
    //! [filter]
    filter: ['between', ['get', 'year'], periodStart, ['var', 'currentYear']],
    //! [filter]
    //! [size]
    'circle-radius': [
      '*',
      decay,
      ['+', ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 9], 4],
    ],
    //! [size]
    //! [opacity]
    'circle-fill-color': ['color', 255, 0, 0, ['*', 0.5, decay]],
    //! [opacity]
  },
  //! [hitdetection]
  disableHitDetection: true,
  //! [hitdetection]
});

//! [declaration]
const map = new Map({
  //! [declaration]
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

//! [animate]
const yearElement = document.getElementById('year');

function render() {
  const elapsed = (rate * (Date.now() - start)) / 1000;
  const currentYear = Math.round(minYear + (elapsed % span));
  meteorites.updateStyleVariables({currentYear: currentYear});
  yearElement.innerText = currentYear;
  requestAnimationFrame(render);
}

render();
//! [animate]
