"use client";

import React, { useState, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapLayerMouseEvent } from "mapbox-gl"; 

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg";

const MapComponent = () => {
  const [marker, setMarker] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const [showPopup, setShowPopup] = useState(false); // To control the popup visibility
  const mapRef = useRef(null);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setMarker({ latitude: lat, longitude: lng });
    setShowPopup(true); // Show the popup when the map is clicked
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: 37.7749,
          longitude: -122.4194,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
        ref={mapRef}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="bottom"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Map Marker"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </Marker>

        {/* Popup to show latitude and longitude */}
        {showPopup && (
          <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)} // Close popup when clicked
          >
            <div>
              <h3>Coordinates</h3>
              <p>Lat: {marker.latitude.toFixed(4)}</p>
              <p>Lon: {marker.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;











/*
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';


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
    
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => setSelectedMarker(marker)}
          >
          
            <div style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}>
              📍
            </div>
          </Marker>
        ))}

      
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
*/