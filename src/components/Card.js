import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  useTheme,
  Avatar,
  Tooltip,
  Chip,
  Box
} from "@mui/material";
import PrograssCircle from './ProgressCircle';
import { token } from "../Theme";
import Modal from "./Modal";
import CustomSnackbar from "./Snackbar";
import { premium, chargeData } from "../data/mockData";
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import api from '../api/Api';

export default function ViewCard({ data = {}, key }) {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const [state, setState] = useState({
    companyId: data.id,
    openModal: false,
    snackbarOpen: false,
    snackbarMessage: '',
    chargeAmount: '',
    charge: false,
    isPremium: data.premiumLevel !== undefined && data.premiumLevel > 0,
    premiumLevel: data.premiumLevel !== undefined ? Number(data.premiumLevel) : 1,
    balance: data.wallet || 0,
  });

  const handlePremiumLevelChange = (event) => {
    setState(prevState => ({ ...prevState, premiumLevel: Number(event.target.value) }));
  };

  const handleOpenPre = () => {
    setState(prevState => ({ ...prevState, openModal: true }));
  };

  const handleClose = () => {
    setState(prevState => ({ ...prevState, openModal: false, charge: false }));
  };

  const handleSnackbarClose = () => {
    setState(prevState => ({ ...prevState, snackbarOpen: false }));
  };

  const handleSnackbar = (message) => {
    setState(prevState => ({ ...prevState, snackbarOpen: true, snackbarMessage: message }));
  };

  const chargeAmountChange = (event) => {
    setState(prevState => ({ ...prevState, chargeAmount: event.target.value }));
  };

  const handleCharge = async () => {
    const amount = parseFloat(state.chargeAmount);
    const companyId = Number(data.id);

    if (!companyId) {
      handleSnackbar('Invalid companyId');
      return;
    }

    if (!isNaN(amount) && amount > 0) {
      try {
        console.log('Sending charge request:', { companyId, money: Number(amount) });
        const response = await api.post('superAdmin/charge_wallet', { companyId, money: Number(amount) });

        console.log('Charge response:', response.data);
        setState(prevState => ({
          ...prevState,
          balance: prevState.balance + amount,
          chargeAmount: "",
          charge: false,
          openModal: false,
        }));
        handleSnackbar('Wallet charged successfully');
      } catch (error) {
        console.error('Error charging wallet:', error.response ? error.response.data : error.message);
        handleSnackbar('Failed to charge wallet');
      }
    } else {
      handleSnackbar('Please enter a valid amount');
    }
  };

  const handleUpgradePremium = async () => {
    const companyId = Number(data.id);
    const premiumLevel = Number(state.premiumLevel);

    if (!companyId) {
      handleSnackbar('Invalid companyId');
      return;
    }

    if (!isNaN(premiumLevel) && premiumLevel > 0) {
      try {
        console.log('Sending premium upgrade request:', { companyId, premiumLevel });
        const response = await api.post('superAdmin/set_premium_level', { companyId, premiumLevel });

        console.log('Premium upgrade response:', response.data);
        setState(prevState => ({
          ...prevState,
          isPremium: true,
          openModal: false,
        }));
        handleSnackbar(`Company premium level was set to ${premiumLevel}`);
      } catch (error) {
        console.error('Error upgrading to premium:', error.response ? error.response.data : error.message);
        handleSnackbar('Failed to set premium level');
      }
    } else {
      handleSnackbar('Invalid premium level');
    }
  };

  const renderCardActions = () => (
    <>
      <CardActions sx={{ justifyContent: 'center', padding: '16px' }}>
        <TextField
          label="Charge Wallet"
          value={state.chargeAmount}
          onChange={chargeAmountChange}
          type="number"
          size="small"
          sx={{ flex: 1, mr: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleCharge} 
          sx={{ backgroundColor: colors.greenAccent[400] }}>
          Charge
        </Button>
      </CardActions>

      <Divider />

      <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', padding: '16px' }}>
        <Select
          value={state.premiumLevel}
          onChange={handlePremiumLevelChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Premium Level' }}
          sx={{ mr: 2 }}
        >
          {[...Array(10).keys()].map(level => (
            <MenuItem key={level + 1} value={level + 1}>
              Premium Level {level + 1}
            </MenuItem>
          ))}
        </Select>
        <br />
        <Divider />
        <Button 
          onClick={handleUpgradePremium} 
          variant="contained" 
          sx={{ backgroundColor: colors.redAccent[400] }}>
          {state.isPremium ? 'Upgrade to top level' : 'Upgrade to Premium'}
        </Button>
      </CardActions>
    </>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        width: 320,
        backgroundColor: state.isPremium ? 
          (theme.palette.mode === "light" ? colors.greenAccent[200] : colors.greenAccent[600]) 
          : colors.primary[400],
        transition: "transform 0.2s, box-shadow 0.2s",
        position: 'relative',
        overflow: 'visible',
        margin: "10px 0",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {state.isPremium && (
        <Tooltip title="Premium Account" placement="top">
          <Chip
            icon={<StarIcon style={{ color: "#ffeb3b" }} />}
            label={`Premium level: ${data.premiumLevel}`}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: colors.greenAccent[500],
              color: colors.grey[100],
            }}
          />
        </Tooltip>
      )}
      <Avatar
        sx={{
          width: 60,
          height: 60,
          bgcolor: colors.greenAccent[600],
          position: 'absolute',
          top: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.5)`,
        }}
      >
        {data.company_name ? data.company_name.charAt(0) : ''}
      </Avatar>

      <CardContent sx={{ pt: 6, px: 3 }}>
        <Typography variant="h3" component="div" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
          {data.company_name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ mr: 0.5, color: colors.grey[600] }} />
          <Typography variant="body2" color="text.secondary">
            {data.address}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {data.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Balance:
          </Typography>
          <Typography variant="h4" sx={{ color: colors.grey[100] }}>
            {state.balance} 
          </Typography>
          <PrograssCircle
            variant="determinate"
            progress={"0.20"}
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: colors.greenAccent[100],
              '& .MuiLinearProgress-bar': {
                backgroundColor: colors.greenAccent[600],
              },
            }}
          />
        </Box>
      </CardContent>

      <Divider />

      {renderCardActions()}

      <Modal
        data={premium}
        open={state.openModal}
        onClose={handleClose}
        ok={handleUpgradePremium}
        done={handleSnackbarClose}
      />

      <Modal
        data={chargeData}
        amount={state.chargeAmount}
        charge={handleCharge}
        open={state.charge}
        onClose={handleClose}
        ok={handleSnackbar}
        done={handleSnackbarClose}
      />

      <CustomSnackbar open={state.snackbarOpen} onClose={handleSnackbarClose} message={state.snackbarMessage} />
    </Card>
  );
}
