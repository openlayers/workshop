import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import {Tile as TileLayer} from 'ol/layer';
import {WebGLPoints as WebGLPointsLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const source = new VectorSource();

const client = new XMLHttpRequest();
client.open('GET', 'data/meteorites.csv');
client.onload = function() {
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

    features.push(new Feature({
      mass: parseFloat(line[1]) || 0,
      year: parseInt(line[2]) || 0,
      geometry: new Point(coords)
    }));
  }
  source.addFeatures(features);
};
client.send();

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner'
      })
    }),
//! [layer]
    new WebGLPointsLayer({
      source: source,
      style: {
        symbol: {
          symbolType: 'circle',
          // equivalent to: 18 * clamp('mass' / 200000, 0, 1) + 8
          size: ['+', ['*', ['clamp', ['*', ['get', 'mass'], 1/20000], 0, 1], 18], 8],
          color: 'rgba(255,0,0,0.5)'
        }
      }
    })
//! [layer]
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//! [expression]
// equivalent to: 18 * clamp('mass' / 200000, 0, 1) + 8
size: ['+', ['*', ['clamp', ['*', ['get', 'mass'], 1/20000], 0, 1], 18], 8],
//! [expression]

//! [operator1]
  ['get', 'mass']
//! [operator1]
//! [operator2]
  ['clamp', value, 0, 1]]
//! [operator2]
//! [operator3]
  ['*', value, 3]
//! [operator3]