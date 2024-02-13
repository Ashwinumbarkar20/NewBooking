import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FixhealthContext } from '../../Context'

export default function Sales() {
  const[selectedDoctor,setSelectedDoctor]=useState("");
  const {availSlots}=useContext(FixhealthContext);
  const doctors=availSlots.map((data)=>data.user);
  const daytime = ["Morning", "Afternoon", "Evening"];
  const [currentDoctorSlots,setCurrentDoctorSlots]=useState([]);
 if(selectedDoctor==="Select the Doctor"){setSelectedDoctor("")}

 useEffect(() => {
  if (availSlots && selectedDoctor !== "Select the Doctor") {
    const slot = availSlots.find((data) => data.user === selectedDoctor);
    setCurrentDoctorSlots(slot ? slot.slots : []);
  }
}, [selectedDoctor, availSlots]);

  return (
    <SalesSection>
      <div className='select-Doctor'>
        <h4>Select the Doctor</h4>
        <select name="Doctor" value={selectedDoctor} onChange={(e)=>{setSelectedDoctor(e.target.value)}}>
        <option key="Select the Doctor" value="Select the Doctor">Select the Doctor</option>
   {
  doctors.map((doctor)=> <option key={doctor} value={doctor}>{doctor.slice(0,-11)}</option>)
   }

</select>
      </div>

    {selectedDoctor &&(
      <div className='Time-Zone'>
  <h4>Select Day time</h4>
  <div className='Day-Time'>
  {daytime.map((time) => (
            <span
              className={`day`}
              key={time}
              
            >
              {time}
            </span>
          ))}
          </div>
      </div>
    )}

<div className='Available-Slots'>
<h4>Available time Slots</h4>
<div className='Time-slots-list'>

{currentDoctorSlots.map((slot, index) => (
          <span className="Timeslot"key={index}>{slot.slot}</span>
        ))}

</div>
</div>

    </SalesSection>
  )
}
const SalesSection=styled.section`
height:90vh;
display:flex;
  justify-content:flex-start;
  flex-direction:column;
  align-items:center;
.select-Doctor{
  max-width:50%;
   width:50%;
  padding:10px;
  margin:5px;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  gap:24px;
select{
  padding:5px;
  width:80%;
  border-radius:15px;
  option{
    background-color:#212529;  
    padding:10px;
    margin:5px;
  }
}
}
h4{
  margin:10px;
  text-align:center;
}
.Day-Time {
    display: flex;
    justify-content: center;
    gap: 10px;

    .day {
      border: 1px solid grey;
      margin: 10px;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: var(--accent-color);
      }
    }
  }
  .Available-Slots{
    .Time-slots-list{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      gap:32px;
      margin:10px;
      
      .Timeslot{
      padding:5px;
    cursor: pointer;
      border:1px solid var(--secondary-color);
      border-radius:10px;
      &:hover{
background-color:var(--accent-color);
      }
    }
    }
    h4{
      text-align:center;
      margin:20px;
      padding:10px;
    }
    
  }

`
