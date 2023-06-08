import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[companyname , setCompanyname]   =  useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        company: {
            name:companyname
            }
            
      });

      const { user, jwtToken } = response.data;

      // Save authentication state and token in local storage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', jwtToken);
     // console.log('Data sent to API:', response.data);
      
      navigate('/profile');
    } 
    catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div>

      <form onSubmit={handleSignup}  className='login-form' style={{height:'100%',width:'50%',marginTop:'0%',marginLeft:'25%'}}>
      <h3>Sign up to create an account</h3><br/>
      <h6>Already have an account? <a href="/login">Log in here</a></h6>
        <input
          className="form-control" 
          style={{width:'90%',marginLeft:' 5%'}} 
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'90%',marginLeft:' 5%'}}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'90%',marginLeft:' 5%'}}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'90%',marginLeft:' 5%'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        /><br/>
        <input
              className="form-control"
              style={{width:'90%',marginLeft:' 5%'}}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        /><br/>
         <input
               className="form-control"
               style={{width:'90%',marginLeft:' 5%'}}
          type="text"
          placeholder="company name"
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          required
        /><br/>
        {error && <p className="error">{error}</p>}

        <div class="d-grid gap-2 col-11 mx-auto">
        <button class="btn btn-primary" type="submit">Sign up</button>
   </div>
      
      </form>
    </div>
  );
};

export default Signup;
