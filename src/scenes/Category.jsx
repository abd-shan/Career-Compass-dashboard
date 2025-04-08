import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  IconButton,
  TextField,
  Button,
  useTheme,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/Api'; 
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export default function Category() {
  const theme = useTheme();
  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    background: theme.palette.background.default,
  };
  const navigate =useNavigate();

  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/statics/all_categories');
      return response.data;
    }
  });

  if (isError) {
    return <Typography variant="h4" color="error">Error loading categories: {error.message}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 4 }}>
      <Box display="flex" m="10px" justifyContent={"space-between"}>
      <Typography variant="h3" gutterBottom sx={{ color: colors.textPrimary, fontWeight: 'bold' }}>
        Categories and its Subcategories
      </Typography>
      <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home/add-category')}
            sx={{
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.secondary,
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
              }
            }}
          >
            Back to Add Category
          </Button>

      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        categories?.length > 0 ? (
          categories.map((category) => (
            <CategoryAccordion key={category.id} category={category} colors={colors} />
          ))
        ) : (
          <Typography variant="body1" sx={{ color: colors.textSecondary }}>
            No categories available.
          </Typography>
        )
      )}
    </Box>
  );
}

function CategoryAccordion({ category, colors }) {
  const queryClient = useQueryClient();
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [newName, setNewName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  

  const { data: subcategories, isLoading } = useQuery({
    queryKey: ['subcategories', category.id],
    queryFn: async () => {
      const response = await api.get(`/statics/get_subcategories/${category.id}`);
      return response.data;
    },
    enabled: !!category.id
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/sub-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subcategories', category.id]);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, name, categoryId }) => {
      await api.patch(`/sub-categories/${id}`, { name, categoryId });
    },
    onSuccess: () => {
      setEditingSubcategory(null);
      queryClient.invalidateQueries(['subcategories', category.id]);
    }
  });

  const addMutation = useMutation({
    mutationFn: async ({ name, categoryId }) => {
      await api.post('/sub-categories', { name, categoryId });
    },
    onSuccess: () => {
      setNewSubcategoryName('');
      queryClient.invalidateQueries(['subcategories', category.id]);
    }
  });

  const handleEditClick = (subcategory) => {
    setEditingSubcategory(subcategory);
    setNewName(subcategory.name);
  };

  const handleUpdate = () => {
    if (editingSubcategory) {
      updateMutation.mutate({ id: editingSubcategory.id, name: newName, categoryId: category.id });
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategoryName.trim()) {
      addMutation.mutate({ name: newSubcategoryName, categoryId: category.id });
    }
  };

  return (
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: colors.textPrimary }} />}
      >
        <Typography variant="h3" sx={{ color: colors.textPrimary }}>
          {category.name}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ pl: 2 }}>
            {subcategories?.length > 0 ? (
              subcategories.map((subcategory) => (
                <Box key={subcategory.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  {editingSubcategory?.id === subcategory.id ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        size="small"
                        sx={{
                          mr: 2,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          '& .MuiOutlinedInput-root': {
                            color: colors.textPrimary,  
                            '& fieldset': {
                              borderColor: colors.textPrimary,  
                            },
                            '&:hover fieldset': {
                              borderColor: colors.primary,  
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: colors.primary,  
                            },
                            '&.Mui-focused': {
                              color: colors.textPrimary, 
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: colors.textSecondary, 
                            '&.Mui-focused': {
                              color: colors.primary, 
                            },
                          },
                        }}
                        InputLabelProps={{
                          style: { color: colors.textSecondary },
                        }}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingSubcategory(null)}
                        sx={{ ml: 1 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={{ color: colors.textSecondary, flexGrow: 1 }}>
                      {subcategory.name}
                    </Typography>
                  )}
                  <Box sx={{ ml: 2 }}>
                    <IconButton
                      color="success"
                      onClick={() => handleEditClick(subcategory)}
                    >
                      <EditIcon  />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteMutation.mutate(subcategory.id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                No subcategories available.
              </Typography>
            )}

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
              <TextField
                label="New Subcategory"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                // size="small"
                sx={{
                  mr: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '& .MuiOutlinedInput-root': {
                    color: colors.textPrimary,  
                    '& fieldset': {
                      borderColor: colors.textPrimary,  
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary,  
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary,  
                    },
                    '&.Mui-focused': {
                      color: colors.textPrimary, 
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.textSecondary, 
                    '&.Mui-focused': {
                      color: colors.primary, 
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSubcategory}
              >
                Add
              </Button>
            </Box>
          </Box>
        )}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}
