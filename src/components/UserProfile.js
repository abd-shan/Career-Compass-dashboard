import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, useTheme, Skeleton, Avatar } from "@mui/material";
import { token } from "../Theme";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ open, handleClose, userInfo }) => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const navigate = useNavigate();


    const handleProfile=()=>{
        navigate('profile');
        handleClose();

    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ backgroundColor: colors.primary[500], color: colors.grey[200] }}>Admin Info</DialogTitle>
            <DialogContent sx={{ bgcolor: theme.palette.background.paper }}>
                {userInfo ? (
                <Box>
                    <Avatar></Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h3" sx={{ color: colors.grey[200] }}>
                            {userInfo.name}
                        </Typography>
                        
                    </Box>
                </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Skeleton variant="text" width={"90%"} height={40} animation="wave" /> 
                        <Skeleton variant="text" width={"90%"} height={30} animation="wave" />
                    </Box>
                
                )}
                <Button sx={{ color:colors.grey[200],backgroundColor:colors.primary[400],
                    border:`1px solid ${colors.grey[200]}`, borderRadius:"20px"}} onClick={handleProfile}>
                    view profile
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserProfile;
