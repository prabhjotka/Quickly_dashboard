import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate,Outlet } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Admin from './components/AdminDashboard';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import CompanyView from './components/CompanyView';
import UsersView from './components/UsersView';
import InvoiceView from './components/InvoiceView';
import Companydetails from './components/Companydetails';
import UserDetails  from './components/Userdetails';
import InvoiceDetails from './components/InvoiceDetails';


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



  return (
    
    <Router>
      <div class="shadow p-3 mb-4 bg-body-tertiary rounded">
        <h1 className="text-center" style={{marginTop:'10px',backgroundColor:'darkcyan',color:'white'}} ><i class="fas fa-building"></i>Quickly Inc.</h1></div>
     <div className="App"   style={{marginTop:'20px'}}>
      
      </div>

      

      <Routes>    
        <Route path="/" element={<Layout/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invoices" element={<InvoiceView/>} />
        <Route path="/companies" element={<CompanyView/>} />
        <Route path="/users" element={<UsersView/>} />

        <Route path="/admin" element={<Admin/>}>
        <Route path="admin/invoices" element={<InvoiceView/>} />
        <Route path="admin/users" element={<UsersView/>} />
          <Route path="admin/companies" element={<CompanyView/>} />
        
         
         </Route>
       
         <Route path="/invoiced/:unique_identifier" element={<InvoiceDetails />} />
         <Route path="/invoicedetails/:unique_identifier" element={<InvoiceDetails />} />
         <Route path="/invoiced/:unique_identifier" element={<InvoiceDetails />} />
         <Route path="/companydetails/:name"  element={<Companydetails />} />
         <Route path="/userdetails/:id"  element={<UserDetails/>} />


        

      </Routes>
    </Router>
  );
};

export default App;      