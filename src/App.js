import { CircularProgress, CssBaseline, Divider, ThemeProvider, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes,  Outlet, useNavigate } from "react-router-dom";
import { token,colorModeContext,useMode } from "./Theme";


import TopBar from "./scenes/global/TopBar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/Team";
import Contact from"./scenes/Contact";
import Companies from"./scenes/Companies";
import Employees from"./scenes/Employees";
import Jobs from "./scenes/Jobs"
import Pie from"./scenes/Pie";
import Line from "./scenes/Line";
import Geography from"./scenes/Geography";
import Calendar from"./scenes/Calendar"
import Login from "./login/Login";
import SideBar from "./scenes/global/SideBar";
import Register from "./register/Register";
import React, { useEffect, useState } from "react";
import Help from "./scenes/Notifications";
import "./App.css"
import Form from "./scenes/Form";
import Bar from "./scenes/Bar";
import { Box } from "@mui/material";

import Profile from "./scenes/Profile";
import Request from "./scenes/requestJobs";
import Upgrade from "./scenes/Upgrade";
import AddStatic from "./scenes/AddCategory";
import AddExam from './scenes/AddExam';
import ExamList from './scenes/ExamList';
import Category from './scenes/Category';
import ExamEdit from './scenes/ExamEdit';
import NotificationsBox from "./scenes/Notifications";
import NotificationDetail from "./scenes/NotificationDetail";




const DashboardLayout = ()=>{
 const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  

  return(
    <div className="app">
      <SideBar className={`sidebar ${isSidebarOpen ? "open" : "closed"}` } toggleSidebar={toggleSidebar} />
      <main className={`main-content-${isSidebarOpen ? "open" : "closed"}`  }>
        <TopBar className={`topbar ${isSidebarOpen ? "open" : "closed"}` }  />
        <Divider/>
        <Outlet/>
       {
       useEffect(
        ()=>{
          navigate("home/dashboard");}
        ,[])
        }
       

      </main>

    </div>
  );
}

function App() {

  const [theme, colorMode] = useMode();
  const isLoggedIn = localStorage.getItem('access_token');
  const [isLoading, setIsLoading] = useState(true); 
  const colors= token(theme.palette.mode);


  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: `${colors.primary[500]}`, 
          }}
        >
          <CircularProgress
            size={100}
            color="success" 
            sx={{
              marginBottom: '20px',
              animation: 'spin 1.5s linear infinite' 
            }}
          />
          <Typography variant="h5" sx={{
            color:`${colors.grey[200]}`
          }}>
          Loading...
          </Typography>
        </Box>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
       
          <CssBaseline />

          <Routes>
            <Route path={"/register"} element={<Register/>}></Route>
          <Route
              path="/"
              element={isLoggedIn ?
                (

                <DashboardLayout/>
              ) : (
                
                <Login />
              )}
            >

            <Route  path={"home/dashboard"} element={<Dashboard/>}/>
            <Route path="home/team" element={<Team/>}/>
            <Route path="home/requests" element={<Request/>}/>
            <Route path="home/upgrade" element={<Upgrade/>} />
            <Route path="home/contact" element={<Contact/>}/>
            <Route path="home/companies" element={<Companies/>}/>
            <Route path="home/employees" element={<Employees/>}/>
            <Route path="home/jobs" element={<Jobs/>}/>
            <Route path={"home/team"} element={<Team/>} />
            <Route path="home/pie" element={<Pie/>}/>
            <Route path="home/line" element={<Line/>}/>
            <Route path="home/geography" element={<Geography/>}/>
            <Route path="home/notification" element={<NotificationsBox/>}/>
            <Route path="home/calendar" element={<Calendar/>}/>
            <Route path="home/newAdmin" element={<Form/>} />
            <Route path={"home/bar"} element={<Bar/>} />
            <Route path="home/add-category" element={<AddStatic/>}/>
            <Route path="profile" element={<Profile/> } />
            <Route path="/home/add-exam" element={<AddExam />} />
            <Route path="/home/exam-list" element={<ExamList />} />
            <Route path="/home/category" element={<Category/>}/>
            <Route path="home/edit-exam/:id" element={<ExamEdit />} />
            <Route path="/home/notifications/:id" element={<NotificationDetail />} />


            </Route>

          </Routes>

        </ThemeProvider>
      </colorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;

