import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
export default function Navbar() {
  return (
    <Navbardiv >
     <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
     

          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" />
          </a>

          
<div><button className="book-now">Book Now</button></div>
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
    background-color: var(--primary-color);
    padding: 0;
    height: 70px;   
    color: var(--secondary-color);
  }
  
  .navbar-brand img {
    width: 99px; 
    height: 35px;
  }

 
 
.book-now{
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