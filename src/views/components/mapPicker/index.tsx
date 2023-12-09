import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { MAP_KEY } from 'src/env';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: MAP_KEY
});

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  markerCoordinates?: [number, number];
}

const MapPicker: React.FC<Props> = ({ className, width, height, borderRadius, markerCoordinates }) => {
  const defaultCoordinates = [44.82646, 41.69951];

  // Check if markerCoordinates are valid, otherwise use defaultCoordinates
  const coordinates = markerCoordinates && !isNaN(markerCoordinates[0]) && !isNaN(markerCoordinates[1])
    ? markerCoordinates
    : defaultCoordinates;

  return (
    <Map
      className={className}
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        width: `${width}`,
        height: `${height}`,
        borderRadius: borderRadius
      }}
      center={coordinates}
    >
      {/* Add a Layer and Feature for the marker */}
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={coordinates} />
      </Layer>
    </Map>
  );
};

export default MapPicker;
