import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material'; // Import Snackbar
import React from 'react';

const CustomSnackbar = ({ open, onClose }) => { // Renamed to CustomSnackbar
  return (
    <Snackbar
      variant="soft"
      color="success"
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
      endDecorator={
        <Button
          onClick={onClose}
          size="sm"
          variant="soft"
          color="success"
        >
          Dismiss
        </Button>
      }
    >
      <Alert onClose={onClose} severity="success">
        Operation successful!
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
