import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography, Button, CardActions,
  useTheme, Dialog, 
  Avatar
} from "@mui/material";
import { token } from "../Theme";
import JobDetailsModal from "./JobDetailsModal"; // Import the new modal component
import WorkIcon from '@mui/icons-material/Work'; // Example icon
import DeleteIcon from '@mui/icons-material/Delete'
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import  WorkHistoryOutlinedIcon  from "@mui/icons-material/WorkHistoryOutlined";
import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "../api/Api";


export default function JobCard({ job }) {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);



  
  const handleShowMore = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/job/${id}`);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(['subcategories', job.id]);
    }
  });



  
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

        <Typography variant="body2">
          {job.description.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          style={{ color: colors.greenAccent[600], borderColor: colors.greenAccent[600]  }}
          onClick={handleShowMore}
          startIcon={<WorkIcon />}
        >
          Details
        </Button>
        {/* <Button
          size="small"
          variant="outlined"
          style={{ color: colors.redAccent[600], borderColor: colors.redAccent[500] }}
          onClick={() => deleteMutation.mutate(job.id)}
          startIcon={<DeleteIcon/>}
        >
          Delete
        </Button> */}
      </CardActions>

      <Dialog 
        open={openModal}
        onClose={handleCloseModal}
      >
        <JobDetailsModal job={job} onClose={handleCloseModal} /> 
      </Dialog>
    </Card>
  );
}
