import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  useTheme,
  DialogActions,
  IconButton,
} from '@mui/material';
import { token } from "../Theme";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ open, onClose, ok, done, data, amount, charge }) {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const handleAccept = () => {
    if (amount) {
      charge();
    }
    onClose(); // Close the modal first
    ok();
    setTimeout(() => {
      done();
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          maxWidth: '100%',
          borderRadius: '16px 16px 0 0', // Rounded top corners
          [theme.breakpoints.up('sm')]: {
            bottom: 'unset',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: colors.primary[400],
          color: 'white',
          position: 'relative',
        }}
      >
        <Typography variant="h6" component="div" align="center">
          {data.title}
        </Typography>
        {amount && <PaymentOutlinedIcon sx={{ position: 'absolute', right: 16, top: 16 }} />}
        {/* Close Icon */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[200],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" color={colors.grey[200]}>
          {data.body} {amount}
        </Typography>
        
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          fullWidth={!amount}
          sx={{
            marginRight: amount ? 1 : 0,
            color: colors.primary[500],
            borderColor: colors.primary[500],
            '&:hover': {
              borderColor: colors.primary[700],
              color: colors.primary[700],
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAccept}
          fullWidth={!amount}
          sx={{
            backgroundColor: colors.greenAccent[400],
            '&:hover': {
              backgroundColor: colors.greenAccent[600],
            },
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
