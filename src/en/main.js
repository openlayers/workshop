import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
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
              fromLonLat([parseFloat(row.reclong), parseFloat(row.reclat)])
            ),
          })
      )
    );
  },
});

const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();

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

const meteorites = new WebGLPointsLayer({
  source: source,
  disableHitDetection: true,
  variables: {
    currentYear: minYear,
  },
  style: {
    filter: ['between', ['get', 'year'], periodStart, ['var', 'currentYear']],
    'circle-radius': [
      '*',
      decay,
      ['+', ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 9], 4],
    ],
    'circle-fill-color': ['color', 255, 0, 0, ['*', 0.5, decay]],
  },
});

const map = new Map({
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

const yearElement = document.getElementById('year');

function render() {
  const elapsed = (rate * (Date.now() - start)) / 1000;
  const currentYear = Math.round(minYear + (elapsed % span));
  meteorites.updateStyleVariables({currentYear: currentYear});
  yearElement.innerText = currentYear;
  requestAnimationFrame(render);
}

render();
