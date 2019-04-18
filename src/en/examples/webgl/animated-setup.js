import 'ol/ol.css';
import {clamp} from 'ol/math';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Renderer from 'ol/renderer/webgl/PointsLayer';

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

const color = [1, 0, 0, 0.5];

// start
const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();
let currentYear = minYear;
// stop

class PointsLayer extends VectorLayer {
  createRenderer() {
    return new Renderer(this, {
      colorCallback: function(feature, vertex, component) {
        return color[component];
      },
      sizeCallback: function(feature) {
        return 18 * clamp(feature.get('mass') / 200000, 0, 1) + 8;
      },
      fragmentShader: `
        precision mediump float;

        varying vec2 v_texCoord;
        varying vec4 v_color;

        void main(void) {
          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);
          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;
          float value = 2.0 * (1.0 - sqRadius);
          float alpha = smoothstep(0.0, 1.0, value);

          gl_FragColor = v_color;
          gl_FragColor.a *= alpha;
        }`
    });
  }
}

// start
const map = new Map({
// stop
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner'
      })
    }),
    new PointsLayer({
      source: source
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

// start
const yearElement = document.getElementById('year');

function render() {
  const elapsed = rate * (Date.now() - start) / 1000;
  currentYear = minYear + (elapsed % span);
  yearElement.innerText = currentYear.toFixed(0);

  map.render();
  requestAnimationFrame(render);
}

render();
// stop
