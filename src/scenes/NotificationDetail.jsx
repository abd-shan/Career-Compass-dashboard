import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { token } from "../Theme";
import { useQuery } from '@tanstack/react-query';
import api from '../api/Api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotificationDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate=useNavigate();
  
  
  const {data:notifications,isLoading,error}=useQuery({
    queryKey:['notifications'],
    queryFn:async ()=>{
        const response = await api.get('superAdmin/getNotifications')
        return response.data;
    }
  })

  const notification = notifications.find(n => n.id === parseInt(id));

  return (
    <Box m="20px">
        <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h2" fontWeight="600" color={colors.grey[100]}>
                Notification Details
            </Typography>

            <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home/notification')}
            sx={{
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.secondary,
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
              }
            }}
          >
            Back to all notifications
          </Button>



        </Box>
      {notification ? (
        <Box mt="20px">
          <Typography variant="h3" fontWeight="600" color={colors.greenAccent[500]}>
            {notification.body}
          </Typography>
          <Typography variant="body1" color={colors.grey[100]}>
            Date: {new Date(notification.date).toLocaleDateString()}
          </Typography>
          <Box mt="20px">
            {notification.company && (
              <Box>
                <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
                  Company Details
                </Typography>
                <Typography variant="body1" color={colors.grey[300]}>
                  Name: {notification.company.company_name}
                </Typography>
                <Typography variant="body1" color={colors.grey[300]}>
                  Email: {notification.company.email}
                </Typography>
        
              </Box>
            )}
            {notification.employee && (
              <Box mt="20px">
                <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
                  Employee Details
                </Typography>
                <Typography variant="body1" color={colors.grey[300]}>
                  Employee ID: {notification.employee.name}
                </Typography>
        
              </Box>
            )}

          </Box>
        </Box>
      ) : (
        <Typography>No details available</Typography>
      )}
      <Box>

      </Box>
    </Box>
  );
};

export default NotificationDetail;
