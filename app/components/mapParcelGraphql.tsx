"use client";

import React, { useState, useRef } from "react";
import Map, { Marker, Popup, Source, Layer, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapLayerMouseEvent } from "mapbox-gl";
import { gql, useQuery } from "@apollo/client";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg";

const GET_PROPERTIES = gql`
  query MyQuery {
    reonomyProperties {
      items {
        parcel_id
        year_built
        year_renovated
        floors
        sum_buildings_nbr
        existing_floor_area_ratio
        commercial_units
        residential_units
        total_units
        building_area
        max_floor_plate
        building_class
        frontage
        depth
        asset_type
        lot_size_sqft
        lot_size_acres
        zoning
        lot_size_depth_feet
        lot_size_frontage_feet
        census_tract
        opp_zone
        msa_name
        fips_county
        municipality
        mcd_name
        neighborhood_name
        legal_description
        zoning_district_1
        zoning_district_2
        special_purpose_district
        split_boundary
        sanborn_map_number
        zoning_map_number
      }
    }
  }
`;

const formatBoolean = (value: any) => (value ? "Yes" : "No");

const MapParcelComponent = () => {
  const [marker, setMarker] = useState({
    latitude: 40.776676,
    longitude: -73.971321,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const mapRef = useRef<MapRef | null>(null);

  const { data, loading, error } = useQuery(GET_PROPERTIES);

  const parcelData = data?.reonomyProperties?.items?.find(
    (item: any) => item.parcel_id === selectedParcelId
  );

  const handleMapClick = (event: MapLayerMouseEvent) => {
    setMarker({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });

    const parcelFeature = event.features?.[0];
    const clickedParcelId = parcelFeature?.properties?.ID;
    setSelectedParcelId(clickedParcelId || null);
    setIsSidebarVisible(true); 
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: 40.776676,
          longitude: -73.971321,
          zoom: 12,
        }}
        style={{ width: "75%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
        interactiveLayerIds={["parcels-line-layer", "parcels-fill-layer"]}
        ref={mapRef}
      >
        <Source id="parcels" type="vector" url="mapbox://svayser.ae1mculr">
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
            <div
              style={{
                backgroundColor: "#1e1e1e",
                color: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
                minWidth: "250px",
              }}
            >
              <h3>Coordinates</h3>
              <p>Lat: {marker.latitude.toFixed(4)}</p>
              <p>Lon: {marker.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        )}
      </Map>

      {isSidebarVisible && (
        <div
          style={{
            width: "25%",
            height: "100%",
            backgroundColor: "#fff",
            color: "#333",
            padding: "20px",
            overflowY: "auto",
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Parcel Information</h3>

          {loading && <p>Loading parcel info...</p>}
          {error && <p style={{ color: "red" }}>Error loading data</p>}

          {parcelData ? (
            <>
            
              <div
                style={{
                  marginBottom: "20px", 
                  padding: "15px", 
                  backgroundColor: "#f9f9f9", 
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Building Information</h4>
                <p><strong>Year Built:</strong> {parcelData.year_built ?? "N/A"}</p>
                <p><strong>Year Renovated:</strong> {parcelData.year_renovated ?? "N/A"}</p>
                <p><strong>Stories:</strong> {parcelData.floors ?? "N/A"}</p>
                <p><strong>Number of Buildings:</strong> {parcelData.sum_buildings_nbr ?? "N/A"}</p>
                <p><strong>Existing Floor Area Ratio:</strong> {parcelData.existing_floor_area_ratio ?? "N/A"}</p>
                <p><strong>Commercial Units:</strong> {parcelData.commercial_units ?? "N/A"}</p>
                <p><strong>Residential Units:</strong> {parcelData.residential_units ?? "N/A"}</p>
                <p><strong>Total Units:</strong> {parcelData.total_units ?? "N/A"}</p>
                <p><strong>Building Area:</strong> {parcelData.building_area ?? "N/A"} sf</p>
                <p><strong>Max Floor Plate:</strong> {parcelData.max_floor_plate ?? "N/A"} sf</p>
                <p><strong>Building Class:</strong> {parcelData.building_class ?? "N/A"}</p>
                <p><strong>Frontage:</strong> {parcelData.frontage ?? "N/A"} sf</p>
                <p><strong>Depth:</strong> {parcelData.depth ?? "N/A"} sf</p>
              </div>

            
              <div
                style={{
                  marginBottom: "20px", 
                  padding: "15px", 
                  backgroundColor: "#f9f9f9", 
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Lot Information</h4>
                <p><strong>Property Type:</strong> {parcelData.asset_type ?? "N/A"}</p>
                <p><strong>Lot Area (SF):</strong> {parcelData.lot_size_sqft ?? "N/A"} sf</p>
                <p><strong>Lot Area (Acres):</strong> {parcelData.lot_size_acres ?? "N/A"} acres</p>
                <p><strong>Zoning:</strong> {parcelData.zoning ?? "N/A"}</p>
                <p><strong>Lot Depth:</strong> {parcelData.lot_size_depth_feet ?? "N/A"} ft</p>
                <p><strong>Lot Frontage:</strong> {parcelData.lot_size_frontage_feet ?? "N/A"} ft</p>
                <p><strong>Census Tract:</strong> {parcelData.census_tract ?? "N/A"}</p>
                <p><strong>Opportunity Zone:</strong> {formatBoolean(parcelData.opp_zone)}</p>
              </div>

             
              <div
                style={{
                  marginBottom: "20px", 
                  padding: "15px", 
                  backgroundColor: "#f9f9f9", 
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Location Information</h4>
                <p><strong>Metropolitan Statistical Area:</strong> {parcelData.msa_name ?? "N/A"}</p>
                <p><strong>County:</strong> {parcelData.fips_county ?? "N/A"}</p>
                <p><strong>Municipality:</strong> {parcelData.municipality ?? "N/A"}</p>
                <p><strong>Minor Civil Division:</strong> {parcelData.mcd_name ?? "N/A"}</p>
                <p><strong>Neighborhood:</strong> {parcelData.neighborhood_name ?? "N/A"}</p>
                <p><strong>Legal:</strong> {parcelData.legal_description ?? "N/A"}</p>
              </div>

              
              <div
                style={{
                  marginBottom: "20px", 
                  padding: "15px", 
                  backgroundColor: "#f9f9f9", 
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Zoning Information</h4>
                <p><strong>Zoning District 1:</strong> {parcelData.zoning_district_1 ?? "N/A"}</p>
                <p><strong>Zoning District 2:</strong> {parcelData.zoning_district_2 ?? "N/A"}</p>
                <p><strong>Special Purpose District:</strong> {parcelData.special_purpose_district ?? "N/A"}</p>
                <p><strong>Split Boundary:</strong> {formatBoolean(parcelData.split_boundary)}</p>
                <p><strong>Sanborn Map #:</strong> {parcelData.sanborn_map_number ?? "N/A"}</p>
                <p><strong>Zoning Map #:</strong> {parcelData.zoning_map_number ?? "N/A"}</p>
              </div>
            </>
          ) : (
            <p>No data found for this parcel.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MapParcelComponent;
