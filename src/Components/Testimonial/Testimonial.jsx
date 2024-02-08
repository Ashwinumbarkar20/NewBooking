import React from 'react'
import styled from 'styled-components'
import TestimonialCard from './Card'
export default function Testimonial() {
  return (
    <Maindiv>
    <h1>Testimonial</h1>
      <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" >
    <TestimonialCard
  testimonial={{
    patientName: 'Ankush',
        content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    <div className="carousel-item" >
    <TestimonialCard
  testimonial={{
    patientName: 'Sudarshan',
    
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
        <div className="carousel-item" >
    <TestimonialCard
  testimonial={{
    patientName: 'Amol',
    
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    <div className="carousel-item" >
    <TestimonialCard
  testimonial={{
    patientName: 'Ashish',
    
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    <div className="carousel-item" >
    <TestimonialCard
  testimonial={{
    patientName: 'Ankita',
    
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    <div className="carousel-item ">
    <TestimonialCard
  testimonial={{
    patientName: 'Anup',
   
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    
    <div className="carousel-item">
    <TestimonialCard
  testimonial={{
    patientName: 'Ajay',
    
    content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
    <div className="carousel-item ">
    <TestimonialCard
  testimonial={{
    patientName: 'Anant',
        content: 'I had a great experience with the healthcare services. The staff is friendly, and the facilities are excellent.'
  }}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </Maindiv>
  )
}
const Maindiv=styled.div`
.carousel-item{
 
}
.carousel-control-prev .carousel-control-prev-icon,
.carousel-control-next .carousel-control-next-icon {
  filter: invert(0) grayscale();

}
h1{
    text-align:center;
    margin: 20px;
    color:var(--secondary-color)
}`