import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';

const key = 'pk.eyJ1IjoidHNjaGF1YiIsImEiOiJjaW5zYW5lNHkxMTNmdWttM3JyOHZtMmNtIn0.CDIBD8H-G2Gf-cPkIuWtRg';
//! [elevation]
const elevation = new XYZSource({
  url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=' + key,
  crossOrigin: 'anonymous'
});
//! [elevation]

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      })
    }),
    //! [layer]
    new TileLayer({
      opacity: 0.8,
      source: elevation
    })
    //! [layer]
  ],
  view: new View({
    center: fromLonLat([-117.1493, 32.6965]),
    zoom: 12
  })
});
