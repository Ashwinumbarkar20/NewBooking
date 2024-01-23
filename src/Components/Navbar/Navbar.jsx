import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
export default function Navbar() {
  return (
    <Navbardiv >
     <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu className="ham-menu"/>
          </button>

          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" />
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Patient Stories
                </a>
              </li>
             </ul>
          </div>
<div><button className="book-now">Book Now</button></div>
        </div>
      </nav>
    </Navbardiv>
  )
}
const Navbardiv=styled.div`
nav {
    background-color: var(--surface-color);
    padding: 0;
    height: 50px;   
    color: var(--primary-color);
  }
  .navbar-toggler{
border:1px solid var(--secondary-color);
background-color:var(--surface-color);
&:hover{
    border:1px solid var(--secondary-color);
    filter:brightness(1.3);
       }
  }
  
  .ham-menu{
    background-color:var(--surface-color);
       color: var(--secondary-color);
       &:hover{
        background-color:var(--surface-color);
        color: var(--secondary-color);
       }
  }

  .navbar-brand img {
    width: 99px; 
    height: 35px;
  }

  .navbar-nav .nav-link {
    color: var(--primary-color);
    
    &:hover{
        color: var(--secondary-color);
    }
  }

  .navbar-nav .nav-link.active {
    color: var(--secondary-color);
    
  }
.book-now{
    color:var(--secondary-color);
    padding:5px 10px;
    border-radius:10px;
    border:2px double var(--secondary-color);
    background-color:var(--background-color);
    transition:all 0.3s ease;
    &:hover{
        color:var(--secondary-color);
        font-weight:500;
        border:2px double var(--secondary-color);
    background-color:var(--background-color);
    box-shadow: 0 0 8px rgba(3,218,198,0.8)
    }
}
`