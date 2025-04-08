import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Typography, useTheme, TextField } from "@mui/material";
import JobCard from '../components/JobCard';
import { token } from "../Theme";
import Skeleton from '@mui/material/Skeleton';
import { useMutation, useQuery } from "@tanstack/react-query";
import api from '../api/Api';

const JobsPage = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get('superAdmin/jobs');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data");
    }
  };

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchData,
  });

  useEffect(() => {
    const filterData = () => {
      let filtered = jobs.filter(job => job.active === true);

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(job => job.category === selectedCategory);
      }

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
          item.title?.toLowerCase().includes(searchTermLower) ||
          item.wanted_gender?.toLowerCase().includes(searchTermLower) ||
          item.description?.toLowerCase().includes(searchTermLower) ||
          item.company.company_name?.toLowerCase().includes(searchTermLower)
        );
      }

      setFilteredJobs(filtered);
    };

    filterData();
  }, [jobs, selectedCategory, searchTerm]);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const categories = [...new Set(jobs.map(job => job.category))];

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: colors.background,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          backgroundColor: colors.primary[500],
          boxShadow: theme.shadows[3],
          marginBottom: theme.spacing(4),
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, color: colors.grey[200] }}>
       Shown Jobs 
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            mb: 2,
          }}
        >
          {/* <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{
              flex: 1,
              minWidth: 120,
              marginRight: theme.spacing(2),
              backgroundColor: colors.primary[400],
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[1],
              '& .MuiSelect-select': {
                padding: theme.spacing(1),
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select> */}

          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{
              flex: 2,
              backgroundColor: colors.primary[400],
              // borderRadius: theme.shape.borderRadius,
              '& .MuiInputBase-input': {
                padding: theme.spacing(1),
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          gap: 2,
        }}
      >
        {isLoading ? (
          Array(5).fill().map((_, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={180} />
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
            </Box>
          ))
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Error fetching data: {error.message}
          </Typography>
        ) : (
          filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              No jobs found.
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default JobsPage;
