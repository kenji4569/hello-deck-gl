import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';

export const TOKYO = [139.76742520741126, 35.681114193258104];

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

export const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

export const DEFAULT_THEME = {
  buildingColor: [255, 0, 0],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

export const INITIAL_VIEW_STATE = {
  longitude: TOKYO[0],
  latitude: TOKYO[1],
  zoom: 13,
  pitch: 45,
  bearing: 0
};

export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

export const MAPBOX_STYLES = [
  undefined,  // for default
  'mapbox://styles/mapbox/streets-v11',
  'mapbox://styles/mapbox/outdoors-v11',
  'mapbox://styles/mapbox/light-v10',
  'mapbox://styles/mapbox/dark-v10',
  'mapbox://styles/mapbox/satellite-v9',
  'mapbox://styles/mapbox/satellite-streets-v11',
  'mapbox://styles/mapbox/navigation-day-v1',
  'mapbox://styles/mapbox/navigation-night-v1',
];