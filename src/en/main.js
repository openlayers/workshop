import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
//! [import]
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
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

const styleVariables = {
  currentYear: minYear,
};

//! [layer]
const meteorites = new WebGLPointsLayer({
  source: source,
  style: {
    variables: styleVariables,
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
  styleVariables.currentYear = Math.round(minYear + (elapsed % span));
  yearElement.innerText = styleVariables.currentYear;

  map.render();
  requestAnimationFrame(render);
}

render();
