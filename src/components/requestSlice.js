import { Avatar, Box, Button, Card, CardActions, CardContent, Typography, useTheme } from "@mui/material";
import { token } from "../Theme";
// import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import GroupIcon from "@mui/icons-material/Group"
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationIcon from "@mui/icons-material/LocationOn"




 const Slice=({job})=>{

  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const handleAccept= async ()=>{


  }
  


  const handleDelete = () => {
    
    console.log("Delete job:", job.title);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: colors.primary[400],
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
            <WorkIcon />
          </Avatar>
          <Typography variant="h3" component="div">
            {job.title}
          </Typography>
        </Box>
        <Box display ="flex">
        <BusinessOutlinedIcon sx={{ mr: 0.5, color: colors.grey[500] }}/>
        <Typography variant="body1">{job.company.company_name} company</Typography>

        </Box>

        <Box display="flex" alignItems="center" mb={1.5}>
          <WorkHistoryOutlinedIcon sx={{ mr: 0.5, color: colors.grey[500] }} />
          <Typography variant="body2" color="text.secondary">
            +{job.experience_years} years
          </Typography>
        </Box>

      
        {job.location && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 1 }} />
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

       

        {job.wanted_gender && (
          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>Wanted Gender:</Typography> {job.wanted_gender}
          </Typography>
        )}

        <Typography variant="body2" paragraph>
          {job.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          style={{ color: colors.greenAccent[600], borderColor: colors.greenAccent[600]  }}
          onClick={handleAccept}
          startIcon={<WorkIcon />}
        >
          Accept
        </Button>
        <Button
          size="small"
          variant="outlined"
          style={{ color: colors.redAccent[600], borderColor: colors.redAccent[500] }}
          onClick={handleDelete}
          startIcon={<DeleteIcon/>}
        >
          reject
        </Button>
      </CardActions>

      
    </Card>
  );

}

export default Slice;