    import React, { useContext, useEffect, useState } from 'react'
    import styled from 'styled-components'
    import { FixhealthContext } from '../../Context'

    export default function Sales() {
      const { availSlots,setAvailSlots } = useContext(FixhealthContext);
      const [selectedDate, setSelectedDate] = useState('');
      const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
      const [uniqueDates, setUniqueDates] = useState([]);
      const [timeSlots, setTimeSlots] = useState([]);
      const [doctorOptions, setDoctorOptions] = useState([]);
      const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
      const [booking, setBooking] = useState({
        date: '',
        timeSlot: null,
        doctor: '', 
        customerName: '',
        remarks: '',
      });
      const [showModal, setShowModal] = useState(false);
      
      useEffect(() => {
        if (selectedDate && selectedTimeOfDay) {
         
            const filteredSlots = availSlots.reduce((acc, user) => {
                const userSlots = user.slots.filter(
                    slot => slot.date === selectedDate && slot.time === selectedTimeOfDay
                );
                return [...acc, ...userSlots];
            }, []);
console.log(filteredSlots)
            
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

   const handleTimeSlotClick = (slot) => {
  setSelectedTimeSlot(slot.slot);
  setBooking({
    ...booking,
    date: selectedDate, // Update booking state with selected date
    timeSlot: slot.slot, // Update booking state with selected time slot
  });
  setShowModal(true);
};



const handleCustomerNameChange = e => {
  const customerName = e.target.value;
  setBooking(prevBooking => ({ ...prevBooking, customerName }));
};

  const filterDoctors = () => {
    if (selectedDate && selectedTimeOfDay) {
      const filteredSlots = availSlots.filter(user =>
        user.slots.some(slot => slot.date === selectedDate && slot.time === selectedTimeOfDay)
      );
      const doctors = Array.from(new Set(filteredSlots.map(user => user.name)));
      setDoctorOptions(doctors);
    }
  };
  
  useEffect(() => {
    filterDoctors();
  }, [selectedDate, selectedTimeOfDay,availSlots]);
  
  // Function to handle doctor selection
  const handleDoctorChange = e => {
    const selectedDoctor = e.target.value;
    setBooking(prevBooking => ({ ...prevBooking, doctor: selectedDoctor }));
  };

  const handleRemarksChange = e => {
    const remarks = e.target.value;
    setBooking(prevBooking => ({ ...prevBooking, remarks }));
  };
      
      const handleTimeOfDayChange = (e) => {
          setSelectedTimeOfDay(e.target.value);
      };
  
      const handleBookingSubmit = () => {
        // Save booking information
        const newBooking = {
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          doctor: booking.doctor,
          customerName: booking.customerName,
          remarks: booking.remarks,
          // Add any other necessary fields here
        };
        console.log('Booking:', newBooking);
      
        // Remove booked slot from available slots
        const updatedAvailSlots = availSlots.map(user => ({
          ...user,
          slots: user.slots.filter(slot => !(slot.date === selectedDate && slot.slot === selectedTimeSlot))
        }));
        setAvailSlots(updatedAvailSlots);
      
        // Reset booking state
        setBooking({
          ...booking, // Preserve existing booking data
          customerName: '', // Reset customer name
          remarks: '', // Reset remarks
        });
        setShowModal(false); // Close the modal
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
                              <SlotItem className="slot-item"key={index} onClick={() => handleTimeSlotClick(slot)}>
                              {slot.slot} -  {slot.qty} slot(S)
                              </SlotItem>
                          ))}
                      </SlotsList>
                  </TimeSlots>
              )}
              {showModal && (
  <BookingModal>
    <h2>Book Slot</h2>
    <p>Selected Date: {selectedDate}</p>
    <p>Selected Time Slot: {selectedTimeSlot}</p>
    <form onSubmit={handleBookingSubmit}>
      <label htmlFor="doctor">Doctor Name:</label>
      <select id="doctor" value={booking.doctor} onChange={handleDoctorChange}>
  <option value="">-- Select Doctor --</option>
  {doctorOptions.map((doctor, index) => (
    <option key={index} value={doctor}>
      {doctor}
    </option>
  ))}
</select>

      <label htmlFor="customerName">Customer Name:</label>
      <input type="text" id="customerName" value={booking.customerName} onChange={handleCustomerNameChange} />
      <label htmlFor="remarks">Remarks:</label>
      <input type="text" id="remarks" value={booking.remarks} onChange={handleRemarksChange} />
      <button type="submit">Book Slot</button>
    </form>
  </BookingModal>
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
  const BookingModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212529;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  h2 {
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    label {
      font-weight: bold;
    }
    input {
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
     border:1px solid var(--accent-color);
      color: var(--accent-color);
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: var(--accent-color);
        color:white;
      }
    }
  }
`;