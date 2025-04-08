import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api'; // افترض أن لديك هذا الملف لإدارة الطلبات

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.paper,
    textPrimary: theme.palette.getContrastText(theme.palette.primary.main),
    textSecondary: theme.palette.text.secondary,
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await api.get('/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error.response ? error.response.data : error.message);
      }
    };

    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/exams/${id}`);
      setExams(exams.filter(exam => exam.id !== id));
      alert('Exam deleted successfully');
    } catch (error) {
      console.error('Error deleting exam:', error.response ? error.response.data : error.message);
      alert('Failed to delete exam');
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: '90%',
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 4,
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
        backgroundColor: colors.background,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: colors.textPrimary }}>
            All Exams
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home/add-exam')}
            sx={{
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.secondary,
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
              }
            }}
          >
            Back to Add Exam
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: colors.primary }}>
              <TableRow>
                <TableCell sx={{ color: colors.textPrimary }}>Question</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Option A</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Option B</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Option C</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Option D</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Answer</TableCell>
                <TableCell sx={{ color: colors.textPrimary }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map(exam => (
                <TableRow key={exam.id} sx={{ backgroundColor: theme.palette.background.default }}>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.question}</TableCell>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.a}</TableCell>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.b}</TableCell>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.c}</TableCell>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.d}</TableCell>
                  <TableCell sx={{ color: colors.textSecondary }}>{exam.answer}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        color="success"
                        onClick={() => navigate(`/home/edit-exam/${exam.id}`)}
                        sx={{
                          '&:hover': {
                            backgroundColor: `${colors.primary}22`,
                            borderRadius: 2,
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(exam.id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: `${colors.secondary}22`,
                            borderRadius: 2,
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
