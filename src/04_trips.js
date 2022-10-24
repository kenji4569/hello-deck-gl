/* global window */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StaticMap, Marker } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { TripsLayer } from '@deck.gl/geo-layers';

//  Import common definitions
import { INITIAL_VIEW_STATE, DEFAULT_THEME, TOKYO, MAPBOX_API_KEY, MAPBOX_STYLES } from './models';

// Import a simple control panel
import ControlPanel from './components/control-panel';


const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const MAPBOX_KEY = params.mapbox_key

export default function App() {
  // Animate
  const loopLength = 400; // unit corresponds to the timestamp in source data
  const animationSpeed = 1;

  // If time is updated by setTime, this block is evaluated again
  // you can check it by putting console.log(time) here
  const [time, setTime] = useState(0);
  
  // A mutable object inside this block
  const animationId = useRef(0);

  const animate = () => {
    // Update time
    setTime(t => (t + animationSpeed) % loopLength);

    // Invoke animate at the next frame
    animationId.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Invoked at the first time

    // Invoke animate at the next frame
    animationId.current = window.requestAnimationFrame(animate);

    // Invoked at the end time
    return () => window.cancelAnimationFrame(animationId.current);
  }, []);

  const initialViewState = INITIAL_VIEW_STATE;
  const theme = DEFAULT_THEME;
  
  const r = 0.01
  // Add trips layer
  const trips = [{
    vendor: 0,
    path: [
      [TOKYO[0], TOKYO[1]],
      [TOKYO[0] + r, TOKYO[1]],
      [TOKYO[0] + r, TOKYO[1] + r],
      [TOKYO[0], TOKYO[1] + r],
    ],
    timestamps: [ 0, 100, 200, 300]
  }, {
    vendor: 1,
    path: [
      [TOKYO[0], TOKYO[1]],
      [TOKYO[0] - r, TOKYO[1]],
      [TOKYO[0] - r, TOKYO[1] - r],
      [TOKYO[0], TOKYO[1] - r],
    ],
    timestamps: [ 100, 200, 300, 400]
  }]

  const trailLength = 180

  const layers = [
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: d => d.path,
      getTimestamps: d => d.timestamps,
      getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,

      shadowEnabled: false
    }),
  ];

  // If buildingColor is updated by setBuildingColor, this block is evaluated again
  const [mapStyleIndex, setMapStyleIndex] = useState(0);

  // useCallback memoize the function for performance
  const changeMapStyle = useCallback(() => {
    let nextMapboxStyleIndex = (mapStyleIndex + 1) % MAPBOX_STYLES.length
    setMapStyleIndex(nextMapboxStyleIndex)
  }, [mapStyleIndex])

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <ControlPanel 
        title={MAPBOX_STYLES[mapStyleIndex] ? MAPBOX_STYLES[mapStyleIndex].split('/').slice(-1)[0] : 'default'} 
        action1Label={'Change map style'}
        onAction1={changeMapStyle} />
      <StaticMap 
        reuseMaps
        mapboxApiAccessToken={MAPBOX_KEY}
        mapStyle={MAPBOX_STYLES[mapStyleIndex]}
        mapOptions={{
          antialias: true
        }}
       >
        <Marker longitude={TOKYO[0]} latitude={TOKYO[1]} offsetLeft={-20} offsetTop={-10}>
          <div>Hello</div>
        </Marker>
      </StaticMap>
    </DeckGL>
  );
}