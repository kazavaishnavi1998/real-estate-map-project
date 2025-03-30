"use client";
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

// Define the type for a marker
interface MarkerData {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const [isClient, setIsClient] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const markers: MarkerData[] = [
    { id: 1, latitude: 37.7749, longitude: -122.4194, title: 'San Francisco', description: 'A cool place to visit!' },
    { id: 2, latitude: 37.8044, longitude: -122.2711, title: 'Oakland', description: 'Nearby city!' },
  ];

  const mapboxToken = "pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg";

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Map
        {...viewport}
        mapboxAccessToken={mapboxToken}
        onMove={({ viewState }) => setViewport(viewState)}
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Render markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => setSelectedMarker(marker)}
          >
            {/* Pin icon */}
            <div style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}>
              📍
            </div>
          </Marker>
        ))}

        {/* Popup for selected marker */}
        {selectedMarker && (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            closeButton={true}
            onClose={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
