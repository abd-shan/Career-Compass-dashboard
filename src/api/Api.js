import axios from 'axios';
import { useEffect, useState } from 'react';

export const url = 'http://localhost:8080/';

const api = axios.create({
  baseURL: url,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
  
};

export const fetchJobs = async () => { // Rename function for clarity
  const response = await api.get("superAdmin/jobs");
  if (response.status !== 200) {
    throw new Error('Network response was not ok'); 
  }
  return response.data; // Return data directly
};



export default api;


