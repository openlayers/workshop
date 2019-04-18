import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSMSource()
    })
  ],
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2
  })
});
