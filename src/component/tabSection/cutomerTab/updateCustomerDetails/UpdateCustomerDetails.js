import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { updateMember } from "../../../../API";
import Map, { Marker } from "react-map-gl";

//const MAPBOX_TOKEN = 'your_mapbox_token'; // Replace with your Mapbox token

export default function UpdateCustomerModal({ open, handleClose, customer, onUpdate  }) {
  const [name, setName] = useState(customer.name);
  const [location, setLocation] = useState(customer.location);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    setName(customer.customerName);
    setLatitude(customer.latitude);
    setLongitude(customer.longitude);
  }, [customer]);

  const handleMapClick = (event) => {
    const [lng, lat] = event.lngLat;
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        customerName: name,
        latitude,
        longitude
      };
      await updateMember(customer.id, updatedData);
      onUpdate(); // Callback to refetch data in parent component
      handleClose();
    } catch (error) {
      console.error('Error updating customer:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  console.log(customer)
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
          value={customer.name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Latitude"
          type="text"
          fullWidth
          value={customer.latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Longitude"
          type="text"
          fullWidth
          value={customer.longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <Box
          sx={{
            height: "30vh",
            marginTop: "1rem",
            border: "0.1rem solid #b3b3b3",
            borderRadius: "0.3rem",
          }}
        >
          
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
            handleUpdate();
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
