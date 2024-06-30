import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function LocationDataTab() {
  return (
    <LocationDataWrapper>
      <Typography component="h1" variant="h5" sx={locationTextStyles}>
        Add the location details
      </Typography>
      <Box>
        <Box
          sx={{
            paddingBottom: "2rem",
            paddingTop: "0.5rem",
          }}
        >
          <TextField
            sx={{
              width: "22vw",
            }}
            variant="outlined"
            margin="normal"
            required
            id="customername"
            label="Customer name"
            name="customername"
            autoComplete="username"
            // placeholder="Enter your user name"
            //value={email}
            //error={emailError}
            //helperText={
            //  emailError && "Ingrese un correo electrónico válido"
            //}
            //onChange={handleEmailChange}
            FormHelperTextProps={{
              sx: {
                bottom: "-20px",
              },
            }}
            InputProps={{
              style: {
                color: "#174022",
              },
            }}
          />
        </Box>
      </Box>
    </LocationDataWrapper>
  );
}

const LocationDataWrapper = styled.div``;

const locationTextStyles = {
  color: "#174022",
  fontWeight: 600,
  fontSize: "1.1rem",
  margin: "2vw 0 1vw 0",
};
