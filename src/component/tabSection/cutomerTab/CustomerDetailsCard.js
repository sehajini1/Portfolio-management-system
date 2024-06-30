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
import UpdateCustomerModal from "./UpdateCustomerDetails";

export default function CustomerDetailsCard({ name, location }) {
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
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
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
      <UpdateCustomerModal open={open} handleClose={handleClose} customer={{ name, location }} />
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
}
