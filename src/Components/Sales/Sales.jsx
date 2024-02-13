    import React, { useContext, useEffect, useState } from 'react'
    import styled from 'styled-components'
    import { FixhealthContext } from '../../Context'

    export default function Sales() {
      const[selectedDoctor,setSelectedDoctor]=useState("");
      const {availSlots}=useContext(FixhealthContext);
      const doctors=availSlots.map((data)=>data.user);
      const daytime = ["Morning", "Afternoon", "Evening"];
      const [currentDoctorSlots,setCurrentDoctorSlots]=useState([]);
      const [availableDates, setAvailableDates] = useState([]);
      const [selectedTimeZone, setSelectedTimeZone] = useState("");
      const [selectedDate,setSelectedDate]=useState("");
    if(selectedDoctor==="Select the Doctor"){setSelectedDoctor("")}

    useEffect(() => {
      if (availSlots && availSlots.length > 0 && selectedDoctor !== "" && selectedDate !== "") {
        const slot = availSlots.find((data) => data.user === selectedDoctor);
        if (slot) {
          let filteredSlots = slot.slots.filter((slot) => slot.date === selectedDate);
          if (selectedTimeZone !== "") {
            filteredSlots = filteredSlots.filter((slot) => slot.time === selectedTimeZone);
          }
          setCurrentDoctorSlots(filteredSlots);
        } else {
          setCurrentDoctorSlots([]);
        }
      }
    }, [selectedDoctor, selectedDate, selectedTimeZone, availSlots]);

    useEffect(() => {
      
      const dates = [...new Set(availSlots.flatMap((data) => data.slots.map((slot) => slot.date)))];
      setAvailableDates(dates);
    }, [availSlots]);

    const handleDoctorChange = (e) => {
      const value = e.target.value;
      setSelectedDoctor(value === "Select the Doctor" ? "" : value);
      setSelectedDate("");
      setCurrentDoctorSlots([]);
    };
      return (
        <SalesSection>
      <div className='select-Doctor'>
        <h4>Select the Doctor</h4>
        <select name="Doctor" value={selectedDoctor} onChange={handleDoctorChange}>
          <option key="Select the Doctor" value="">Select the Doctor</option>
          {doctors.map((doctor) => <option key={doctor} value={doctor}>{doctor.slice(0, -11)}</option>)}
        </select>
      </div>

      {selectedDoctor && (
        <div className='select-Date'>
          <h4>Select Date</h4>
          <select name="Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option key="Select Date" value="">Select Date</option>
            {availableDates.map((date) => <option key={date} value={date}>{date}</option>)}
          </select>
        </div>
      )}

      {selectedDoctor && selectedDate && (
        <div className='Time-Zone'>
          <h4>Select Time Zone</h4>
          <div className='Day-Time'>
            {daytime.map((time) => (
              <span
                className={`day ${selectedTimeZone === time ? 'selected' : ''}`}
                key={time}
                onClick={() => setSelectedTimeZone(time)}
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDoctor && selectedDate && currentDoctorSlots.length > 0 && (
        <div className='Available-Slots'>
          <h4>Available Time Slots for {selectedDate}</h4>
          <div className='Time-slots-list'>
            {currentDoctorSlots.map((slot, index) => (
              <div className="Timeslot" key={index}>
                <p>Time: {slot.slot}</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
