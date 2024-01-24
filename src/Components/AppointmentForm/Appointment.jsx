import React, {useEffect,useState}from 'react'
import styled from 'styled-components'

const ConfirmationComponent = ({ formData,goback }) => {
  const { name, date, timeSlot, dr } = formData;

  return (
    <Confirmationdiv className="confirmation">
      <p>
        Dear {name}, your booking has been confirmed on {date} at {timeSlot} with
        {dr}.
      </p>
      <div><span onClick={goback}>Go, Back</span> </div>
    </Confirmationdiv>
  );
};


export default function Appointment() {
    const [step, setStep] = useState(1);
    const [Error,setError]=useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        age: '',
        city: '',
        company: '',
        chiefComplaints: '',
        date:'',
        experience: false, 
        dr:'',
        timeSlot:''
        
      });
      let isStep3Complete =
      formData.dr !== '' &&
      formData.date !== '' &&
      formData.timeSlot !== '';

      const [doctors, setDoctors] = useState([]);
      const [filteredDoctors, setFilteredDoctors] = useState([]);
      const TimeSlots=['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      const cities=["Pune","Mumbai","Delhi","Bengaluru","Jaipur","New Delhi","Chennai"];
const goback=()=>{
  setStep(1);
  setFormData({
      name: '',
      phone: '',
      age: '',
      city: '',
      company: '',
      chiefComplaints: '',
      date:'',
      experience: false, 
      dr:'',
      timeSlot:''
      
    })
}
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
          } else if (!/^\d+$/.test(formData.phone)) {
            setError("Phone number contain only numbers");
          } 
          else if (step === 2 && (isNaN(formData.age) || formData.age <= 0)) {
            setError("Please enter a valid age");
          } else if (step === 2 && formData.city === '') {
            setError("Please select a city")}
          
          else {
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
          isStep3Complete=false;
          setError("");
          setStep((prevStep) => prevStep - 1);
        }
      };
      const handleSubmit = () => {
          
        console.log('Form data submitted:', formData);
        setIsSubmitted(true);
        // setFormData({
        //   name: '',
        //   phone: '',
        //   age: '',
        //   city: '',
        //   company: '',
        //   chiefComplaints: '',
        //   date:'',
        //   experience: false, 
        //   dr:'',
        //   timeSlot:''
          
        // })
      };
    
  return (
    <>
    <Formdiv className='Appointment-form'>
    {isSubmitted ? (
      <ConfirmationComponent formData={formData} goback={goback}/>
    ):(
      <>
       <h2>Booking Form - Step {step}</h2>
      {step === 1 && (
        <div className='form-data'>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
          </label>
          
          <label>
            Phone Number
            <div style={{ display: 'flex', alignItems: 'center',background:"inherit" }}>
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleInputChange}
      style={{ marginRight: '2px',"width":"30%" }}
    >
      <option value="+91">+91</option>
     
    </select>
    <input
      type="tel"
      name="phone"
      maxLength="10"
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="Enter 10-digit number"
      style={{ marginRight: '2px',"width":"70%" }}
      required
    />
  </div>
            </label>  
          <p className='Error'>{Error}</p>
        </div>
      )}
      {step === 2 && (
        <div className='form=data'>
          <label>
            Age
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} required/>
          </label>
          
          <label>
            City
            <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a City</option>
          
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>           
          </label>
                <label>
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
          </label>
          <p className='Error'>{Error}</p>
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
            <input
              type="checkbox"
              name="experience"
              checked={formData.experience}
              onChange={handleCheckboxChange}
            />
            Any Previous Experience?
            
          </label>)}

          
        </div>
      )}
      <div className='btn-div' style={{"background-color": "var(--surface-color)"}}>

    {(step==1)?
        <button className='next' onClick={handleNextStep} disabled={step === 3}>
        Next
      </button>
   
    :(step==2)?<>
    (<button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button>
      <button className='next' onClick={handleNextStep} disabled={step === 3}>
        Next
      </button>)
      </>
   :null    
    }
            </div>
      
            {step === 3 && (
  <div className='DrAvailablity'>
    {filteredDoctors.length === 0 ? (
      <div className='btn-div'>
      <button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button>
      <p className='Not-available'>"Doctor's Not Available in this City, Please choose Nearest city"</p></div>
      
    ) : (
      <div className='Slot-Booking'>
       
        <label>Select Doctor Slot:
        <select
          name="dr"
          value={formData.dr}
          onChange={handleInputChange}
        >
          <option value="">Select a Doctor</option>
          
          {filteredDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
        </label>
        
        
        <label>Select Date:
       <input type="date" name="date" value={formData.date}  onChange={handleInputChange} />
        </label>
                
        <label>Select Time Slot:
        <select
          name="timeSlot"
          value={formData.timeSlot}
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
        </label>
        
        {isStep3Complete ?
      
      (<div className='btn-div'>
        <button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button>
        <button className='submitbtn' onClick={handleSubmit}>Submit</button>
        
      </div>
      ):
      (step==3)?<div className='btn-div'><button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button></div>:null  }  
      </div>  
    )}
  </div>
)}
</>)
    }
    </Formdiv>
    </>
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
.Error{
  text-align:center;
  color:red;
  height:auto;  
  background-color:var(--surface-color);
}
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
  textarea,select {
    width: 90%;
    padding: 5px;
    margin: 5px;
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


 
  @media (max-width: 600px) {
    .Appointment-form{
      width: 80%;
    }
  }

  .DrAvailablity{
    background-color:var(--surface-color);
    margin:10px;

.Not-available{
  font-weight:400;
  text-align:center;
  background-color:var(--surface-color);
  color:var(--error-color);
}
  }
  .btn-div{
    background-color:var(--surface-color);
    display:flex;
    justify-content:center;
    align-items:center;

  }
`
const Confirmationdiv=styled.div`
background-color:transparent;

p{
  background-color:transparent;
  width:100%;
  padding:5px;
  color:var(--error-color);
  background-color:transparent;
}
div{
span{
  text-align:center;
  background-color:var(--surface-color);
  width:100%;
  padding:5px;
  color:var(--error-color);
  background-color:transparent;
}
}
`