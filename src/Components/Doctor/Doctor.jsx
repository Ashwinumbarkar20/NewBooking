import React, { useContext, useState } from "react";
import styled from "styled-components";
import timeSlots from "../../Slots.json";
import { FixhealthContext } from "../../Context";
export default function Doctor() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDaytime, setSelectedDaytime] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const daytime = ["Morning", "Afternoon", "Evening"];
  const { getNextWeekDates,setAvailSlots,currentUser } = useContext(FixhealthContext);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    
  };

  const handleDaytimeSelect = (time) => {
    setSelectedDaytime(time);
    //setSelectedTimeSlots([]);
  };

  const handleTimeSlotSelect = (slot) => {
    const isSlotSelected = selectedTimeSlots.some(
      (selectedSlot) =>
        selectedSlot.date === selectedDate.toDateString() &&
        selectedSlot.time === selectedDaytime &&
        selectedSlot.slot === slot
    );
  
    if (isSlotSelected) {
      // Remove the slot if already selected
      setSelectedTimeSlots((prevSelectedSlots) =>
        prevSelectedSlots.filter(
          (selectedSlot) =>
            !(selectedSlot.date === selectedDate.toDateString() &&
              selectedSlot.time === selectedDaytime &&
              selectedSlot.slot === slot)
        )
      );
    } else {
      // Add the slot if not already selected
      setSelectedTimeSlots((prevSelectedSlots) => [
        ...prevSelectedSlots,
        { date: selectedDate.toDateString(), time: selectedDaytime, slot },
      ]);
    }
  };

  const renderTimeSlots = () => {
    if (selectedDaytime === "Morning") {
      return timeSlots.morning.map((slot) => (
        <li
          key={slot}
          className={
            selectedTimeSlots.some(
              (selectedSlot) =>
                selectedSlot.date === selectedDate.toDateString() &&
                selectedSlot.time === selectedDaytime &&
                selectedSlot.slot === slot
            )
              ? "active"
              : ""
          }
          onClick={() => handleTimeSlotSelect(slot)}
        >
          {slot}
        </li>
      ));
    } else if (selectedDaytime === "Afternoon") {
      return timeSlots.afternoon.map((slot) => (
        <li
          key={slot}
          className={
            selectedTimeSlots.some(
              (selectedSlot) =>
                selectedSlot.date === selectedDate.toDateString() &&
                selectedSlot.time === selectedDaytime &&
                selectedSlot.slot === slot
            )
              ? "active"
              : ""
          }
          onClick={() => handleTimeSlotSelect(slot)}
        >
          {slot}
        </li>
      ));
    } else if (selectedDaytime === "Evening") {
      return timeSlots.evening.map((slot) => (
        <li
          key={slot}
          className={
            selectedTimeSlots.some(
              (selectedSlot) =>
                selectedSlot.date === selectedDate.toDateString() &&
                selectedSlot.time === selectedDaytime &&
                selectedSlot.slot === slot
            )
              ? "active"
              : ""
          }
          onClick={() => handleTimeSlotSelect(slot)}
        >
          {slot}
        </li>
      ));
    } else {
      return null;
    }
  };

  const saveAvailblity = () => {
    setAvailSlots((prev) => [...prev, { user: currentUser, slots: selectedTimeSlots }]);
  };
  

  const days = getNextWeekDates();

  return (
    <Mainsection>
      <div className="Appointments">Appointments</div>

      <div className="Slot-Availiblity">
        <p style={{ textAlign: "center", color: `var(--accent-color)` }}>
          Select the Day
        </p>

        <div className="Days">
          {days.map((day) => (
            <span
              style={{ textAlign: "center" }}
              className={`day ${
                selectedDate &&
                selectedDate.toDateString() === day.toDateString()
                  ? "active"
                  : ""
              }`}
              key={day}
              onClick={() => handleDateSelect(day)}
            >
              {day.toDateString()}
            </span>
          ))}
        </div>

        {handleDateSelect && (
          <>
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
                <span
                  className={`day ${selectedDaytime === time ? "active" : ""}`}
                  key={time}
                  onClick={() => handleDaytimeSelect(time)}
                >
                  {time}
                </span>
              ))}
            </div>
          </>
        )}

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

          <ul className="time-slot-list">{renderTimeSlots()}</ul>
        </div>

        <div className="save">
          <button onClick={saveAvailblity}>Save Availblity</button>
        </div>
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
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }
  .Days,
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
  .save {
    button {
      padding: 5px 10px;
      background-color: var(--accent-color);
      border-radius: 10px;
      border: 1px solid var(--primary-color);
    }
  }
  .active {
    background-color: var(--accent-color);
  }
`;
