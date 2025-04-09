"use client";

import React, { useState, useRef, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapLayerMouseEvent } from "mapbox-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg";

const MapParcelComponent = () => {
  const [marker, setMarker] = useState({
    latitude: 40.776676,
    longitude: -73.971321,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [parcelId, setParcelId] = useState(null);
  const mapRef = useRef<MapRef | null>(null);

  const handleMapClick = (event: MapLayerMouseEvent) => {

    setMarker({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });


    if (event.features && event.features.length > 0) {
      const parcelFeature = event.features[0];
      const clickedParcelId = parcelFeature.properties?.ID;

      if (clickedParcelId) {
        setParcelId(clickedParcelId);
      } else {
        setParcelId(null);
      }
    } else {
      setParcelId(null);
    }
    setShowPopup(true);
  };


  useEffect(() => {

  }, [parcelId]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: 40.776676,
          longitude: -73.971321,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
        interactiveLayerIds={["parcels-line-layer", "parcels-fill-layer"]}
        ref={mapRef}
      >

        <Source
          id="parcels"
          type="vector"
          url="mapbox://svayser.ae1mculr"
        >

          <Layer
            id="parcels-line-layer"
            type="line"
            source="parcels"
            source-layer="manhattan_staten_island_parce-7ng65o"
            paint={{
              "line-color": "#0077FF",
              "line-width": 2,
            }}
          />
          <Layer
            id="parcels-fill-layer"
            type="fill"
            source="parcels"
            source-layer="manhattan_staten_island_parce-7ng65o"
            paint={{
              "fill-color": "#FFEB3B",
              "fill-opacity": 0.3,
            }}
          />
        </Source>


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


        {showPopup && (
          <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <div style={{
              backgroundColor: '#1e1e1e',
              color: '#f0f0f0',
              padding: '10px',
              borderRadius: '8px',
              minWidth: '200px'
            }}>
              {parcelId && <h3 style={{ marginBottom: '5px' }}>Parcel Information</h3>}
              <h3 style={{ marginBottom: '5px' }}>Coordinates</h3>
              <p>Lat: {marker.latitude.toFixed(4)}</p>
              <p>Lon: {marker.longitude.toFixed(4)}</p>
              {parcelId && (
                <p><strong>Parcel ID:</strong> {parcelId}</p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapParcelComponent;
