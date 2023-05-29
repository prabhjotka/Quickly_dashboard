

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true);
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Token not found, redirect to login
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user;
        setUser(userData);
        setLoading(false);
        
        console.log(userData);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication state and token from local storage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
   
    navigate('/login');
  };
 

  return (
    <div className="container">
    

    {loading ? (
      <h2>Loading...</h2>
    ) :
    user ? (
        <div>
          <h2>Profile</h2>
          <p className="lead">Name: {user.first_name} {user.last_name}</p>
          <p className="lead">Email: {user.email}</p>
          <p className='lead' >Company: {user.Company.name}</p> 
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (                  
        <h2>401 Unauthorized</h2>
      )}

      
    </div>
  );
};

export default Profile;
