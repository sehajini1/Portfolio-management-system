import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateCustomerModal from "./updateCustomerDetails/UpdateCustomerDetails";

export default function CustomerDetailsCard({ _id,customerName, latitude,longitude }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <CustomerCardWrapper>
      <Card sx={{ maxWidth: "20vw", bgcolor: "#e6ffff" }}>
        {/* <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={CustomerMap}
          /> */}
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
        <CardActions
            sx={ButtonStyles}
        >
          <IconButton aria-label="delete">
            <DeleteIcon sx={DeleteButtonStyle}/>
          </IconButton>
          <Button sx={UpdateButtonStyles} size="small" onClick={handleOpen}>
            Update
          </Button>
        </CardActions>
      </Card>
      <UpdateCustomerModal open={open} handleClose={handleClose} customer={{ _id, customerName, latitude,longitude }} />
    </CustomerCardWrapper>
  );
}

const CustomerCardWrapper = styled.div``;

const ButtonStyles ={
    display:"flex",
    justifyContent:"space-between"
}

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

const DeleteButtonStyle={
    color:"#e60000",
};

const CustomerNameStyle={
  fontSize:"0.8rem"
};
