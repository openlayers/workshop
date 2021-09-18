import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Map, View} from 'ol';
import {Stamen, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, WebGLPoints as WebGLPointsLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';

const source = new VectorSource();

const client = new XMLHttpRequest();
client.open('GET', 'meteorites.csv');
client.onload = function () {
  const csv = client.responseText;
  let curIndex;
  let prevIndex = 0;
  const features = [];

  while ((curIndex = csv.indexOf('\n', prevIndex)) > 0) {
    const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');

    prevIndex = curIndex + 1;
    if (prevIndex === 0) {
      continue; // skip header
    }

    const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);

    features.push(
      new Feature({
        mass: parseFloat(line[1]) || 0,
        year: parseInt(line[2]) || 0,
        geometry: new Point(coords),
      })
    );
  }
  source.addFeatures(features);
};
client.send();

//! [years]
const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();
let currentYear = minYear;
//! [years]

const oldColor = 'rgba(242,56,22,0.61)';
const newColor = '#ffe52c';
const period = 12; // animation period in seconds
const animRatio = [
  '^',
  [
    '/',
    [
      '%',
      [
        '+',
        ['time'],
        ['interpolate', ['linear'], ['get', 'year'], 1850, 0, 2015, period],
      ],
      period,
    ],
    period,
  ],
  0.5,
];

const style = {
  variables: {
    minYear: 1850,
    maxYear: 2015,
  },
  filter: ['between', ['get', 'year'], ['var', 'minYear'], ['var', 'maxYear']],
  symbol: {
    symbolType: 'circle',
    size: [
      '*',
      ['interpolate', ['linear'], ['get', 'mass'], 0, 8, 200000, 26],
      ['-', 1.75, ['*', animRatio, 0.75]],
    ],
    color: ['interpolate', ['linear'], animRatio, 0, newColor, 1, oldColor],
    opacity: ['-', 1.0, ['*', animRatio, 0.75]],
  },
};

//! [declaration]
const map = new Map({
  //! [declaration]
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner',
      }),
    }),
    new WebGLPointsLayer({
      style: style,
      source: source,
      disableHitDetection: true,
    }),
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
  currentYear = Math.round(minYear + (elapsed % span));
  yearElement.innerText = currentYear;

  map.render();
  requestAnimationFrame(render);
}

render();
//! [animate]
