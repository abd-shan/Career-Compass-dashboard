import { Box,  MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import Card from "../components/Card";

import React, { useEffect, useState } from "react";
import { token } from "../Theme";
import api from "../api/Api";
import Header from "../components/Header";
export default function Companies(){
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]); 
  const [error,setError]=useState(null);
  const [companies,setCompanies]=useState([]);
  const [isLoading,setIsLoading]=useState(true);


  useEffect(
    ()=>{
    const fetchData = async()=>{
      try{
        const response = await api.get('superAdmin/getAllCompanies');
        if(response.status!==200)
          throw new Error('Network response was not ok');
        setCompanies(response.data);
        console.log(response.data)

      }
      catch(error){
        setError(error);
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchData();

  },[])




useEffect(()=>{
  const filterData = () => {
    let filtered = [...companies];


    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        return (
          item.company_name?.toLowerCase().includes(searchTermLower) ||
          item.address?.toLowerCase().includes(searchTermLower) ||
          item.description?.toLowerCase().includes(searchTermLower)
        );
      });
    }
    setFilteredCompanies(filtered);
 

  }
  filterData();
}, [searchTerm,companies]); 


  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value)
  //   ;
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  // const categories = [...new Set(companiesData.map(company => company.category))];


  return(
    <Box>
      <Header title={"Our Companies"} subtitle={""}></Header>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'space-between',
          padding: theme.spacing(2),
          m:"15px 10px 25px 10px",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: colors.primary[400],
        }}
      >
   
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}

          style={{
            width: '60%',
            color: colors.grey[200],
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            />
      </Box>
    <Box
      sx={{
        m:"5px 5px 5px 5px",
        display:"grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        gap:2
      }}
  >
      {filteredCompanies.map((company, index) => (
        <Card key={index} data={company} />
      ))}
    </Box>
         </Box>
  );
}
