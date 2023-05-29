import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <h2>Signup</h2>
      <form onSubmit={handleSignup} >
        <input
          className="form-control" 
          style={{width:'30%',marginLeft:' 0%'}} 
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'30%',marginLeft:' 0%'}}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'30%',marginLeft:' 0%'}}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          className="form-control"
          style={{width:'30%',marginLeft:' 0%'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        /><br/>
        <input
              className="form-control"
              style={{width:'30%',marginLeft:' 0%'}}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        /><br/>
         <input
               className="form-control"
               style={{width:'30%',marginLeft:' 0%'}}
          type="text"
          placeholder="company name"
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          required
        /><br/>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
