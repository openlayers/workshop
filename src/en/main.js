import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import MVTFormat from 'ol/format/mvt';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import tilegrid from 'ol/tilegrid';
import Overlay from 'ol/overlay';
//! [style-import]
import Style from 'ol/style/style';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import Circle from 'ol/style/circle';
import TextStyle from 'ol/style/text';
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
    format: new MVTFormat(),
    url: `https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=${key}`,
    tileGrid: new tilegrid.createXYZ({
      maxZoom: 14,
      tileSize: 512
    })
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
  overlay.setPosition();
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    markup += `${markup && '<hr>'}<table>`;
    var properties = feature.getProperties();
    for (var property in properties) {
      markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
    }
    markup += '</table>';
  }, {hitTolerance: 1});
  if (markup) {
    document.getElementById('popup-content').innerHTML = markup;
    overlay.setPosition(e.coordinate);
  }
});

//! [style-reuse]
const fill = new FillStyle();
const stroke = new StrokeStyle();
const text = new TextStyle();
const circle = new Circle({
  radius: 5,
  fill: new FillStyle({
    color: 'black'
  }),
  stroke: new StrokeStyle({
    color: 'gray',
    width: 1
  })
});

const point = new Style();
const label = new Style({
  text: text
});
const line = new Style();
const polygon = new Style();
//! [style-reuse]
//! [style]
const styleFunction = function(feature, resolution) {
  var properties = feature.getProperties();
  var geometry = feature.getGeometry();
  var type = geometry.getType();

  // Water polygons
  if (type == 'Polygon' && properties.layer == 'water') {
    fill.setColor('rgba(0, 0, 255, 0.7)');
    polygon.setFill(fill);
    polygon.setStroke(null);
    return polygon;
  }

  // Boundary lines
  if ((type == 'LineString' || type == 'MultiLineString') &&
      properties.layer == 'boundary' &&
      properties.admin_level == 2) {
    stroke.setColor('gray');
    stroke.setWidth(1);
    line.setStroke(stroke);
    return line;
  }

  // Continent labels
  if (type == 'Point' && properties.class == 'continent') {
    text.setText(properties.name);
    text.setFont('Bold 16px Open Sans');
    fill.setColor('black');
    text.setFill(fill);
    stroke.setColor('white');
    stroke.setWidth(1);
    text.setStroke(stroke);
    return label;
  }

  // Country labels
  if (type == 'Point' && properties.class == 'country' &&
      resolution < map.getView().getResolutionForZoom(5)) {
    text.setText(properties.name);
    text.setFont('Normal 13px Open Sans');
    text.setOffsetY(0);
    fill.setColor('black');
    text.setFill(fill);
    stroke.setColor('white');
    stroke.setWidth(1);
    text.setStroke(stroke);
    return label;
  }

  // Capital icons and labels
  if (type == 'Point' && properties.capital) {
    point.setImage(circle);
    if (resolution < map.getView().getResolutionForZoom(6)) {
      text.setText(properties.name);
      text.setFont('Italic 12px Open Sans');
      text.setOffsetY(-12);
      fill.setColor('#013');
      text.setFill(fill);
      stroke.setColor('white');
      stroke.setWidth(1);
      point.setText(text);
    } else {
      point.setText(null);
    }
    return point;
  }
};
//! [style]
//! [style-assign]
layer.setStyle(styleFunction);
//! [style-assign]
