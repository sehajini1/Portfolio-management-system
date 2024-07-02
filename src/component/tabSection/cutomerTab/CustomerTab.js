import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";
import Map from "react-map-gl";
import MapBox from "./CustomerDetailsMap";

const customerData = [
  { name: "John Perera", location: "Gampaha, Sri Lanka" },
  { name: "Jane Perera", location: "Colombo, Sri Lanka" },
  { name: "Smith Perera", location: "Kandy, Sri Lanka" },
];

export default function CustomerTab() {
  return (
    <CustomerDataWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          width:"100%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "30%",
            overflowY: "auto",
          }}
        >
          {customerData.map((customer, index) => (
            <CustomerDetailsCard
              sx={{
                padding: "1rem",
              }}
              key={index}
              name={customer.name}
              location={customer.location}
            />
          ))}
        </Box>
        <Box sx={{ width: "70%", height: "0vh" }}>
        <MapBox/>
          {/* <Map
            initialViewState={{
              longitude: 80.6337,
              latitude: 7.8731,
              zoom: 6,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1Ijoic2VoYWppbmkiLCJhIjoiY2x5MzFkZHJ6MDM5MzJrcjA1MGluNm8zcyJ9.MA91cBKhh_5lyrCs4iLVgQ"
          /> */}
        </Box>
      </Box>
    </CustomerDataWrapper>
  );
}

const CustomerDataWrapper = styled.div`
/* height:"100vh" */
`;
