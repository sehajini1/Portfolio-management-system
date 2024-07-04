import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { environment } from "../../../enviroments/EnvDev";
import styled from "styled-components";

mapboxgl.accessToken = environment.mapbox.accessToken;

export default function CustomerDetailsMap({ customers }) {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng] = useState(80.6337);
  const [lat] = useState(7.8731);
  const [zoom] = useState(2);

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add our navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Map onload event
    map.current.on("load", () => {
      // Nifty code to force map to fit inside container when it loads
      map.current.resize();

      map.current.addSource("customers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: customers.map((customer) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [customer.longitude, customer.latitude],
            },
            properties: {
              id: customer.id,
              name: customer.customerName,
            },
          })),
        },
      });

      map.current.addLayer({
        id: "customers-layer",
        type: "circle",
        source: "customers",
        paint: {
          "circle-radius": 4,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.current.on("mouseenter", "customers-layer", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // build our popup html with our geoJSON properties
        const popupHtml = `<strong>${properties.name}</strong>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(popupHtml).addTo(map.current);
      });
      // Whe the cursor moves off the layer we remove the cursor
      map.current.on("mouseleave", "customers-layer", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, [lat, lng, zoom, customers]);
  return <MapWrapper ref={mapContainerRef} />;
}

const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
