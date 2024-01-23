import React from 'react'
import styled from 'styled-components'
import Hero from '../../assets/Hero.mp4'
import Appointment from '../../Components/AppointmentForm/Appointment'
export default function Herosection() {
  return (
    <Herodiv>
      
      <video src={Hero} autoPlay muted loop></video>
      <div className='Herosectiondiv'>
         <div className='Headingdiv'>
      
      <h1 className='subHeading'>{`"QUALITY CARE FOR A BETTER QUALITY OF LIFE”`}</h1>
      </div>
               
         <Appointment className="Appointment-form"/>
        
      
      </div>
    </Herodiv>
  )
}
const Herodiv=styled.section`
position:relative;
height:85vh;
width:100%;

video{
    height:100%;
    width:100%;
    object-fit:cover;
    filter: brightness(30%);
 
}
.Herosectiondiv{
    position:absolute;
    display:flex;
    
    padding:10px;
    background-color:transparent;   
    height:100%;
    width:100%;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:space-evenly;

   .Headingdiv{
    /* border:1px solid red; */
   align-items:center;
    
  background-color:transparent;
    border-radius:35px; 
    h1,h4{
        line-height:2;
        text-align:center;
        color:var(--secondary-color);
        background-color:transparent;
    }
   }
       
}
@media (max-width: 600px) {
    .Headingdiv{
        display:none;
    }
    .Appointment-form{
      width: 90%;
    }
  }
`