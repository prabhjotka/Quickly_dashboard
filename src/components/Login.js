
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/login', {
        email,
        password,
      });
      console.log('API response:', response.data);

      // // Save authentication state and token in local storage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.data.token);
      console.log('Token saved:', response.data.token);
      //console.log('Token saved:', token);
     
      
        navigate('/profile');
      
      
    } catch (error) {
      console.log('Error:', error);

      setError('Invalid email or password');
    }
  };

  return (
    <div className='container' style={{marginTop:'5%'}}>
   
     
      <form onSubmit={handleLogin} className='login-form'> 
      <h2  align='center' style={{color:'black',fontWeight:'bold',fontSize:30 ,marginTop:'5%' }}>Log in to your Account</h2>
       <label style={{color:'black',fontSize:20 ,marginTop:'5%', marginLeft:'10%' }}>Email</label> <input
        className="form-control"
        style={{width:'80%',marginLeft:' 10%',marginTop:'3%'}}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>
         <label style={{color:'black',fontSize:20 ,marginTop:'5%', marginLeft:'10%' }}>Password</label>
          <input className="form-control"
        style={{width:'80%',marginLeft:' 10%' ,marginTop:'1%'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        {error && <p className="error">{error}</p>}

        <div class="d-grid gap-2 col-10 mx-auto">
        <button class="btn btn-primary" type="submit" >Log in to your Account</button>
   </div>
      <br/>
      <p className="mt-3" style={{align:'center'}}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      </form>
    </div>
  );
};

export default Login;



