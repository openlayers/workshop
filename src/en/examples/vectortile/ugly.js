import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import MVTFormat from 'ol/format/mvt';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import tilegrid from 'ol/tilegrid';
//! [popup-import]
import Overlay from 'ol/overlay';
//! [popup-import]
//! [style-import]
import Style from 'ol/style/style';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import RegularShapeStyle from 'ol/style/regularshape';
import TextStyle from 'ol/style/text';
//! [style-import]

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
    url: 'https://free-{1-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=lirfd6Fegsjkvs0lshxe',
    tileGrid: new tilegrid.createXYZ({
      maxZoom: 14,
      tileSize: 512
    })
  })
});
map.addLayer(layer);

//! [popup]
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
//! [popup]

//! [style]
const fill = new FillStyle();
const stroke = new StrokeStyle();
var text = new TextStyle();
const city = new RegularShapeStyle({
  radius: 5,
  points: 4,
  fill: new FillStyle({
    color: 'black'
  }),
  stroke: new StrokeStyle({
    color: 'gray',
    width: 1
  })
});
const polygon = new Style();
const line = new Style();
const label = new Style({
  text: text
});
const icon = new Style();
const styleFunction = function(feature, resolution) {
  var properties = feature.getProperties();
  var geometry = feature.getGeometry();
  var type = geometry.getType();
  if (type == 'Polygon' && properties.layer == 'water') {
    fill.setColor('rgba(0, 0, 255, 0.7)');
    polygon.setFill(fill);
    polygon.setStroke(null);
    return polygon;
  }
  if ((type == 'LineString' || type == 'MultiLineString') &&
      properties.layer == 'boundary' &&
      properties.admin_level == 2) {
    stroke.setColor('gray');
    stroke.setWidth(1);
    line.setStroke(stroke);
    return line;
  }
  if (type == 'Point' && properties.class == 'continent') {
    text.setText(properties.name);
    text.setFont('bold 16px sans-serif');
    fill.setColor('black');
    text.setFill(fill);
    stroke.setColor('white');
    stroke.setWidth(1);
    text.setStroke(stroke);
    return label;
  }
  if (type == 'Point' && properties.class == 'country' &&
      resolution < map.getView().getResolutionForZoom(5)) {
    text.setText(properties.name);
    text.setFont('normal 13px sans-serif');
    text.setOffsetY(0);
    fill.setColor('black');
    text.setFill(fill);
    stroke.setColor('white');
    stroke.setWidth(1);
    text.setStroke(stroke);
    return label;
  }
  if (type == 'Point' && properties.capital) {
    icon.setImage(city);
    if (resolution < map.getView().getResolutionForZoom(6)) {
      text.setText(properties.name);
      text.setFont('italic 12px sans-serif');
      text.setOffsetY(-12);
      fill.setColor('#013');
      text.setFill(fill);
      stroke.setColor('white');
      stroke.setWidth(1);
      icon.setText(text);
    } else {
      icon.setText(null);
    }
    return icon;
  }
};
layer.setStyle(styleFunction);
//! [style]
