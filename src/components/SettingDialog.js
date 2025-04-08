import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Switch, IconButton, Popover, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { colorModeContext, token } from '../Theme';

const SettingsPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const colorMode = useContext(colorModeContext); 
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');

  useEffect(() => {
    setDarkMode(theme.palette.mode === 'dark');
  }, [theme.palette.mode]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleDarkMode = () => {
     
    setDarkMode(!darkMode);
    colorMode.toggleColorMode(); 
  };

  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: colors.grey[200] }}
      >
        <SettingsIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[600],
            color: colors.grey[100],
            padding: "20px",
            boxShadow: theme.shadows[5],
            borderRadius: "8px",
            minWidth: "200px",
          },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1">Dark Mode</Typography>
          <Switch
            checked={darkMode}
            onChange={handleToggleDarkMode}
            color="secondary"
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default SettingsPopover;
