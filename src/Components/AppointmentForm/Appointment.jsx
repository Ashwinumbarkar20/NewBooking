import React, {useEffect,useState}from 'react'
import styled from 'styled-components'
export default function Appointment() {
    const [step, setStep] = useState(1);
    const [Error,setError]=useState("");
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        age: '',
        city: '',
        company: '',
        chiefComplaints: '',
        experience: false, 
        
        
      });
      const [doctors, setDoctors] = useState([]);
      const [filteredDoctors, setFilteredDoctors] = useState([]);
      const TimeSlots=['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

      const formatTimeSlot = (timeSlot) => {
        
        return timeSlot;
      };

    

      const fetchDoctors = async () => {
        try {
          const response = await fetch('https://doctordata-9p14.onrender.com/Doctors');
          const data = await response.json();
    
          setDoctors(data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };

      useEffect(() => {
        
        fetchDoctors();
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
      };
    
      const handleNextStep = () => {
        if (step < 3 ||step < 2) {
          if (formData.name.trim() === '' || formData.phone.trim() === '') {
            setError("Please fill in all the required fields");
          } else if (!/^\+91 \d+$/.test(formData.phone)) {
            setError("Phone should start with '+91' and contain only numbers");
          } else {
            setError(""); 
            setStep((prevStep) => prevStep + 1);
            const filtered = doctors.filter((doctor) => doctor.city === formData.city);
            setFilteredDoctors(filtered);
          }
          
          
        } else {
          setStep((prevStep) => prevStep + 1);
          const filtered = doctors.filter((doctor) => doctor.city === formData.city);
          setFilteredDoctors(filtered);
        }
      };
    
      const handlePreviousStep = () => {
        if (step > 1) {
          setStep((prevStep) => prevStep - 1);
        }
      };
    
      const handleSubmit = () => {
        // Perform submission logic here (e.g., sending data to the server)
        console.log('Form data submitted:', formData);
      };
    
  return (
    <Formdiv className='Appointment-form'>
      
      <h2>Booking Form - Step {step}</h2>
      {step === 1 && (
        <div className='form-data'>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
          </label>
          
          <label>
            Phone Number
            <input type="text" name="phone" maxLength="14" value={formData.phone === '' ? '+91 ' : formData.phone} onChange={handleInputChange} required/>
          </label>
          <p>{Error}</p>
        </div>
      )}
      {step === 2 && (
        <div className='form=data'>
          <label>
            Age
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
          </label>
          
          <label>
            City
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
          </label>
          
          <label>
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
          </label>
        </div>
      )}
      {step === 3 && (
        <div className='form-data'>
          <label>
            Chief Complaints:
            <textarea
              name="chiefComplaints"
              value={formData.chiefComplaints}
              onChange={handleInputChange}
            />
          </label>
          {formData.age<40&&(<label>
            Any Previous Experience with Physiotherapy:
            <input
              type="checkbox"
              name="experience"
              checked={formData.experience}
              onChange={handleCheckboxChange}
            />
          </label>)}

          
        </div>
      )}
      <div className='btn-div' style={{"background-color": "var(--surface-color)"}}>

    {(step==1)?

    <>
    <button className='next' onClick={handleNextStep} disabled={step === 3}>
        Next
      </button>
    </>

:(step==2)?<>
    (<button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button>
      <button className='next' onClick={handleNextStep} disabled={step === 3}>
        Next
      </button>)
</>
   :(step==3)?<><button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button></>:null    
    }
            </div>
      
      {step === 3 && (
  <div>
    {filteredDoctors.length === 0 ? (
      "Doctor's Not Available in this City, Please choose Nearest city"
    ) : (
      <div>
        <h3>Available Doctors in {formData.city}</h3>
        <label>Select Time Slot:</label>
        <select
          name="selectedTimeSlot"
          value={formData.selectedTimeSlot}
          onChange={handleInputChange}
        >
          <option value="">Select a time slot</option>
          {/* Add options dynamically based on available timings */}
          {TimeSlots.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {formatTimeSlot(timeSlot)}
            </option>
          ))}
        </select>
        <ul>
          {filteredDoctors.map((doctor) => (
            <li key={doctor.id}>
              {doctor.name} - {doctor.expertise}
              {/* Display doctor's available timings */}
              <div>
                <strong>Available Timings:</strong>
                {doctor.availableTimings.map((timeSlot) => (
                  <span key={timeSlot}>{formatTimeSlot(timeSlot)}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
      {step === 3 && <button className='submitbtn' onClick={handleSubmit}>Submit</button>}
    
    </Formdiv>
  )
}
const Formdiv=styled.div`
 max-width: 600px;
 width:450px;
 gap:5px;
  margin: 50px auto;
 padding:10px;
 display:flex;
 justify-content:space-around;
 align-items:center;
 flex-direction:column;
 
  background-color: var(--surface-color);
  border-radius: 10px;
  border:2px solid var(--secondary-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    background-color: var(--surface-color);
    padding:10px;
    color:var(--secondary-color);
  }

  .form-data {
    margin-bottom: 5px;
    background-color: var(--surface-color)
  }

  label {
    display: block;
      text-align:center;
      background-color: var(--surface-color);
    padding:5px;
   
    color:var(--secondary-color);
    
  }

  input,
  textarea {
    width: 90%;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background-color:transparent;
    border-radius: 5px;
    color:var(--error-color)
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #333;
  }

  .checkbox-label input {
    margin-right: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: var(--secondary-color);
    font-weight:bold;
    color: var(--surface-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &.previous {
      margin-right: 10px;
    }

    &.submitbtn {
      background-color: #28a745;
    }
  }

  /* Additional Styles for the Doctor List */

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
    color: #333;
  }
  @media (max-width: 600px) {
    .Appointment-form{
      width: 80%;
    }
  }
`