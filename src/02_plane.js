import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';

//  Import common definitions
import { INITIAL_VIEW_STATE, MAP_STYLE, DEFAULT_THEME } from './models';

export default function App() {
  const initialViewState = { ...INITIAL_VIEW_STATE, zoom: 5 };
  const mapStyle = MAP_STYLE;
  const theme = DEFAULT_THEME;
  const layers = [];

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}