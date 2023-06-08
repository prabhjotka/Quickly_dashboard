import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate,Outlet } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Admin from './components/AdminDashboard';
import axios from 'axios';

import  { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import CompanyView from './components/CompanyView';
import UsersView from './components/UsersView';
import InvoiceView from './components/InvoiceView';
import Container from 'react-bootstrap/Container';
import Links from './components/Links';
import Layout from './Layout'


const App = () => {


  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (isAuthenticated && token) {
        try {
          const response = await axios.get('https://api-dev.quicklyinc.com/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data.user;
          setUser(userData);
          console.log(userData)
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated]);


  

isAuthenticated?<Profile />:<Login />

  // const PrivateRoute = ({ element, ...rest }) => {
  //   return isAuthenticated ? (
  //     element
  //   ) : (
  //     <Navigate to="/login" state={{ from: rest.location.pathname }} replace />
  //   );
  // };


  return (
    
    <Router>
      <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="text-center" style={{marginTop:'10px',backgroundColor:'darkcyan',color:'white'}} ><i class="fas fa-building"></i>Quickly Inc.</h1></div>
     <div className="App"   style={{marginTop:'20px'}}>
      
      </div>

      

      <Routes>    
        <Route path="/" element={<Layout/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/admin" element={<Admin/>}>
        <Route path="admin/invoices" element={<InvoiceView/>} />
        <Route path="admin/users" element={<UsersView/>} />
          <Route path="admin/companies" element={<CompanyView/>} />
        
         
         </Route>
       
        
      </Routes>
    </Router>
  );
};

export default App;
