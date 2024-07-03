import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";
import MapBox from "./CustomerDetailsMap";
import { useQuery } from "@tanstack/react-query";
import { getAllMembers } from "../../../API";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomerTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["members"],
    queryFn: getAllMembers,
    refetchInterval: 60000,
  });
  console.log(data);

  const MAX_CARDS_WITHOUT_SCROLL = 3;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const customerData = Array.isArray(data) ? data : [];
  console.log(customerData);

  const filteredCustomers = customerData.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerHeight =
    customerData.length > MAX_CARDS_WITHOUT_SCROLL
      ? "75vh" // Fixed height when scrolling is needed
      : "auto"; // Auto height when all cards can fit without scrolling

  

  return (
    <CustomerDataWrapper>
      {customerData.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "100%",
            height: containerHeight,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "30%",
              height: containerHeight,
              overflowY:
                customerData.length > MAX_CARDS_WITHOUT_SCROLL
                  ? "auto"
                  : "visible",
              padding: "0.5rem",
            }}
          >
            {/* <SearchBar /> */}

            {customerData.map((customer, index) => (
              <CustomerDetailsCard
                sx={{
                  padding: "1rem",
                  flexShrink: 0,
                }}
                key={index}
                _id={customer._id}
                customerName={customer.customerName}
                latitude={customer.latitude}
                longitude={customer.longitude}
              />
            ))}
          </Box>
          <Box sx={{ width: "70%", height: containerHeight }}>
            <MapBox customers={customerData} />
          </Box>
        </Box>
      ) : (
        <Typography>No customer data available</Typography>
      )}
    </CustomerDataWrapper>
  );
}

const CustomerDataWrapper = styled.div`
  /* height:"100vh" */
`;
