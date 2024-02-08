import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { FixhealthContext } from '../../Context'
import { FaUserCircle } from "react-icons/fa";
export default function Navbar() {
  
  const {handleLoginbtn,isloggedin,handleLogout,currentUser} =useContext(FixhealthContext);
console.log(currentUser)
  return (
    <Navbardiv >
     <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
     
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" />
          </a>

{currentUser && <div><FaUserCircle style={{fontSize:"24px"}}/><span> {currentUser}</span></div>}
          
<div>
{isloggedin?(<button className="login" onClick={handleLogout}>Logout</button>):
<button className="login" onClick={handleLoginbtn}>Login</button>}

</div>
        </div>
      </nav>
    </Navbardiv>
  )
}
const Navbardiv=styled.div`
.container-fluid{
  height: 70px;
}
nav {
    
    padding: 0;
    height: 70px;   
    color: var(--secondary-color);
  }
  
  .navbar-brand img {
    width: 99px; 
    height: 35px;
  }
 
.login{
    color:var(--secondary-color);
    padding:5px 10px;
    border-radius:10px;
    border:2px solid var(--secondary-color);
    background-color:var(--accent-color);
    transition:all 0.3s ease;
    &:hover{
    filter:brightness(1.30);
       
        
    
    }
}
`