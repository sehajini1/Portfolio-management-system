import {
  Box
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import CustomerDetailsCard from "./CustomerDetailsCard";

const customerData = [
    { name: "John Perera", location: "Gampaha, Sri Lanka" },
    { name: "Jane Perera", location: "Colombo, Sri Lanka" },
    { name: "Smith Perera", location: "Kandy, Sri Lanka" },
  ];

export default function CustomerTab() {
  return (
    <CustomerDataWrapper>
      <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
      {customerData.map((customer, index) => (
          <CustomerDetailsCard
          sx={{
        padding: "1rem"
      }}
            key={index}
            name={customer.name}
            location={customer.location}
          />
        ))}
      </Box>
    </CustomerDataWrapper>
  );
}

const CustomerDataWrapper = styled.div``;
