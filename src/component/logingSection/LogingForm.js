import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { loginUser } from "../../API";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LogingForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;
      localStorage.setItem("role", userRole);
      navigate("/details");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setFormError(
        "Login failed. Please check your credentials and try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (!username || !password) {
      setFormError("Please enter both username and password.");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <LogingWrapper>
    <Typography
    sx={{
      margin:"5vw 0 0 0",
      fontSize:"3rem",
      color:"#EBF5F5",
      fontWeight:"700",
      textAlign:"center",
      alignItems:"center",
      justifyContent:"center",
      "@media (max-width: 700px)": {
                fontSize: "2.5rem",
                margin:"7vw 0 0 0"
              },
              "@media (max-width: 600px)": {
                fontSize: "2rem",
              },
      }}
    >
    Welcome to CGIFS Portfolio Manager
    </Typography>
    
      <LogingFormContainer>
        <form onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              ...logingTextStyles,
              "@media (max-width: 1000px)": {
                fontSize: "1.5rem",
              },
              "@media (max-width: 850px)": {
                fontSize: "1.4rem",
              },
              "@media (max-width: 700px)": {
                fontSize: "1.3rem",
              },
              "@media (max-width: 500px)": {
                fontSize: "1.2rem",
                paddingTop:"1.5vh"
              },
            }}
          >
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
                paddingBottom: "2rem",
                paddingTop: "0.5rem",
              }}
            >
              <TextField
                sx={{
                  width: "22vw",
                  "@media (max-width: 1100px)": {
                    width: "30vw",
                  },
                  "@media (max-width: 900px)": {
                    width: "40vw",
                  },
                  "@media (max-width: 750px)": {
                    width: "46vw",
                  },
                  "@media (max-width: 670px)": {
                    width: "48vw",
                  },
                  "@media (max-width: 550px)": {
                    width: "65vw",
                  },
                  "@media (max-width: 470px)": {
                    width: "70vw",
                  },
                  "@media (max-width: 400px)": {
                    width: "75vw",
                  },
                }}
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box>
              <FormControl
                sx={{
                  width: "22vw",
                  "@media (max-width: 1100px)": {
                    width: "30vw",
                  },
                  "@media (max-width: 900px)": {
                    width: "40vw",
                  },
                  "@media (max-width: 750px)": {
                    width: "46vw",
                  },
                  "@media (max-width: 670px)": {
                    width: "48vw",
                  },
                  "@media (max-width: 550px)": {
                    width: "65vw",
                  },
                  "@media (max-width: 470px)": {
                    width: "70vw",
                  },
                  "@media (max-width: 400px)": {
                    width: "75vw",
                  },
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                sx={{
                  backgroundColor: "#008080",
                  width: "22vw",
                  height: "7vh",
                  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
                  borderRadius: "1rem",
                  fontSize: "1rem",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#0C9E9E",
                  },
                  margin: "2.5vw 0 0 0",
                  "@media (max-width: 1100px)": {
                    width: "30vw",
                  },
                  "@media (max-width: 900px)": {
                    width: "40vw",
                  },
                  "@media (max-width: 750px)": {
                    width: "46vw",
                  },
                  "@media (max-width: 670px)": {
                    width: "48vw",
                  },
                  "@media (max-width: 550px)": {
                    width: "65vw",
                  },
                  "@media (max-width: 470px)": {
                    width: "70vw",
                  },
                  "@media (max-width: 400px)": {
                    width: "75vw",
                    fontSize: "0.9rem"
                  },
                  
                }}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
              {formError && (
                <Typography
                  color="error"
                  sx={{ mt: 1, alignItems: "center", fontSize: "0.7rem" }}
                >
                  {formError}
                </Typography>
              )}
            </LogingButtonContainer>
          </Box>
        </form>
      </LogingFormContainer>
    </LogingWrapper>
  );
}

const LogingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 800px) {
    height: 90vh;
  }
  @media (max-width: 600px) {
    height: 85vh;
  }
`;

const LogingFormContainer = styled.div`
  width: 30vw;
  height: 60vh;
  background-color: #ffffff;
  margin: auto;
  border: 0.15rem solid #008080;
  border-radius: 2rem;

  @media (max-width: 1100px) {
    width: 35vw;
    height: 55vh;
  }
  @media (max-width: 900px) {
    width: 45vw;
    height: 50vh;
  }

  @media (max-width: 850px) {
    width: 50vw;
    height: 50vh;
  }

  @media (max-width: 750px) {
    width: 55vw;
    height: 50vh;
  }
  @media (max-width: 670px) {
    width: 60vw;
    height: 50vh;
  }
  @media (max-width: 550px) {
    width: 75vw;
    height: 50vh;
  }
  @media (max-width: 470px) {
    width: 85vw;
    height: 50vh;
  }
`;

const logingTextStyles = {
  textAlign: "center",
  color: "#174022",
  fontWeight: 600,
  fontSize: "1.6rem",
  margin: "2vw 0 1vw 0",
};

const LogingButtonContainer = styled.div`
  margin: auto;
  padding-top: 1vw;

  @media (max-width: 800px) {
    padding-top: 3vw;
  }
  @media (max-width: 630px) {
    padding-top: 4vw;
  }
  @media (max-width: 550px) {
    padding-top: 5vw;
  }
  @media (max-width: 450px) {
    padding-top: 6vw;
  }
  @media (max-width: 400px) {
    padding-top: 7vw;
  }
`;
