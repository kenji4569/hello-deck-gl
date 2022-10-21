/* global window */
import React, { useState } from 'react';
import { render } from 'react-dom';
import OriginalApp from './src/01_original';
import PlaneApp from './src/02_plane';
import PolygonApp from './src/03_polygon';
import TripsApp from './src/04_trips';

export default function App() {
  const [appName, setAppName] = useState(null)
  return (
    <div>
      <div style={{ height: '5vh', width: '100vw', position: 'relative', display: 'flex', justifyContent: 'space-around',
    alignItems: 'center' }}>
        <button onClick={() => {setAppName('01_original')}}><text>01_original</text></button>
        <button onClick={() => {setAppName('02_plane')}}><text>02_plane</text></button>
        <button onClick={() => {setAppName('03_polygon')}}><text>03_polygon</text></button>
        <button onClick={() => {setAppName('04_trips')}}><text>04_trips</text></button>
      </div>
      <div style={{ height: '95vh', width: '100vw', position: 'relative' }}>
        {appName === '01_original' ? <OriginalApp /> : null}
        {appName === '02_plane' ? <PlaneApp /> : null}
        {appName === '03_polygon' ? <PolygonApp /> : null}
        {appName === '04_trips' ? <TripsApp /> : null}
      </div>
    </div>)
}

export function renderToDOM(container) {
  render(<App />, container);
}