import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
//import Map, { Marker } from "react-map-gl";

//const MAPBOX_TOKEN = 'your_mapbox_token'; // Replace with your Mapbox token

export default function UpdateCustomerModal({ open, handleClose, customer }) {
  const [name, setName] = useState(customer.name);
  const [location, setLocation] = useState(customer.location);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleMapClick = (event) => {
    const [lng, lat] = event.lngLat;
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ padding: "2rem 7rem 1rem 7rem" }}>
        Update Customer Details
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Customer Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setName(e.target.value)}
        />
        <Box
          sx={{
            height: "30vh",
            marginTop: "1rem",
            border: "0.1rem solid #b3b3b3",
            borderRadius: "0.3rem",
          }}
        >
          {/* <Map
            initialViewState={{
              latitude: 37.8,
              longitude: -122.4,
              zoom: 14,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onClick={handleMapClick}
          >
            {latitude && longitude && (
              <Marker longitude={longitude} latitude={latitude} color="red" />
            )}
          </Map> */}
        </Box>
      </DialogContent>
      <DialogActions
      sx={UpdateButtonWrapper}
      >
        <Button sx={UpdateButtonStyles} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          sx={UpdateButtonStyles}
          onClick={() => {
            handleClose();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const UpdateButtonWrapper={
    paddingRight:"1.7vw"
}

const UpdateButtonStyles = {
  backgroundColor: "#008080",
  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  borderRadius: "1rem",
  fontSize: "0.8rem",
  color: "#ffffff",
  padding:"0.7rem 3rem",
  "&:hover": {
    backgroundColor: "#0C9E9E",
  },
  margin: "0.3vw 0",
};
