import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import {token} from "../Theme";
import api from "../api/Api"
import { useQuery } from "@tanstack/react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotificationsBox = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate = useNavigate(); // استخدام useNavigate

  const handleNotificationClick = (id) => {
    navigate(`/home/notifications/${id}`);
  };

  const {data:notifications,isLoading,error}=useQuery({
    queryKey:['notifications'],
    queryFn:async ()=>{
        const response = await api.get('superAdmin/getNotifications')
        return response.data;
    }
  })

  return (
    <Box
      sx={{
        borderRadius: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
        padding: "15px",
        border: "1px solid grey",
        gridColumn: { xs: "span 12", md: "span 4" },
        gridRow: "span 2",
        backgroundColor: colors.primary[400],
        overflowY: "auto",
        cursor: 'pointer',
        m:'10px'
      }}
    >
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
          
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Recent Notifications
            </Typography>

            <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home/dashboard')}
            sx={{
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.secondary,
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
              }
            }}
          >
            Back to Home
          </Button>
          </Box>

          {  ((notifications)&&(notifications.length > 0)) ? (
            notifications.map((notification) => (
              <Box
                key={notification.id}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                borderBottom={`1px solid ${colors.primary[500]}`}
                p="15px"
                onClick={() => handleNotificationClick(notification.id)} 
                sx={{
                  '&:hover':{
                    backgroundColor:colors.primary[500]
                  }
                }}
              >
                <Box mb="10px">
                  <Typography color={colors.greenAccent[500]} variant="h4" fontWeight="600">
                    {notification.body}
                  </Typography>
                  <Typography color={colors.grey[100]} variant="body1">
                    {new Date(notification.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No notifications available</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default NotificationsBox;
