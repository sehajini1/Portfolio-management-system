import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AddMapComponent from "./AddLocationDataMap";
import { addLocation } from "../../../API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function LocationDataTab() {
  const [customerName, setCustomerName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const role = localStorage.getItem("role");

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
      toast.success("Location added successfully!");
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`);
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
      {role === "admin" ? (
        <>
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
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                FormHelperTextProps={{
                  sx: {
                    bottom: "-20px",
                  },
                }}
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
                FormHelperTextProps={{
                  sx: {
                    bottom: "-20px",
                  },
                }}
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
                FormHelperTextProps={{
                  sx: {
                    bottom: "-20px",
                  },
                }}
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
        </>
      ) : (
        <Typography sx={{ color: "red", fontSize: "1rem" }}>
          You cannot access add a customer.
        </Typography>
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
