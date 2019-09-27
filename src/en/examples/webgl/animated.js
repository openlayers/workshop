import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//! [renderer]
import Renderer from 'ol/renderer/webgl/PointsLayer';
//! [renderer]
import {clamp} from 'ol/math';

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

//! [years]
const minYear = 1850;
const maxYear = 2015;
const span = maxYear - minYear;
const rate = 10; // years per second

const start = Date.now();
let currentYear = minYear;
//! [years]

//! [customlayer]
class CustomLayer extends VectorLayer {
  createRenderer() {
    return new Renderer(this, {
      // options go here
    })
  }
};
//! [customlayer]

class CustomLayer extends VectorLayer {
  createRenderer() {
    return new Renderer(this, {
      //! [attributes]
      attributes: [{
        name: 'size',
        callback: function (feature) {
          return 32 * clamp(feature.get('mass') / 200000, 0, 1) + 16;
        }
      },
      {
        name: 'year',
        callback: function (feature) {
          return feature.get('year');
        },
      }],
      //! [attributes]
      //! [uniforms]
      uniforms: {
        u_currentYear: function() {
          return currentYear;
        }
      },
      //! [uniforms],
      //! [shaders]
      vertexShader: `
        precision mediump float;

        uniform mat4 u_projectionMatrix;
        uniform mat4 u_offsetScaleMatrix;
        uniform mat4 u_offsetRotateMatrix;

        attribute vec2 a_position;
        attribute float a_index;
        attribute float a_size;
        attribute float a_year;

        varying vec2 v_texCoord;
        varying float v_year;

        void main(void) {
          mat4 offsetMatrix = u_offsetScaleMatrix;
          float offsetX = a_index == 0.0 || a_index == 3.0 ? -a_size / 2.0 : a_size / 2.0;
          float offsetY = a_index == 0.0 || a_index == 1.0 ? -a_size / 2.0 : a_size / 2.0;
          vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);
          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;
          float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;
          float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;
          v_texCoord = vec2(u, v);
          v_year = a_year;
        }`,
      fragmentShader: `
        precision mediump float;

        uniform float u_currentYear;

        varying vec2 v_texCoord;
        varying float v_year;

        void main(void) {
          if (v_year > u_currentYear) {
            discard;
          }

          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);
          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;

          float factor = pow(1.1, u_currentYear - v_year);

          float value = 2.0 * (1.0 - sqRadius * factor);
          float alpha = smoothstep(0.0, 1.0, value);

          gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
          gl_FragColor.a *= alpha;
          gl_FragColor.rgb *= gl_FragColor.a;
        }`
      //! [shaders]
    });
  }
}


//! [declaration]
const map = new Map({
//! [declaration]
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner'
      })
    }),
    new CustomLayer({
      source: source
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//! [animate]
const yearElement = document.getElementById('year');

function render() {
  const elapsed = rate * (Date.now() - start) / 1000;
  currentYear = minYear + (elapsed % span);
  yearElement.innerText = currentYear.toFixed(0);

  map.render();
  requestAnimationFrame(render);
}

render();
//! [animate]


{
  //! [fragment]
  fragmentShader: `
    precision mediump float;

    uniform float u_currentYear;

    varying vec2 v_texCoord;
    varying float v_year;

    void main(void) {
      if (v_year > u_currentYear) {
        discard;
      }

      vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);
      float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;

      float factor = pow(1.1, u_currentYear - v_year);

      float value = 2.0 * (1.0 - sqRadius * factor);
      float alpha = smoothstep(0.0, 1.0, value);

      gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
      gl_FragColor.a *= alpha;
      gl_FragColor.rgb *= gl_FragColor.a;
    }`
  //! [fragment]
};

{
  fragmentShader: `
    precision mediump float;

    uniform float u_currentYear;

    varying vec2 v_texCoord;
    varying float v_year;

    void main(void) {
      //! [discard]
      if (v_year > u_currentYear) {
        discard;
      }
      //! [discard]

      //! [alpha]
      vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);
      float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;
      
      float factor = pow(1.1, u_currentYear - v_year);

      float value = 2.0 * (1.0 - sqRadius * factor);
      float alpha = smoothstep(0.0, 1.0, value);
      //! [alpha]

      gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
      gl_FragColor.a *= alpha;
      gl_FragColor.rgb *= gl_FragColor.a;
    }`
};