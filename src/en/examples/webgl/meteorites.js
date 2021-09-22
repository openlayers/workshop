import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Map, View} from 'ol';
import {Stamen, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';

const source = new VectorSource();

const client = new XMLHttpRequest();
client.open('GET', './data/meteorites.csv');
client.onload = function () {
  const csv = client.responseText;
  const features = [];

  let prevIndex = csv.indexOf('\n') + 1; // scan past the header line

  let curIndex;
  while ((curIndex = csv.indexOf('\n', prevIndex)) != -1) {
    const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');
    prevIndex = curIndex + 1;

    const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);
    if (isNaN(coords[0]) || isNaN(coords[1])) {
      // guard against bad data
      continue;
    }

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

const meteorites = new VectorLayer({
  source: source,
});

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner',
      }),
    }),
    meteorites,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
