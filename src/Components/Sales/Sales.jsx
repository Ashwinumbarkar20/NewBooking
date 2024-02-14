    import React, { useContext, useEffect, useState } from 'react'
    import styled from 'styled-components'
    import { FixhealthContext } from '../../Context'

    export default function Sales() {
      const { availSlots } = useContext(FixhealthContext);
      const [selectedDate, setSelectedDate] = useState('');
      const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
      const [uniqueDates, setUniqueDates] = useState([]);
      const [timeSlots, setTimeSlots] = useState([]);
  
      
      useEffect(() => {
        if (selectedDate && selectedTimeOfDay) {
         
            const filteredSlots = availSlots.reduce((acc, user) => {
                const userSlots = user.slots.filter(
                    slot => slot.date === selectedDate && slot.time === selectedTimeOfDay
                );
                return [...acc, ...userSlots];
            }, []);

            
            const uniqueSlots = {};
            filteredSlots.forEach(slot => {
                const key = slot.slot;
                if (uniqueSlots[key]) {
                    uniqueSlots[key].qty += 1;
                } else {
                    uniqueSlots[key] = { ...slot, qty: 1 };
                }
            });
       
            const uniqueSlotArray = Object.values(uniqueSlots);

            setTimeSlots(uniqueSlotArray);
        }
    }, [selectedDate, selectedTimeOfDay, availSlots]);
      useEffect(() => {
        
        const dates = Array.from(new Set(availSlots.flatMap(user => user.slots.map(slot => slot.date))));
        const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
        setUniqueDates(sortedDates);
    }, [availSlots]);
  
      
      const handleDateChange = (e) => {
          setSelectedDate(e.target.value);
           setSelectedTimeOfDay('');
          setTimeSlots([]);
      };
  
      
      const handleTimeOfDayChange = (e) => {
          setSelectedTimeOfDay(e.target.value);
      };
  
      return (
          <SalesSection>

               <DateSelector>
                <h4 htmlFor="date">Select Date</h4>
                <select id="date" value={selectedDate} onChange={handleDateChange}>
                    <option value="">-- Select Date --</option>
                    {uniqueDates.map(date => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </DateSelector>

              {selectedDate && (
                  <TimeOfDaySelector>
                      <h4 htmlFor="timeOfDay">Select Time of Day</h4>
                      <select
                          id="timeOfDay"
                          value={selectedTimeOfDay}
                          onChange={handleTimeOfDayChange}
                      >
                          <option value="">-- Select Time of Day --</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Evening">Evening</option>
                      </select>
                  </TimeOfDaySelector>
              )}

              {selectedDate && selectedTimeOfDay && (
                  <TimeSlots>
                      <h3>Available Time Slots</h3>
                      <SlotsList>
                          {timeSlots.map((slot, index) => (
                              <SlotItem className="slot-item"key={index}>
                              {slot.slot} -  {slot.qty} slot(S)
                              </SlotItem>
                          ))}
                      </SlotsList>
                  </TimeSlots>
              )}

          </SalesSection>
      );
  }
  
  const SalesSection = styled.section`
  display:flex;
  margin:auto;
  padding:10px;
  max-width:90vh;
  height:90vh;
  justify-content:flex-start;
  align-items:center;
  flex-direction:column;
  gap:24px;
  
  
  `;
  
  const DateSelector = styled.div`
      margin-bottom: 20px;
      text-align:center;
      display:flex;
      flex-direction:column;
      gap:18px;
      select{
        padding:10px;
        border:1px solid var(--secondary-color);
        border-radius:15px;
      }
      option{
        background-color:#212529;
        text-align:center;
        padding:50px;

      }
  `;
  
  const TimeOfDaySelector = styled.div`
      margin-bottom: 20px;
      text-align:center;
      display:flex;
      flex-direction:column;
      gap:18px;
      select{
        padding:10px;
        border:1px solid var(--secondary-color);
        border-radius:15px;
        
      }
      option{
        background-color:#212529;
        text-align:center;
      }
  `;
  
  const TimeSlots = styled.div`
      max-width:80%;
      width:80%;
      overflow-y:auto; 
      
      display:flex;
      justify-content:center;

      align-items:center;
      flex-direction:column;
      gap:24px;
      `;
  
  const SlotsList = styled.ul`
      list-style: none;
      padding: 0;
      display:flex;
      flex-wrap: wrap;
      justify-content:center;
      align-items:center;
      gap:8px;
  `;
  
  const SlotItem = styled.li`
      
      font-size: 14px;
      margin-bottom: 5px;
      border:1px solid var(--secondary-color);
      text-align:center;
      padding:10px 15px;
      cursor: pointer;

      border-radius:10px;
      &:hover{
        background-color:var(--accent-color);

      }
      
  `;