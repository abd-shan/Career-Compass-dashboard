import { useState } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography, } from "@mui/material";
import { Formik } from "formik";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api/Api";
import { token } from "../Theme";
import { useTheme } from "@emotion/react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");
  const [fieldError, setFieldError] = useState({});
  const colors= token(useTheme().palette.mode);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const createAdmin = async (data, resetForm) => {
    setFieldError({});
    try {
      const response = await api.post('superAdminAuth/create_admin', data);
      setDialogType("success");
      setDialogMessage("User created successfully!");
      setDialogOpen(true);
      resetForm();
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message || "An error occurred";
        if (error.response.status === 400) {
          console.error('Validation errors: ', message);
        } else if (error.response.status === 403) {
          console.error('Forbidden: ', message);
        } else if (error.response.status === 402) {
          message = 'User already exists '
 
          setFieldError({ email: 'User already exists' });
        } else {
          console.error('Error creating admin', error.response.data);
        }
        setDialogType("warning");
        setDialogMessage(message);
        setDialogOpen(true);
      } else {
        console.error('Network error: ', error);
        setDialogType("warning");
        setDialogMessage("Network error");
        setDialogOpen(true);
      }
    }
  };

  return (
    <Box m="20px" ml={"10px"} sx={{ marginBottom: "10px", paddingBottom: "15px" }}>
      <Header title="CREATE USER" subtitle="Create a New User " />

      <Formik
        onSubmit={(data, { resetForm }) => createAdmin(data, resetForm)}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && (!!errors.name || !!fieldError.name)}
                helperText={(touched.name && errors.name) || fieldError.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && (!!errors.email || !!fieldError.email)}
                helperText={(touched.email && errors.email) || fieldError.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ backgroundColor: dialogType === "success" ? "lightgreen" : "lightcoral" }} id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            {dialogType === "success" ? <CheckCircleOutlineIcon color="success" /> : <WarningOutlinedIcon color="warning" />}
            <Box ml={1}><Typography variant="h3">{dialogType === "success" ? "Success" : "Warning"}</Typography> </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color:`${colors.greenAccent[700]}`,}} onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog> </Box>
  );
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  age: yup.number().required("required"),
  location: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required").oneOf([yup.ref('password')], "Passwords must match")
});

const initialValues = {
  name: "",
  email: "",
  contact: "",
  age: "",
  location: "",
  password: "",
  confirmPassword: "",
};

export default Form;
