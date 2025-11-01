"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      zoomControl: true,
    }),
    []
  );

  const fetchNearbyHospitals = useCallback(
    (map, position) => {
      if (!google.maps.places) {
        console.warn("Places library not yet loaded.");
        return;
      }

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        { location: position, radius: 5000, type: "hospital" },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const hospitalData = results.map((r) => ({
              id:r.place_id,
              name:r.name,
              position: {
                lat: r.geometry.location.lat(),
                lng:r.geometry.location.lng(),
              },
            }));
            setHospitals(hospitalData);
          } else {
            console.warn("Places search failed:", status);
          }
        }
      );
    },
    []
  );

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (currentPosition) fetchNearbyHospitals(map, currentPosition);
    },
    [currentPosition, fetchNearbyHospitals]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.log("Error getting location:", err);
          
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;
  if (!currentPosition) return <div>Getting your location...</div>;

  return (
    <div className="flex justify-center">
      <GoogleMap
        zoom={13}
        center={currentPosition}
        mapContainerStyle={{ width: "100%", height: "500px", borderRadius: "12px" }}
        options={options}
        onLoad={onLoad}
      >
        <Marker position={currentPosition} title="You are here" />
        {hospitals.map((h) => (
          <Marker key={h.id} position={h.position} title={h.name} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
