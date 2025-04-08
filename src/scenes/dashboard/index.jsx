import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { token } from "../../Theme";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/Api";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeoChart from "../../components/GeoChart";
import BarChart from "../../components/BarChart";
import StateBox from "../../components/StateBox";
import ProgressCircle from "../../components/ProgressCircle";
import FactoryOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { useNavigate } from 'react-router-dom';
import PieChart from '../../components/PieChart';
import NotificationsIcon from "@mui/icons-material/Notifications"

const Dashboard = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate = useNavigate();
  const [companiesNumber, setCompaniesNumber] = useState(0);
  const [employeesNumber, setEmployeesNumber] = useState(0);
  const [jobsNumber, setJobsNumber] = useState(0);

  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({//هذا يرجع الاشعارات
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('superAdmin/getNotifications');
      return response.data;
    },
  });

  useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await api.get('superAdmin/getAllCompanies');
      setCompaniesNumber(response.data.length);
      return response.data;
    },
  });

  useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await api.get('superAdmin/getAllEmployees');
      setEmployeesNumber(response.data.length);
      return response.data;
    },
  });

  useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await api.get('superAdmin/jobs');
      setJobsNumber(response.data.length);
      return response.data;
    },
  });

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Header title="Career Compass Admins" subtitle="Welcome to your dashboard" />

        <Box mt={{ xs: "10px", md: 0 }}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => { window.print(); }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        sx={{
          borderRadius: "20px",
          boxShadow: "5px grey",
          padding: "10px 0",
          display: "grid",
          gridTemplateColumns: { xs: "repeat(12, 1fr)" },
          gridAutoRows: "140px",
          gap: "20px"
        }}
      >
        {/* ROW 1 */}
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "15px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StateBox
            title={notifications?.length || 0} 
            subtitle="Notifications"
            progress="0.75"
            increase="+14%"
            icon={<NotificationsIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "15px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StateBox
            title={companiesNumber}
            subtitle="Companies"
            progress="0.50"
            increase="+50%"
            icon={<FactoryOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "15px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StateBox
            title={employeesNumber}
            subtitle="New Employees"
            progress="0.30"
            increase="+5%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[700], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "15px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StateBox
            title={jobsNumber}
            subtitle="Job opportunities"
            progress="0.80"
            increase="+43%"
            icon={<WorkOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}

        {/* NOTIFICATIONS BOX */}
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "15px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", md: "span 4" },
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
            overflowY: "auto" 
          }}
          onClick={() => navigate('/home/notification')}
        >
          {isLoadingNotifications ? (
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
                <Typography color={colors.grey[100]} variant="h3" fontWeight="600">
                  Recent Notifications
                </Typography>
              </Box>

              {notifications?.length > 0 ? (
                notifications.map((notification, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    borderBottom={`1px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box mb="10px">
                      <Typography color={colors.greenAccent[500]} variant="h4" fontWeight="600">
                        {notification.body}
                      </Typography>
                      <Typography color={colors.grey[100]} variant="body2">
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

        {/* ROW 3 */}
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "5px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", md: "span 6" },
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h3" fontWeight="600" sx={{ padding: "30px" }}>
            Employees Numbers
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.50)",
            padding: "5px",
            border: "1px solid grey",
            gridColumn: { xs: "span 12", md: "span 6" },
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h3" fontWeight="600" sx={{ padding: "30px" }}>
            Fields
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      
      </Box>
    </Box>
  );
};

export default Dashboard;
