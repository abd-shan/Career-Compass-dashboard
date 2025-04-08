import React, { useState, useEffect } from 'react';
import { Typography, Box, useTheme, Skeleton, Avatar, Divider } from '@mui/material';
import { Email, LocationOn, Person, Work } from '@mui/icons-material';
import { token } from '../Theme';
import api from '../api/Api';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  
  // حالة لحفظ تاريخ دخول البرنامج
  const [loginDate, setLoginDate] = useState(null);

  useEffect(() => {
    // تعيين تاريخ دخول البرنامج عند أول تشغيل
    setLoginDate(new Date().toLocaleString());
  }, []);

  const fetchData = async () => {
    const response = await api.get('superAdmin/getMyInfo');
    console.log(response.data);
    return response.data;
  };

  const { data: profile = [], isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchData
  });

  return (
    <Box
      theme={theme}
      style={{
        background: `${theme.palette.mode}` === 'dark'
          ? 'linear-gradient(#0c101b, #1F2A40, #040509)'
          : 'linear-gradient(#858aff, #cccccc, #858aff)',
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s",
        '&:hover': {
          transform: "scale(1.02)",
        }
      }}
    >
      <Box
        theme={theme}
        style={{
          background: `${theme.palette.mode}` === 'dark'
            ? 'linear-gradient(#0c101b, #1F2A40, #040509)'
            : 'linear-gradient(#858aff, #eeeeee, #858aff)',
          padding: "20px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Avatar
          src={profile.avatarUrl || 'default-avatar.png'}
          alt={profile.name}
          sx={{ width: 80, height: 80, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
        />
        <Box>
          <Typography variant="h4" sx={{ mb: 2, color: colors.grey[100], fontWeight: 'bold' }}>
            {profile.name}
          </Typography>
          {isLoading ? (
            <Box>
              <Skeleton variant="rectangular" width={"90%"} height={40} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="text" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
              <Skeleton variant="rounded" width={"90%"} height={30} animation="wave" />
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: colors.greenAccent[600] }} />name: {profile.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, color: colors.greenAccent[600] }} />email: {profile.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: colors.greenAccent[600] }} /> Age: {profile.age}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: colors.greenAccent[600] }} /> Location: {profile.location}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
                <Work sx={{ mr: 1, color: colors.greenAccent[600] }} /> Role: {profile.manager ? 'Manager' : 'Admin'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box>
        <Typography variant="body2" style={{ color: colors.grey[700] }}>
          Program Access Date: {loginDate || 'Loading...'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
