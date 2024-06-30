import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function LogingForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  return (
    <LogingWrapper>
      <LogingFormContainer>
        <form>
          <Typography component="h1" variant="h5" sx={logingTextStyles}>
            Loging to your account
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                paddingBottom:"2rem",
                paddingTop:"0.5rem"
              }}
            >
              <TextField
                sx={{
                  width: "22vw",
                }}
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
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
                    color: "#0A6644",
                  },
                }}
              />
            </Box>
            <Box>
            <FormControl
              sx={{
                width: "22vw",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            </Box>
            <LogingButtonContainer>
            <Button sx={{
              backgroundColor: "#008080",
              width: "20vw",
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
              borderRadius: "1rem",
              fontSize: "1rem",
              color:"#ffffff",
              "&:hover": {
                  backgroundColor: "#0C9E9E",
              },
              margin: "0.3vw 0",
            }}
              onClick={() => {
                window.location.href = "/details";
              }}
              >
                Loging
              </Button>
            </LogingButtonContainer>
          </Box>
        </form>
      </LogingFormContainer>
    </LogingWrapper>
  );
}

const LogingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogingFormContainer = styled.div`
  width: 30vw;
  height: 60vh;
  background-color: #ffffff;
  margin: auto;
  border: 0.15rem solid #008080;
  border-radius: 2rem;
`;

const logingTextStyles = {
  textAlign: "center",
  color: "#01213f",
  fontWeight: 600,
  fontSize: "1.6rem",
  margin: "2vw 0 1vw 0",
};

const LogingButtonContainer = styled.div`
  margin: auto;
  padding-top: 3vw;
`;
