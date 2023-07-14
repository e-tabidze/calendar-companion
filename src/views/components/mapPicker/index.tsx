import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import { MAP_KEY } from 'src/env'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({
  accessToken: MAP_KEY
})

interface Props {
  height: string
  borderRadius: string
}

const MapPicker: React.FC<Props> = ({ height, borderRadius }) => {
  return (
    <Map
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        height: `${height}`,
        borderRadius: borderRadius
      }}
      center={[44.82646, 41.69951]}
    />
  )
}

export default MapPicker
