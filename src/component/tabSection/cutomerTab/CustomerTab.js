import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";
import MapBox from "./CustomerDetailsMap";
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from "../../../API";

// const customerData = [
//   { name: "John Perera", location: "Gampaha, Sri Lanka" },
//   { name: "Jane Perera", location: "Colombo, Sri Lanka" },
//   { name: "Smith Perera", location: "Kandy, Sri Lanka" },
// ];

export default function CustomerTab() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers,
    refetchInterval: 60000, // Refetch every 60 seconds
  });
  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const customerData = Array.isArray(data) ? data : [];
  console.log(customerData)

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
          {customerData.length > 0 ? (
            customerData.map((customer, index) => (
              <CustomerDetailsCard
                sx={{
                  padding: "1rem",
                }}
                key={index}
                name={customer.customerName}
                location={customer.location}
              />
            ))
          ) : (
            <></>
            //<Typography>No customer data available</Typography>
          )}
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
