import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AddMapComponent from "./AddLocationDataMap";
import { addLocation } from "../../../API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LocationDataTab() {
  const [customerName, setCustomerName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const queryClient = useQueryClient();

  const addLocationMutation = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      // Reset form fields
      setCustomerName("");
      setLatitude("");
      setLongitude("");
    },
  });

  const handleLocationSelect = (lat, lng) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLocationMutation.mutate({
      customerName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  };

  return (
    <LocationDataWrapper>
      <Typography component="h1" variant="h5" sx={locationTextStyles}>
        Add the location details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
            autoComplete="customername"
            // placeholder="Enter your user name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
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
            // InputProps={{
            //   style: {
            //     color: "#174022",
            //   },
            // }}
          />
          <Typography sx={{ fontSize: "0.8rem", marginTop: "3vh" }}>
            Select your location using the map
          </Typography>

          <TextField
            sx={{ width: "22vw", marginTop: "1rem" }}
            variant="outlined"
            margin="normal"
            required
            disabled
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            FormHelperTextProps={{
              sx: {
                bottom: "-20px",
              },
            }}
            // InputProps={{
            //   style: {
            //     color: "#174022",
            //   },
            // }}
          />

          <TextField
            sx={{ width: "22vw", marginTop: "1rem" }}
            variant="outlined"
            margin="normal"
            disabled
            required
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            FormHelperTextProps={{
              sx: {
                bottom: "-20px",
              },
            }}
            // InputProps={{
            //   style: {
            //     color: "#174022",
            //   },
            // }}
          />
        </Box>
        <Box sx={{ marginTop: "1rem", width: "100%" }}>
          <AddMapComponent onLocationSelect={handleLocationSelect} />
        </Box>
      </Box>
      <Button
        type="submit"
        onClick={handleSubmit}
        sx={AddButtonStyles}
        disabled={addLocationMutation.isLoading}
      >
        {addLocationMutation.isLoading ? "Adding..." : "Add Location"}
      </Button>
      {addLocationMutation.isError && (
        <Typography color="error">
          An error occurred: {addLocationMutation.error.message}
        </Typography>
      )}
      {addLocationMutation.isSuccess && (
        <Typography color="success">Location added successfully!</Typography>
      )}
    </LocationDataWrapper>
  );
}

const LocationDataWrapper = styled.div``;

const locationTextStyles = {
  color: "#174022",
  fontWeight: 600,
  fontSize: "1.1rem",
  margin: "0 0 1vw 0",
};

const AddButtonStyles = {
  backgroundColor: "#008080",
  width: "22vw",
  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  borderRadius: "1rem",
  fontSize: "0.8rem",
  color: "#ffffff",
  padding: "0.7rem 3rem",
  "&:hover": {
    backgroundColor: "#0C9E9E",
  },
};
