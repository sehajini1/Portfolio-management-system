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
import AddLocationDataMap from "../../locationTab/AddLocationDataMap";


export default function UpdateCustomerModal({open,handleClose,customer,onUpdate,}) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.customerName || "");
      setLatitude(customer.latitude || "");
      setLongitude(customer.longitude || "");
    }
  }, [customer]);

  const handleLocationSelect = (lat, lng) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  }

  const handleUpdate = async () => {
    setError("");
    try {
      const updatedData = {
        customerName: name,
        latitude: latitude,
        longitude: longitude,
      };
      await updateMember(customer._id, updatedData);
      console.log("kaka")
      onUpdate(); // Callback to refetch data in parent component
      console.log("lalal")
      handleClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Failed to update customer.Please try again");
    }
  };
  console.log(customer);
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
          label="Latitude"
          type="text"
          fullWidth
          disabled
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Longitude"
          type="text"
          fullWidth
          disabled
          value={longitude}
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
          <AddLocationDataMap 
  onLocationSelect={handleLocationSelect}
  initialLat={parseFloat(customer?.latitude)}
  initialLng={parseFloat(customer?.longitude)}
/>
        </Box>
      </DialogContent>
      <DialogActions sx={UpdateButtonWrapper}>
        <Button sx={UpdateButtonStyles} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={UpdateButtonStyles} onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const UpdateButtonWrapper = {
  paddingRight: "1.7vw",
};

const UpdateButtonStyles = {
  backgroundColor: "#008080",
  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  borderRadius: "1rem",
  fontSize: "0.8rem",
  color: "#ffffff",
  padding: "0.7rem 3rem",
  "&:hover": {
    backgroundColor: "#0C9E9E",
  },
  margin: "0.3vw 0",
};
