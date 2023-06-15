import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Admin() {
 
  const navigate = useNavigate();

  const handleLogout1 = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return(
      <>

<div style={{
                    display: "flex",
                    background: 'black',
                    padding: '5px 0 5px 5px',
                    fontSize: '20px'
                }}>



<div style={{ margin: '10px' }}>
                        <NavLink to="admin/invoices" style={({ isActive }) => ({ 
                            color: isActive ? 'darkcyan' : 'white' })}>
                        Invoice View
                        </NavLink>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <NavLink to="admin/users" style={({ isActive }) => ({ 
                            color: isActive ? 'darkcyan' : 'white' })}>
                  Users View 
                        </NavLink>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <NavLink to="admin/companies" style={({ isActive }) => ({ 
                            color: isActive ? 'darkcyan' : 'white' })}>
                          Compaines View
                        </NavLink>
                    </div>
                    
                    <div style ={{marginLeft:'850px',marginRight:'5px',marginTop:'5px',marginBottom:'5px'}}> 
                    <button   class="btn btn-link"  type="button" onClick={handleLogout1}>Signout</button>
      
                    </div>
                </div>

   {/* <h3>Admin Dashboard</h3> */}


   
 {/* <h3 style={{color:"blue"}}>Welcome{user.first_name} {user.last_name}</h3> */}

      {/* <nav>
        
            <Link to="admin/invoices">Invoice Page</Link>
            <br/>
         
            <Link to="admin/users">User View Page</Link>
          <br/>
            <Link to="admin/companies">Company View Page</Link>
        
      </nav> */}
      

<Outlet/>
        </>

    )
        
    
}

