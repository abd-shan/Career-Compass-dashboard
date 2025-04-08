import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/Api';
import { token } from '../Theme';

export default function EditExam() {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const col =token(theme.palette.mode);

  const id = Number(idParam);

  const [exam, setExam] = useState({
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        // Update URL here to match backend endpoint
        const response = await api.get(`/exams/${id}`);
        const data = response.data; // Assuming response.data is the object, not an array
        setExam(...data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading exam data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam((prevExam) => ({ ...prevExam, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Update URL here to match backend endpoint
      await api.patch(`exams/${id}`, exam);
      alert('Exam updated successfully');
      navigate('/home/exam-list');
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update exam');
    }
  };

  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.paper,
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    border: theme.palette.primary.light,
    focusBorder: theme.palette.primary.dark,
  };

  if (isLoading) return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>;
  if (isError) return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Error loading exam data</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: '80%',
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 4,
        backgroundColor: col.primary[400],
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: colors.textPrimary }}>
        Edit Exam
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Question"
          name="question"
          value={exam.question || ''}
          onChange={handleChange}
          fullWidth
          {...{
            sx: {
              '& .MuiInputBase-root': { color: colors.textPrimary },
              '& .MuiInputLabel-root': { color: colors.textSecondary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.border },
                '&.Mui-focused fieldset': { borderColor: colors.focusBorder },
              },
              '& .MuiInputBase-input': {
                backgroundColor: col.primary[400],
              },
            },
          }}
        />
        <Divider />
        <TextField
          label="Option A"
          name="a"
          value={exam.a || ''}
          onChange={handleChange}
          fullWidth
        />
        <Divider />
        <TextField
          label="Option B"
          name="b"
          value={exam.b || ''}
          onChange={handleChange}
          fullWidth
        />
        <Divider />
        <TextField
          label="Option C"
          name="c"
          value={exam.c || ''}
          onChange={handleChange}
          fullWidth
        />
        <Divider />
        <TextField
          label="Option D"
          name="d"
          value={exam.d || ''}
          onChange={handleChange}
          fullWidth
        />
        <Divider />
        <TextField
          label="Answer"
          name="answer"
          value={exam.answer || ''}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/home/exam-list')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
