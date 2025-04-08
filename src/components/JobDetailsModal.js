import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import { token } from "../Theme";
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import WorkIcon from"@mui/icons-material/Work"

const JobDetailsModal = ({ job, onClose }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  return (
    <div
      style={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: colors.primary[500],
          color: colors.grey[100],
          position: 'relative',
        }}
      >
        <Typography variant="body1" component="div" align="center">
          Job Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: colors.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: 3,
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Box display="flex">
        <WorkIcon sx={{mr:1 ,color:colors.grey[400]}} />

        <Typography variant="h3"  gutterBottom sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>

        </Box>
       
        
        {job.company && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ mr: 1 }} /> 
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Company:</Typography> {job.company.name}
          </Typography>
        )}
        
        {job.location && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Location:</Typography> {job.location}
          </Typography>
        )}

        {job.salary && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoneyIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Salary:</Typography> ${job.salary}
          </Typography>
        )}

        {job.work_hours && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Work Hours:</Typography> {job.work_hours} hours/week
          </Typography>
        )}

        {job.number_of_employees && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Number of Employees:</Typography> {job.number_of_employees}
          </Typography>
        )}

        {job.experience_years !== null && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <HourglassBottomIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Experience Required:</Typography> {job.experience_years} years
          </Typography>
        )}

        {job.wanted_gender && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Wanted Gender:</Typography> {job.wanted_gender}
          </Typography>
        )}

        <Typography variant="body2" paragraph>
          {job.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          fullWidth
        >
          Close
        </Button>
      </DialogActions>
    </div>
  );
};

export default JobDetailsModal;
