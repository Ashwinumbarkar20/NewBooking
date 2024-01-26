import React from 'react';
import styled from 'styled-components';
import happyface from '../../assets/happyface.jpg'
const TestimonialCard = ({ testimonial }) => {
  const { patientName,  content } = testimonial;

  return (
    <CardContainer>
    <Innercard>
      <PatientInfo>
        <PatientName>{patientName}</PatientName>
       <Imgdiv><img src={happyface} alt="" /></Imgdiv>
      </PatientInfo>
      <TestimonialContent>{content}</TestimonialContent>
      </Innercard>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  height:100%;
  width:100%;
  
 display:flex;
 justify-content:center;
  

`
const Innercard=styled.div`
background-color: var(--primary-color);
  border: 1px solid var(--secondary-color);
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   height:350px;
  width:350px;
`
const Imgdiv = styled.div`
width:150px;
height:150px;
border-radius:100%;

img{
height:100%;
width:100%;
border-radius:100%;
object-fit:cover;
}
`
const PatientInfo = styled.div`
  display: flex;
  background-color: var(--primary-color);
  height:200px;
  justify-content: space-evenly;
  flex-direction:column;
  align-items:center;
  margin-bottom: 10px;
`;

const PatientName = styled.h3`
  font-size: 18px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
`;



const TestimonialContent = styled.p`
  font-size: 16px;
  background-color: var(--primary-color);
  width:100%;
  text-align:center;
 
  color: var(--secondary-color);
  background-color: var(--primary-color);
`;

export default TestimonialCard;