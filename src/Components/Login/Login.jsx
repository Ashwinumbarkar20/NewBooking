import React, { useContext, useEffect } from "react";
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 
import { FixhealthContext } from "../../Context";
import styled from "styled-components";
export default function Login() {

  const { setShowlogin,logindata,handleLoginFormdata,handlelogin,error } = useContext(FixhealthContext);


  const handleback = (e) => {
    e.preventDefault();
    setShowlogin(false);
  };

  
  return (
    <>
      <Maindiv>
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
          <div className="inputdiv">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="" onChange={handleLoginFormdata} value={logindata.email} />
          </div>

          <div className="inputdiv">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" onChange={handleLoginFormdata}  value={logindata.password}/>
          </div>

          <div className="btndiv">
            <button type="submit">Login</button>
            <button type="Back" onClick={handleback}>
              Go Back
            </button>
          </div>
           
        </form>
        <p>{error?"Incorrect Details":""}</p>
        
      </Maindiv>
      <ToastContainer/>
      
    </>
  );
}

const Maindiv = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  margin: 20px auto;
  padding: 20px;
 
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    .inputdiv{
      width:100%;
      input,label{
        width:100%;
        padding:10px;
        
                margin:8px;
      }
      input{
        border-radius:10px;
        border:1px solid grey;
      }
    }
  }

  .btndiv {
    margin: 20px;
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;

    button {
      padding: 10px 15px;
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid white;
      
      transition: all 0.2s ease-in;

      &:hover {
        filter: brightness(1.5);
        font-weight:bolder;
        box-shadow:0 0 8px rgba(255,255,255,0.8);
      }
    }
  }
`;
