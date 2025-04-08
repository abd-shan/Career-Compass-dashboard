import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from 'react-router-dom';  // استيراد useNavigate
import api from "../api/Api";
import Header from '../components/Header';
import { token } from "../Theme";
import admin3 from '../asset/admin3.png';

const AddStaticPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();  // تهيئة useNavigate
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  const colors = token(theme.palette.mode);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      type: type,
    };

    try {
      const response = await api.post('http://localhost:8080/statics', payload);
      console.log('Response:', response.data);
      setDialogType("success");
      setDialogMessage("Static created successfully!");
      setDialogOpen(true);

    } catch (error) {
      let message = error.response?.data?.message || "An error occurred";
      console.error('Error submitting data:', error);
      setDialogType("warning");
      setDialogMessage(message);
      setDialogOpen(true);
    }
  };

  return (
    <Box>
      <Box>
        <Header title="Add Static" subtitle="Add new category for new role in company or freelance" />
      </Box>
      <Box display="flex" m="0px">
        <Box
          component="img"
          src={admin3}
          alt="logo"
          sx={{
            width: "40%",
            height: "auto",
            marginRight: "20px",
            borderRadius: "10px",
          }}
        />
        <Box
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(#1F2A40, #0c101b, #040509)'
              : 'linear-gradient(#ffffff, #f0f0f0)',
            borderRadius: "20px",
            padding: "30px",
            maxWidth: "500px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            mt: 5,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: "20px",
              fontWeight: "bold",
              color: colors.grey[100],
            }}
          >
            Add Static Data
          </Typography>
          <Box flexDirection={"column"} display={"flex"} justifyContent={"space-between"}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                marginBottom: "20px",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: colors.grey[200],
                  },
                  '&:hover fieldset': {
                    borderColor: colors.grey[400],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.grey[200],
                    color: colors.grey[200],
                  },
                },
              }}
            />
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{
                marginBottom: "20px",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: colors.grey[200],
                  },
                  '&:hover fieldset': {
                    borderColor: colors.grey[400],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.grey[200],
                    color: colors.grey[200],
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: theme.palette.primary.main,
                color: colors.greenAccent[600],
                padding: "10px",
                '&:hover': {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              Submit
            </Button>
          </form>
          {/* زر التنقل إلى صفحة home/category */}
          
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/home/category')}  // التنقل إلى صفحة home/category عند النقر
            sx={{
              mt: 2,
              background: colors.greenAccent[700],
              color: colors.grey[200],
              '&:hover': {
                background: colors.greenAccent[800],
              },
            }}
          >
            Go to Categories
          </Button>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ backgroundColor: dialogType === "success" ? "lightgreen" : "lightcoral" }} id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            {dialogType === "success" ? <CheckCircleOutlineIcon color="success" /> : <WarningOutlinedIcon color="warning" />}
            <Box ml={1}><Typography variant="h3">{dialogType === "success" ? "Success" : "Warning"}</Typography></Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: `${colors.greenAccent[700]}` }} onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
          <Divider />
          <Button>
            {/* يمكن إضافة زر آخر هنا إذا لزم الأمر */}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddStaticPage;
