import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import colormap from 'colormap';

const root =
  'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A';

const visualizations = [
  {
    name: 'True Color',
    sources: ['TCI'],
  },
  {
    name: 'False Color',
    sources: ['B08', 'B04', 'B03'],
    max: 5000,
  },
  {
    name: 'NDVI',
    sources: ['B04', 'B08'],
    max: 10000,
    style: {
      color: [
        'interpolate',
        ['linear'],
        ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]],
        ...getColorStops('earth', -0.5, 1, 10, true),
      ],
    },
  },
  {
    name: 'NDWI',
    sources: ['B03', 'B08'],
    max: 10000,
    style: {
      color: [
        'interpolate',
        ['linear'],
        ['/', ['-', ['band', 1], ['band', 2]], ['+', ['band', 1], ['band', 2]]],
        ...getColorStops('viridis', -1, 1, 10, true),
      ],
    },
  },
];

function createLayer(root, visualization) {
  const source = new GeoTIFF({
    sources: visualization.sources.map((id) => ({
      url: `${root}/${id}.tif`,
      max: visualization.max,
    })),
  });

  return new TileLayer({
    source: source,
    style: visualization.style,
  });
}

function getColorStops(name, min, max, steps, reverse) {
  const delta = (max - min) / (steps - 1);
  const stops = new Array(steps * 2);
  const colors = colormap({colormap: name, nshades: steps, format: 'rgba'});
  if (reverse) {
    colors.reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colors[i];
  }
  return stops;
}

const map = new Map({
  target: 'map-container',
});

const select = document.getElementById('visualization');
visualizations.forEach((visualization) => {
  const option = document.createElement('option');
  option.textContent = visualization.name;
  select.appendChild(option);
});

function updateVisualization() {
  const visualization = visualizations[select.selectedIndex];
  map.getLayers().clear();

  const layer = createLayer(root, visualization);
  map.addLayer(layer);
  map.setView(layer.getSource().getView());
}

select.addEventListener('change', updateVisualization);
updateVisualization();
