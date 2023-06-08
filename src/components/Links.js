import React from 'react';
import{Link}   from 'react-router-dom';

export default function Links(){
    return(
        <div>
<nav>
        
          
            <Link to="/login"></Link>
              <br/>
        
            <Link to="/signup"></Link>
          
         
          
            <Link to="/profile"></Link>
          
            <Link to="/admin"></Link>
            
          
          
          
    
      </nav>

        </div>
    )
}