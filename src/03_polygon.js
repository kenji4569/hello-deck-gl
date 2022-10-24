import React, { useState } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { PolygonLayer } from '@deck.gl/layers';

//  Import common definitions
import { INITIAL_VIEW_STATE, MAP_STYLE, DEFAULT_THEME, TOKYO } from './models';

// Import a simple control panel
import ControlPanel from './components/control-panel';

function rgb2hex (rgb) {
  return "#" + rgb.map(( value ) => {
    return ( "0" + value.toString( 16 ) ).slice( -2 ) ;
  } ).join( "" ) ;
}

export default function App() {
  const initialViewState = INITIAL_VIEW_STATE;
  const mapStyle = MAP_STYLE;
  const theme = DEFAULT_THEME;
  
  // If buildingColor is updated by setBuildingColor, this block is evaluated again
  const [buildingColor, setBuildingColor] = useState(theme.buildingColor)

  const changeBuildingColor = () => {
    const color = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255), 
      Math.floor(Math.random() * 255)
    ];
    setBuildingColor(color)
  }

  // Add polygon layers
  const r = 0.01
  const buildings = [{
    "height": 1000,
    "polygon": [
      [TOKYO[0] - r, TOKYO[1] - r],
      [TOKYO[0] + r, TOKYO[1] - r],
      [TOKYO[0] + r, TOKYO[1] + r],
      [TOKYO[0] - r, TOKYO[1] + r],
    ]
  }];

  const layers = [
    new PolygonLayer({
      id: 'buildings',
      data: buildings,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: f => f.polygon,
      getElevation: f => f.height,
      getFillColor: buildingColor,
      material: theme.material
    })
  ];
  
  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <ControlPanel 
        title={rgb2hex(buildingColor)} 
        action1Label={'Change color'}
        onAction1={changeBuildingColor} />
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true}>
      </StaticMap>
    </DeckGL>
  );
}

