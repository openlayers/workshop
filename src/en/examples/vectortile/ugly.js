import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import Overlay from 'ol/Overlay';
//! [style-import]
import {Style, Fill, Stroke, Circle, Text} from 'ol/style';
// import {createDefaultStyle} from 'ol/style/Style';
//! [style-import]

const key = 'lirfd6Fegsjkvs0lshxe';

const map = new Map({
  target: 'map-container',
  view: new  View({
    center: [0, 0],
    zoom: 2
  })
});

const layer = new VectorTileLayer({
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`,
    maxZoom: 14
  })
});
map.addLayer(layer);

const overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10],
  autoPan: true
});
map.addOverlay(overlay);
overlay.getElement().addEventListener('click', function() {
  overlay.setPosition();
});

map.on('click', function(e) {
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    markup += `${markup && '<hr>'}<table>`;
    const properties = feature.getProperties();
    for (const property in properties) {
      markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
    }
    markup += '</table>';
  }, {hitTolerance: 1});
  if (markup) {
    document.getElementById('popup-content').innerHTML = markup;
    overlay.setPosition(e.coordinate);
  } else {
    overlay.setPosition();
  }
});

//! [style]
layer.setStyle(function(feature, resolution) {
  const properties = feature.getProperties();

  // Water polygons
  if (properties.layer == 'water') {
    return new Style({
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.7)'
      })
    });
  }

  // Boundary lines
  if (properties.layer == 'boundary' && properties.admin_level == 2) {
    return new Style({
      stroke: new Stroke({
        color: 'gray'
      })
    });
  }

  // Continent labels
  if (properties.layer == 'place' && properties.class == 'continent') {
    return new Style({
      text: new Text({
        text: properties.name,
        font: 'bold 16px Open Sans',
        fill: new Fill({
          color: 'black'
        }),
        stroke: new Stroke({
          color: 'white'
        })
      })
    });
  }

  // Country labels
  if (properties.layer == 'place' && properties.class == 'country' &&
      resolution < map.getView().getResolutionForZoom(5)) {
    return new Style({
      text: new Text({
        text: properties.name,
        font: 'normal 13px Open Sans',
        fill: new Fill({
          color: 'black'
        }),
        stroke: new Stroke({
          color: 'white'
        })
      })
    });
  }

  // Capital icons and labels
  if (properties.layer == 'place' && properties.capital) {
    const point = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: 'black'
        }),
        stroke: new Stroke({
          color: 'gray'
        })
      })
    });

    if (resolution < map.getView().getResolutionForZoom(6)) {
      point.setText(new Text({
        text: properties.name,
        font: 'italic 12px Open Sans',
        offsetY: -12,
        fill: new Fill({
          color: '#013'
        }),
        stroke: new Stroke({
          color: 'white'
        })
      }));
    }
    return point;
  }

  // return createDefaultStyle(feature, resolution);
});
//! [style]
