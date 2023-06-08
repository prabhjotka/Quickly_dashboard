
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
      } 
    catch (error) {
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
 

  const renderAdminDashboardButton = () => {
    if (user.email === 'harry@gmail.com') {
      return (
        <div>
         
       <tr><td><button  className="btn btn-primary"  style = {{backgroundColor:'darkcyan'}}onClick={() => navigate('/admin')}>AdminDashboard</button></td>
        <td></td><td><button className='btn btn-secondary'  onClick={handleLogout}>Logout</button></td></tr>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
    

    {loading ? (
      <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    ) :
    user ? (
        <div className='container'>
       
           <p className="lead"><h3>Welcome </h3> {user.first_name} {user.last_name}</p>
          <p className="lead"><h5>Email-ID:</h5> {user.email}</p>
          <p className='lead' ><h5>Company Name:</h5> {user.Company.name}</p> 
          <br/>
        
          {renderAdminDashboardButton()} 
        </div>
      ) : (                  
        <h2>401 Unauthorized</h2>
      )}

      
    </div>
  );
};

export default Profile;


