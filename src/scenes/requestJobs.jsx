import { useTheme } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";
import { token } from "../Theme";
import { TextField, Box, Typography, Chip, Divider, Button, Snackbar } from "@mui/material";
import Header from "../components/Header";
import api from '../api/Api';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from '@mui/material';

export default function Request() {
  const theme = useTheme();
  const colors = token(theme.palette.mode) || {};
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchData = async () => {
    const response = await api.get("superAdmin/jobs");
    return response.data.filter(job => !job.active);
  };

  const { data: requestJob = [], isLoading, error } = useQuery({
    queryKey: ['requestJob'],
    queryFn: fetchData,
    onSuccess: (data) => {
      setFilter(data);
    }
  });

  useEffect(() => {
    const filterData = () => {
      let filtered = [...requestJob];
      
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
          (item.title?.toLowerCase().includes(searchTermLower) ||
          item.description?.toLowerCase().includes(searchTermLower))
        );
      }
      setFilter(filtered);
    };
    filterData();
  }, [searchTerm, requestJob]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleActivateJob = async (jobId) => {
    try {
      await api.post("superAdmin/activate_job", { job_id: jobId });
      setSnackbarMessage("Job activated successfully!");
      setSnackbarSeverity("success");
      queryClient.invalidateQueries('requestJob');
    } catch (error) {
      setSnackbarMessage("Error activating job.");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await api.delete(`job/${jobId}`);
      setSnackbarMessage("Job deleted successfully!");
      setSnackbarSeverity("success");
      queryClient.invalidateQueries('requestJob');
    } catch (error) {
      setSnackbarMessage("Error deleting job.");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data</Typography>;

  return (
    <Fragment>
      <Header title={"Job Demand"} subtitle={"For accepting or discarding job requests"} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(2),
          m: "15px 10px",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: colors.primary?.[400] || '#f5f5f5',
          boxShadow: theme.shadows[1],
        }}
      >
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{
            width: '80%',
            backgroundColor: colors.primary[400],
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        {filter.length > 0 ? (
          filter.map(job => {
            const categories = job.static
              .filter(item => item.type === 'category')
              .map(item => item.name)
              .join(', ');

            return (
              <Box key={job.id} sx={{ mb: 4, p: 3, border: `1px solid ${colors.divider || '#ccc'}`, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>{job.title}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{job.description}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Salary: ${job.salary}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Work Hours: {job.work_hours}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Number of Employees: {job.number_of_employees}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Experience Years: {job.experience_years}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Wanted Gender: {job.wanted_gender}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h4" sx={{ mb: 1 }}>Categories: {categories}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h4" sx={{ mb: 1 }}>Sub Categories:</Typography>
                {job.subCategories && job.subCategories.length > 0 ? (
                  job.subCategories.map((subCat) => (
                    <Chip
                      key={subCat.id}
                      label={subCat.name}
                      variant="outlined"
                      color="primary"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))
                ) : (
                  <Typography>No subcategories available</Typography>
                )}

                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, mr: 1 }}
                  onClick={() => handleActivateJob(job.id)}
                >
                  Accept Job
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete Job
                </Button>
              </Box>
            );
          })
        ) : (
          <Typography>No pending job requests found.</Typography>
        )}
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
