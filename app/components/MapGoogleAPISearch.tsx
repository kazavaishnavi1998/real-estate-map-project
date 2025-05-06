"use client";

import React, { useState, useRef, useEffect } from "react";
import Map, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg";
const GOOGLE_GEOCODE_API_KEY = "AIzaSyBfYMOfTUjqZylAVHMtepQJDkCl81twYKg";
const GET_PROPERTIES = gql`
  query GetProperties($parcelId: String) {
    reonomyProperties(filter: { parcel_id: { eq: $parcelId } }) {
      items {
        address_line1
        commercial_units
        residential_units
      }
    }
  }
`;

const EXECUTE_GET_PARCEL = gql`
  query GetParcelByLocation($latitude: Float!, $longitude: Float!) {
    executeGetParcelByLocation(latitude: $latitude, longitude: $longitude) {
      id
    }
  }
`;

const MapGoogleAPISearchComponent = () => {
  const [marker, setMarker] = useState({
    latitude: 40.776676,
    longitude: -73.971321,
  });
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [showStreetViewDialog, setShowStreetViewDialog] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const { data: parcelData, loading, error } = useQuery(GET_PROPERTIES, {
    variables: { parcelId: selectedParcelId },
    skip: !selectedParcelId,
  });

  const [getParcelByLocation, { data: parcelByLocationData }] = useLazyQuery(EXECUTE_GET_PARCEL);

  useEffect(() => {
    console.log("parcelByLocationData", parcelByLocationData); 
    const parcelId = parcelByLocationData?.executeGetParcelByLocation?.[0]?.id;

    if (parcelId) {
      if (parcelId !== selectedParcelId) {
        setSelectedParcelId(parcelId);
      }
    } else {
      console.log("Parcel ID not found for the given location.");
      //alert("Parcel not found for this location.");
    }
  }, [parcelByLocationData]);

  const handleSearch = async () => {
    if (address.trim()) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${GOOGLE_GEOCODE_API_KEY}`
        );
        const data = await response.json();
        const result = data.results?.[0];

        if (result) {
          const { location } = result.geometry;
          console.log("Latitude:", location.lat, "Longitude:", location.lng); // Log lat/lng

          setMarker({ latitude: location.lat, longitude: location.lng });

          getParcelByLocation({
            variables: {
              latitude: location.lat,
              longitude: location.lng,
            },
          });

          mapRef.current?.flyTo({
            center: [location.lng, location.lat],
            essential: true,
          });

          setStreetViewUrl(
            `https://www.google.com/maps/embed/v1/streetview?key=${GOOGLE_GEOCODE_API_KEY}&location=${location.lat},${location.lng}&heading=210&pitch=10&fov=80`
          );
          

          setShowPopup(true);
        } else {
          alert("Address not found.");
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div style={{ width: "100%", position: "absolute", top: 10, left: "70%", zIndex: 1 }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search by address..."
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "10px",
            color: "white",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px",
            backgroundColor: "#0077FF",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Search
        </button>
      </div>

      {/* Map */}
      <Map
        initialViewState={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          zoom: 12,
        }}
        style={{ width: "75%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
      >
        <Marker latitude={marker.latitude} longitude={marker.longitude} anchor="bottom">
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Map Marker"
            style={{ width: "40px", height: "40px" }}
          />
        </Marker>

        {showPopup && selectedParcelId && (
          <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <div>
              <h4 style={{ margin: 0 }}>Parcel ID:</h4>
              <p style={{ fontSize: "14px" }}>{selectedParcelId}</p>
            </div>
          </Popup>
        )}
      </Map>
      {selectedParcelId && (
        <div
          style={{
            width: "25%",
            height: "100%",
            backgroundColor: "#fff",
            padding: "20px",
            overflowY: "auto",
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3>Parcel Information</h3>
          <p>
            <strong>Parcel ID:</strong> {selectedParcelId}
          </p>

          {loading ? (
            <p>Loading address...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error loading data</p>
          ) : (
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4>Building Information</h4>
              <p>
                <strong>Address:</strong>{" "}
                {parcelData?.reonomyProperties?.items?.[0]?.address_line1 || "N/A"}
              </p>
              <p>
          <strong>Commercial Units:</strong>{" "}
          {parcelData?.reonomyProperties?.items?.[0]?.commercial_units || "N/A"}
        </p>
        <p>
          <strong>Residential Units:</strong>{" "}
          {parcelData?.reonomyProperties?.items?.[0]?.residential_units || "N/A"}
        </p>
              
            </div>
          )}

          <button
            onClick={() => setShowStreetViewDialog(true)}
            style={{
              padding: "10px",
              backgroundColor: "#FF5733",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Street View
          </button>
        </div>
      )}
      {showStreetViewDialog && streetViewUrl && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h3>Street View</h3>
          <iframe
            src={streetViewUrl}
            width="100%"
            height="400px"
            frameBorder="0"
            style={{ borderRadius: "8px" }}
            allowFullScreen
          ></iframe>
          <button
            onClick={() => setShowStreetViewDialog(false)}
            style={{
              padding: "10px",
              backgroundColor: "#FF5733",
              color: "white",
              borderRadius: "8px",
              border: "none",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MapGoogleAPISearchComponent;