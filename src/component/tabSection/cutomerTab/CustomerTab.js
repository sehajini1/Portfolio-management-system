import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";
import MapBox from "./CustomerDetailsMap";
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from "../../../API";

export default function CustomerTab() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers,
    refetchInterval: 60000, 
  });
  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const customerData = Array.isArray(data) ? data : [];
  console.log(customerData)

  return (
    <CustomerDataWrapper>
    {customerData.length>0 ? (
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
        
           { customerData.map((customer, index) => (
              <CustomerDetailsCard
                sx={{
                  padding: "1rem",
                }}
                key={index}
                _id={customer._id}
                customerName={customer.customerName}
                latitude={customer.latitude}
                longitude={customer.longitude}
              />
            ))}
         
        </Box>
        <Box sx={{ width: "70%", height: "0vh" }}>
        <MapBox customers={customerData}/>
        </Box>
      </Box>
    ):(
      <Typography>No customer data available</Typography>
    )}
    </CustomerDataWrapper>
  );
}

const CustomerDataWrapper = styled.div`
/* height:"100vh" */
`;
