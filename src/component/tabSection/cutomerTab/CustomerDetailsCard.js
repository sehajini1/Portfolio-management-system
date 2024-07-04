import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateCustomerModal from "./updateCustomerDetails/UpdateCustomerDetails";
import { deleteMember } from "../../../API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CustomerDetailsCard({
  _id,
  customerName,
  latitude,
  longitude,
}) {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      handleCloseLogoutDialog();
      toast.warning("Selected member is deleted.");
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(_id);
    setOpenDeleteDialog(false);
  };

  const handleCustomerUpdate = () => {
    queryClient.invalidateQueries(["customers"]);
    toast.success("Customer updated successfully.");
  };

  return (
    <CustomerCardWrapper>
      <Card sx={{ maxWidth: "20vw", bgcolor: "#e6ffff" }}>
        <CardContent>
          <Typography gutterBottom component="div" sx={CustomerNameStyle}>
            {customerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Latitude: {latitude}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Longitude: {longitude}
          </Typography>
        </CardContent>
        {role === "admin" && (
          <CardActions sx={ButtonStyles}>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon sx={DeleteButtonStyle} />
            </IconButton>
            <Button sx={UpdateButtonStyles} size="small" onClick={handleOpen}>
              Update
            </Button>
          </CardActions>
        )}
      </Card>
      <UpdateCustomerModal
        open={open}
        handleClose={handleClose}
        customer={{ _id, customerName, latitude, longitude }}
        onUpdate={handleCustomerUpdate}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm the deletion of the customer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#008080",
            }}
            onClick={handleCloseLogoutDialog}
          >
            Cancel
          </Button>

          <Button
            sx={{
              color: "#008080",
            }}
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </CustomerCardWrapper>
  );
}

const CustomerCardWrapper = styled.div``;

const ButtonStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const UpdateButtonStyles = {
  backgroundColor: "#008080",
  width: "5vw",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
  borderRadius: "0.3rem",
  fontSize: "0.6rem",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#008080",
  },
};

const DeleteButtonStyle = {
  color: "#e60000",
};

const CustomerNameStyle = {
  fontSize: "0.8rem",
};
