import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Button, CardActions,
  useTheme, Dialog, DialogTitle, DialogContent, Slide,
  Avatar, CircularProgress
} from "@mui/material";
import { token } from "../Theme";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { useQuery } from '@tanstack/react-query';
import api from '../api/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeCard({ employee = {} }) {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);


  const { data: certifications, isLoading, error } = useQuery({
    queryKey: ['certifications', employee.id],
    queryFn: async () => {
      const response = await api.get('superAdmin/get_certifications');
      return response.data.filter(cert => cert.employee.id === employee.id);
    },
    enabled: !!employee.id, 
  });

  const getRandomBackgroundColor = () => {
    const backgroundColors = [
      colors.primary[600],
      colors.primary[400],
      colors.primary[500],
    ];
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  };

  const cardBackgroundColor = getRandomBackgroundColor();

  const handleShowMore = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: cardBackgroundColor,
        transition: "transform 0.2s",
        boxShadow: 3,
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1.5}>
          <Avatar sx={{ bgcolor: colors.greenAccent[600], mr: 1 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h3" component="div">
            {employee.name || 'N/A'}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1.5}>
          <EmailIcon sx={{ mr: 0.5, color: colors.grey[500] }} />
          <Typography variant="body2" color="text.secondary">
            {employee.email || 'N/A'}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems="center">
          <PhoneIcon sx={{ mr: 0.5, color: colors.grey[500] }} />
          <Typography variant="body2">
            {employee.phone || 'N/A'}
          </Typography>
        </Box>

    
        {isLoading ? (
          <CircularProgress size={20} sx={{ mt: 2 }} />
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Error loading skills
          </Typography>
        ) : certifications && certifications.length > 0 ? (
          <Box mt={2}>
            <Typography variant="h3" color={colors.greenAccent[500]}>
              Top Skills:
            </Typography>
            {certifications.map((cert) => (
              <Typography key={cert.id} variant="body2" color="text.secondary">
                {cert.subcategory.name} (Last applied: {cert.last_apply ? new Date(cert.last_apply).toLocaleDateString() : 'N/A'})
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            No skills available
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          style={{ color: colors.greenAccent[600], borderColor: colors.greenAccent[600] }}
          onClick={handleShowMore}
          startIcon={<PersonIcon />}
        >
          Details
        </Button>
      </CardActions>

      <Dialog 
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
        <DialogTitle variant="h3"> {employee.name || 'N/A'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Email: {employee.email || 'N/A'}</Typography>
          <Typography variant="body1">Phone: {employee.phone || 'N/A'}</Typography>
          <Typography variant="body1">Gender: {employee.gender || 'N/A'}</Typography>

      
          <Box mt={2}>
            <Typography variant="h3" color={colors.greenAccent[500]}>
              Top Skills:
            </Typography>
            {certifications && certifications.length > 0 ? (
              certifications.map((cert) => (
                <Typography key={cert.id} variant="body1" color="text.secondary">
                  {cert.subcategory.name} (Last applied: {cert.last_apply ? new Date(cert.last_apply).toLocaleDateString() : 'N/A'})
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No skills available
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
