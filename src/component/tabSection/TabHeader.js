import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomerTab from "./cutomerTab/CustomerTab";
import LocationDataTab from "./locationTab/LocationDataTab";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setOpenLogoutDialog(false);
    navigate("/");
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static" sx={{ bgcolor: "#008080" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Location Data" {...a11yProps(0)} />
          <Tab label="Customers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <CustomTabPanel value={value} index={0}>
        <CustomerTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LocationDataTab />
      </CustomTabPanel>
      <Fab
        color="primary"
        aria-label="logout"
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          bgcolor: "#008080",
          "&:hover": {
            bgcolor: "#0C9E9E",
          },
          zIndex:1000
        }}
        onClick={handleLogoutClick}
      >
        <LogoutIcon />
      </Fab>
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
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
            onClick={handleLogout}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
