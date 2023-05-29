
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      //const { user,jwtToken } = response.data
    const{user}=response.data;
      
///console.log(jwtToken);


     

      // // Save authentication state and token in local storage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.data.token);
      console.log('Token saved:', response.data.token);
      //console.log('Token saved:', token);

      navigate('/profile');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2   className="text-left" style={{color:'black',fontWeight:'bold',fontSize:30,marginTop:'5%'}}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
        className="form-control"
        style={{width:'20%',marginLeft:' 0%'}}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
        className="form-control"
        style={{width:'20%',marginLeft:' 0%'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
