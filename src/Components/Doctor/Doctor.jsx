import React from "react";
import styled from "styled-components";
import timeSlots from "../../Slots.json";
export default function Doctor() {
  const days = [
    "Monday",
    "Tuesday",
    "Wedenesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const daytime = ["Morning", "Afternoon", "Evening"];

  return (
    <Mainsection>
      <div className="Appointments">Appointments</div>

      <div className="Slot-Availiblity">

        <p style={{ textAlign: "center", color: `var(--accent-color)` }}>
          Select the Day
        </p>

        <div className="Days">
          {days.map((day) => (
            <span className="day" key={day}>
              {day.slice(0, 3)}
            </span>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: `var(--accent-color)`,
            margin: "10px",
          }}
        >
          Select Time Zone
        </p>

        <div className="Day-Time">
          {daytime.map((time) => (
            <span className="day" key={time}>
              {time}
            </span>
          ))}
        </div>

        <div className="time-Slots">
          <p
            style={{
              textAlign: "center",
              color: `var(--accent-color)`,
              margin: "10px",
            }}
          >
            Select Time slot
          </p>
          <ul className="time-slot-list">
            {timeSlots.morning.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      <div className="save"><button>Save Availblity</button></div>
      </div>

       
      
    </Mainsection>
  );
}
const Mainsection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  height: 90vh;
  padding: 10px;

  .Appointments {
    width: 30%;
    height: 100%;
    background-color: grey;
  }

  .Slot-Availiblity {
    width: 80%;
    height: 100%;
    display:flex;
    justify-content:space-evenly;
    flex-direction:column;
    align-items:center;
    
  }
  .Days,
  .Day-Time {
    display: flex;
    justify-content: center;
    gap: 10px;

    .activeday {
      background-color: var(--accent-color);
    }

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

  .time-Slots {
    max-width: 100%;
    max-height: 40%;
  }
  ul {
    width: 100%;
    height: 80%;
        display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    gap: 24px;
    overflow-x: auto;
    overflow-y: auto;
        li {
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 5px 10px;
      border-radius: 5px 10px;
      &:hover {
        background-color: var(--accent-color);
      }
    }
  }
  .save{
button{
  padding:5px 10px;
  background-color:var(--accent-color);
border-radius:15px;
border:1px solid var(--primary-color);
}
  }
`;
