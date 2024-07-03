import React, { useState, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import { environment } from '../../../enviroments/EnvDev';

mapboxgl.accessToken = environment.mapbox.accessToken;

export default function AddMapComponent({ onLocationSelect }) {
  const [viewState, setViewState] = useState({
    longitude: 80.6337,
    latitude: 7.8731,
    zoom: 3
  });
  const [marker, setMarker] = useState(null);

  const handleClick = useCallback((event) => {
    const { lngLat } = event;
    setMarker(lngLat);
    onLocationSelect(lngLat.lat, lngLat.lng);
  }, [onLocationSelect]);

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={mapboxgl.accessToken}
      onClick={handleClick}
    >
      {marker && (
        <Marker longitude={marker.lng} latitude={marker.lat} color="red" />
      )}
    </Map>
  );
}
