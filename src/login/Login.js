import React, { useContext, useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import "./Login.css";
import { token as generateToken, colorModeContext } from "../Theme";
import { Box, Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from "formik";
import UserProfile from "../components/UserProfile";
import { AuthContext } from "../api/Auth";
import { setAuthToken } from '../api/Api'; 
import admin1 from "../asset/admin1.png";






export default function Login() {
  const theme = useTheme();
  const colors = generateToken(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const navigate = useNavigate();
  const { token, updateToken } = useContext(AuthContext); 
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [mode,setMode]=useState("dark");

  useEffect(()=>{
    navigate("/")
  },[])
  
  useEffect(() => {
    setAuthToken(token);  
  }, [token]);

  const handleSubmit = async (values, { setErrors }) => {
    const dataLogin = { ...values };
    setIsLoading(true);

    try {
      console.log("!")
      const response = await fetch("http://localhost:8080/superAdminAuth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLogin),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ password: errorData.message || "Unknown error" });
        throw new Error("Login failed: " + (errorData.message || "Unknown error"));
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);
      updateToken(data.access_token); 
       navigate('home/dashboard');
       window.location.reload();
   
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().min(6, "Password must be larger than 6 characters").required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseUserProfile = () => {
    navigate("home/dashboard");
    
  };

  useEffect(()=>{
    setMode(theme.palette.mode)
  },[theme.palette.mode])
 

  return (
    <Box  className={`container-${theme.palette.mode==="dark" ? "dark" : "light"}` } >
      <Box  className={`content-${theme.palette.mode==="dark" ? "dark" : "light"}`} >
        <Box className="welcome" style={{ paddingBottom: "20%", marginTop: 0 }}>
          <h2>Welcome back</h2>
          <Box>
            <img width={"85%"} height={"85%"} src={admin1} alt="logo"></img>
          </Box>
        </Box>
        <Box className="Login_div">
          <Box display="flex" bgcolor={colors.blueAccent[400]} borderRadius={"20px"} justifyContent="center">
            <IconButton aria-label={"mode"} onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          <Formik initialValues={initialValues} validationSchema={checkSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form className="login">
                <Typography sx={{m:"15px"}} variant="h3" align="center" gutterBottom>
                  <i><strong>Sign in </strong></i>
                </Typography>
                <Box className="email" borderRadius={"20px"}>
                  <Box className="emailInput" letterSpacing={1} display="flex" alignItems="center">
                    <TextField
                      fullWidth
                      onBlur={handleBlur}
                      placeholder="email@example.com"
                      variant="filled"
                      name="email"
                      label={"Email"}
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)} 
                      helperText={touched.email && errors.email} 
                      sx={{ flex: 2, color:colors.grey[200]}}
                    />
                    <EmailIcon color={"action"} />
                  </Box>
                </Box>
                <Box className="password">
                  <Box className="passwordInput" display="flex" alignItems="center">
                    <TextField
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      onBlur={handleBlur}
                      variant="filled"
                      name="password"
                      label={"Password"}
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)} 
                      helperText={touched.password && errors.password} 
                      sx={{ flex: 1 , color:colors.grey[200]}}
                    />
                    <Box className="show">
                      <LockOutlinedIcon style={{ cursor: "pointer" }} onClick={handleTogglePassword} color={"action"} />
                    </Box>
                  </Box>
                </Box>
                <Box className="submit" marginTop={2}>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: `${colors.greenAccent[600]}`,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: theme.palette.mode === "dark" ? `1px solid ${colors.primary[400]}` : `1px solid ${colors.blueAccent[300]}`,
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                    {!isLoading && <LoginOutlinedIcon sx={{ marginLeft: 1 }} />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <UserProfile open={openUserProfile} handleClose={handleCloseUserProfile} userInfo={userData} />
      </Box>
    </Box>
  );
}
