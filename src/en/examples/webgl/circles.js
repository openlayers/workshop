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
    'circle-radius': 7,
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
