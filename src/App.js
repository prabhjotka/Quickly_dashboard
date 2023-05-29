import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

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
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />  
        
  
      </Routes>
    </Router>
  );
};

export default App;
