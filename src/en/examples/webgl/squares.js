import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//! [imports]
import Renderer from 'ol/renderer/webgl/PointsLayer';
import {clamp} from 'ol/math';
//! [imports]

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

//! [points]
const color = [1, 0, 0, 0.5];

class CustomLayer extends VectorLayer {
  createRenderer() {
    return new Renderer(this, {
      colorCallback: function(feature, vertex, component) {
        return color[component];
      },
      sizeCallback: function(feature) {
        return 18 * clamp(feature.get('mass') / 200000, 0, 1) + 8;
      }
    });
  }
}
//! [points]

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner'
      })
    }),
    //! [layer]
    new CustomLayer({
      source: source
    })
    //! [layer]
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
