import * as React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  Divider,
  DialogContentText,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Grid
} from '@mui/material';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useQuery } from '@tanstack/react-query';
import api from '../api/Api';
import { token } from "../Theme";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import admin2 from '../asset/admin2.png';

export default function AddExam() {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  const [formState, setFormState] = useState({
    subcategoryId: '',
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: ''
  });

  const { data: subcategories, isLoading, isError, error } = useQuery({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const response = await api.get('/sub-categories/');
      return response.data;
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/exams', formState);
      setDialogType("success");
      setDialogMessage("Exam created successfully!");
      setDialogOpen(true);
      
    } catch (error) {
      let message = error.response?.data?.message || "An error occurred";   
      console.error('Error adding exam:', error.response ? error.response.data : error.message);
      setDialogType("warning");
      setDialogMessage(message);
      setDialogOpen(true);
    }
  };

  return (
    <Box>
      <Header title={"Add new exam"} subtitle={"You can add exams for each subcategory, e.g., backend developer or graphic design."}/>
      <Box display="flex" m="0px">
        <Box
          component="img"
          src={admin2}
          alt="logo"
          sx={{
            width: "40%",
            height: "auto",
            marginRight: "20px",
            borderRadius: "10px", 
          }}
        />
        <Card
          variant="outlined"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            mt: 4,
            p: 3,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(#1F2A40, #0c101b, #040509)'
              : 'linear-gradient(#ffffff, #f0f0f0)',
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            color: colors.grey[100]
          }}
        >
          <CardContent>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary" />
              </Box>
            ) : isError ? (
              <Typography color="error">Error fetching subcategories: {error.message}</Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="subcategory-label" sx={{ color: colors.grey[100] }}>Select Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-label"
                    name="subcategoryId"
                    value={formState.subcategoryId}
                    onChange={handleChange}
                    label="Select Subcategory"
                    sx={{
                      backgroundColor: colors.primary[400],
                      color: colors.grey[200],
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: colors.primary[600],
                      },
                      '& .MuiSelect-select': {
                        color: colors.grey[200],
                      },
                      '& .MuiInputLabel-root': {
                        color: colors.grey[100],
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: colors.grey[300],
                        },
                        '&:hover fieldset': {
                          borderColor: colors.greenAccent[500],
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.greenAccent[500],
                        },
                      }
                    }}
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory.id} value={subcategory.id}
                      sx={{
                        color: colors.grey[200], 
                        '&:hover': {
                          backgroundColor: colors.primary[600], 
                          color: colors.grey[100], 
                        },
                        '&:focus':{
                          backgroundColor: colors.primary[600], 
                          color: colors.grey[100], 
                         
                        }
                      }}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Question"
                  name="question"
                  value={formState.question}
                  onChange={handleChange}
                  sx={{
                    mb: 3,
                    backgroundColor: colors.primary[500],
                    color: colors.grey[200],
                    borderRadius: 2,
                    '& .MuiInputLabel-root': { color: colors.grey[100] },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: colors.grey[300],
                      },
                      '&:hover fieldset': {
                        borderColor: colors.greenAccent[500],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.greenAccent[500],
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.grey[200],
                    }
                  }}
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Option A"
                      name="a"
                      value={formState.a}
                      onChange={handleChange}
                      sx={{
                        mb: 3,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[200],
                        borderRadius: 2,
                        '& .MuiInputLabel-root': { color: colors.grey[100] },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.grey[300],
                          },
                          '&:hover fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: colors.grey[200],
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Option B"
                      name="b"
                      value={formState.b}
                      onChange={handleChange}
                      sx={{
                        mb: 3,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[200],
                        borderRadius: 2,
                        '& .MuiInputLabel-root': { color: colors.grey[100] },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.grey[300],
                          },
                          '&:hover fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: colors.grey[200],
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Option C"
                      name="c"
                      value={formState.c}
                      onChange={handleChange}
                      sx={{
                        mb: 3,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[200],
                        borderRadius: 2,
                        '& .MuiInputLabel-root': { color: colors.grey[100] },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.grey[300],
                          },
                          '&:hover fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: colors.grey[200],
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Option D"
                      name="d"
                      value={formState.d}
                      onChange={handleChange}
                      sx={{
                        mb: 3,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[200],
                        borderRadius: 2,
                        '& .MuiInputLabel-root': { color: colors.grey[100] },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.grey[300],
                          },
                          '&:hover fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[500],
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: colors.grey[200],
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  fullWidth
                  label="Correct Answer"
                  name="answer"
                  value={formState.answer}
                  onChange={handleChange}
                  sx={{
                    mb: 3,
                    backgroundColor: colors.primary[500],
                    color: colors.grey[200],
                    borderRadius: 2,
                    '& .MuiInputLabel-root': { color: colors.grey[100] },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: colors.grey[300],
                      },
                      '&:hover fieldset': {
                        borderColor: colors.greenAccent[500],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.greenAccent[500],
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.grey[200],
                    }
                  }}
                />
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: colors.greenAccent[500],
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
                      }
                    }}
                  >
                    Add Exam
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/home/exam-list')}
                    sx={{
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      color: colors.greenAccent[500],
                      borderColor: colors.greenAccent[500],
                      '&:hover': {
                        backgroundColor: colors.greenAccent[50],
                        borderColor: colors.greenAccent[500],
                        color: colors.greenAccent[700],
                      }
                    }}
                  >
                    View All Exams
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
        
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ borderRadius: 4 }}
        >
          <DialogTitle 
            id="alert-dialog-title"
            sx={{ 
              backgroundColor: dialogType === "success" ? colors.greenAccent[500] : colors.redAccent[500],
              color: colors.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px 4px 0 0'
            }}
          >
            <Box display="flex" alignItems="center">
              {dialogType === "success" ? <CheckCircleOutlineIcon sx={{ mr: 1 }} /> : <WarningOutlinedIcon sx={{ mr: 1 }} />}
              <Typography variant="h5">{dialogType === "success" ? "Success" : "Warning"}</Typography>
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3, textAlign: 'center' }}>
            <DialogContentText id="alert-dialog-description" sx={{ color: colors.grey[100] }}>
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              sx={{ 
                color: `${colors.greenAccent[700]}`, 
                mx: 'auto',
                '&:hover': {
                  backgroundColor: colors.greenAccent[500],
                } 
              }} 
              onClick={handleCloseDialog} 
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
