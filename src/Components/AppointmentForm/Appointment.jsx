import React, {useEffect,useState}from 'react'
import styled from 'styled-components'
export default function Appointment() {
    const [step, setStep] = useState(1);
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

      const fetchDoctors = async () => {
        try {
          // Fetch data from your API endpoint
          // Replace this with the actual URL of your API
        //   const response = await fetch('https://your-api-endpoint/doctors');
        //   const data = await response.json();
    
          setDoctors(data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };

      useEffect(() => {
        // Fetch doctors when the component mounts
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
        if (step < 3) {
          setStep((prevStep) => prevStep + 1);
        } else {
          // Perform logic to filter doctors based on city
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
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          
          <label>
            Phone Number
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
          </label>
        </div>
      )}
      {step === 2 && (
        <div className='form=data'>
          <label>
            Age
            <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
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
          <br />
          <label>
            Any Previous Experience with Physiotherapy:
            <input
              type="checkbox"
              name="experience"
              checked={formData.experience}
              onChange={handleCheckboxChange}
            />
          </label>
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
      {/* <button className='previous' onClick={handlePreviousStep} disabled={step === 1} >
        Previous
      </button>
      <button className='next' onClick={handleNextStep} disabled={step === 3}>
        Next
      </button> */}
      </div>
      
      {step === 3 && (
        <div>
          <h3>Available Doctors in {formData.city}:</h3>
          <ul>
            {filteredDoctors.map((doctor) => (
              <li key={doctor.id}>
                {doctor.name} - {doctor.expertise}
              </li>
            ))}
          </ul>
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