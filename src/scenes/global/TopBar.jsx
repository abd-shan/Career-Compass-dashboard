import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, useTheme, Typography, Divider } from "@mui/material";

import NotificationOutlineIcon from "@mui/icons-material/NotificationAddOutlined";
import SettingOutlineIcon from "@mui/icons-material/SettingsOutlined";

import salehImage from '../../asset/saleh.png'; 

import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { token, colorModeContext } from "../../Theme";
import SettingsDialog from "../../components/SettingDialog";
import UserProfile from "../../components/UserProfile";
import { AuthContext } from "../../api/Auth";

export default function TopBar() {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const colorMode = useContext(colorModeContext);
    const navigate = useNavigate();

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const {logout} = useContext(AuthContext);

    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    const handleLogout = () => {
      logout();
      navigate("/");
      window.location.reload();
    };

    const handleNofi =()=>{ navigate("/home/notification")}

    const handleSetting = () => {
      setSettingsOpen(true);
      if (!isRotating) {
        setIsRotating(true);
        setRotation(10); 
        const interval = setInterval(() => {
          setRotation((prevRotation) => {

            if (prevRotation < 45) {
              return prevRotation + 10; 
            } else {
              clearInterval(interval);
              setIsRotating(false);
              return prevRotation;
            }
          });
        }, 0); 
      }
    };

    return (
        <Box display={"flex"} justifyContent="space-between">
            <Box display={"flex"} backgroundColor={colors.primary[400]} borderRadius={"20px"}></Box>
              <Box display="flex">

            <img
            onClick={() => {navigate("/profile")}}
                  alt="profile-user"
                  width="40px"
                  height="40px"
                  src={salehImage}
                  style={{ alignSelf:"center",alignItems:"center",cursor: "pointer", borderRadius: "50%" }}
                />
                <Divider/>


                <SettingsDialog open={settingsOpen} handleClose={() => setSettingsOpen(false)} />
                <IconButton aria-label={"notifications"} onClick={handleNofi}>
                    <Typography fontSize="xl">
                        <NotificationOutlineIcon />
                    </Typography>
                </IconButton>
                <IconButton sx={{ marginLeft: "20px", marginRight: "10px", color: "red !important" }}>
                    <LogoutIcon onClick={handleLogout} />
                </IconButton>
                
            </Box>
            {/* <UserProfile open={userOpen} handleClose={() => setUserOpen(false)} /> */}
        </Box>
    );
}
