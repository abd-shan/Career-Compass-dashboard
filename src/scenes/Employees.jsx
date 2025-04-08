import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Skeleton, MenuItem, Select, TextField, Typography, useTheme, CardContent, Card } from '@mui/material';
import Header from '../components/Header';
import EmployeeCard from '../components/EmployeeCard';
import api from '../api/Api';
import { token } from '../Theme';

// مكون لتصميم التهيئة
function EmployeeCardSkeleton() {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Skeleton variant="rectangular" width={345} height={140} />
        <Box sx={{ pt: 2 }}>
          <Skeleton animation="wave" width="60%" />
          <Skeleton animation="wave" width="40%" />
        </Box>
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </CardContent>
    </Card>
  );
}

// مكون يعرض الرسالة عند عدم وجود بيانات
function NoDataMessage() {
  return (
    <Box sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h4">No employees exist.</Typography>
    </Box>
  );
}

export default function Employees() {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmp, setFilteredEmp] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('superAdmin/getAllEmployees');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setAllEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees.');
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = [...allEmployees];
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(employee =>
          employee.categories && employee.categories.includes(selectedCategory)
        );
      }
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
          (item.name?.toLowerCase().includes(searchTermLower) ||
          item.address?.toLowerCase().includes(searchTermLower) ||
          item.description?.toLowerCase().includes(searchTermLower))
        );
      }
      setFilteredEmp(filtered);
    };
    filterData();
  }, [selectedCategory, searchTerm, allEmployees]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const categories = [...new Set(allEmployees.flatMap(employee => employee.categories || []))];

  return (
    <Box>
      <Header title="Employees" subtitle="The information about every employee" />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(2),
          m: "15px 10px 25px 10px",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: colors.primary[400],
        }}
      >
        <Typography variant="h3" sx={{ marginRight: theme.spacing(2) }}>
          Search
        </Typography>
        {/* <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{
            minWidth: 120,
            [theme.breakpoints.up('sm')]: {
              minWidth: 200,
            },
            boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`,
            borderRadius: '4px',
          }}
        >
          <MenuItem value="all">All</MenuItem>
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
          sx={{
            width: '60%',
            color: colors.grey[100],
            backgroundColor: colors.primary[400],
            borderRadius: '4px',
            boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: colors.grey[600],
              },
              '&:hover fieldset': {
                borderColor: colors.primary[500],
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary[500],
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          m: "5px 5px 5px 5px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 1,
        }}
      >
        {filteredEmp.length === 0 ? (
          allEmployees.length === 0 ? (
            <EmployeeCardSkeleton />
          ) : (
            <NoDataMessage />
          )
        ) : (
          filteredEmp.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))
        )}
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}
