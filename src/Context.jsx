/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect } from 'react';
import Login from './Components/Login/Login';
export const FixhealthContext = createContext();

const DataProvider = ({children}) => {
    const [usertype, setUsertype] = useState("");
    const [showlogin, setShowlogin] = useState(false);
    const[isloggedin,setIsloggedin]=useState(false);
    const[error,setError]=useState("");
    const[users,setUsers]=useState([]);
const[logindata,setLoginData]=useState({
    email:"",
    password:""

});

    const handleLoginbtn=(e)=>{
        e.preventDefault()
        setShowlogin(true);
        setLoginData({
            email:"",
            password:""
        
        });

    }
const handleLoginFormdata=(e)=>{
const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
}

    const handlelogin=(e)=>{
        e.preventDefault();
                const user=users.find((u)=>u.username===logindata.email && u.password===logindata.password);
if(!user)
{
    setError(true);
    setUsertype("");
}
else{
    setUsertype(user.role);
    setShowlogin(false);
    setIsloggedin(true);
}
   
    }

    const handleLogout=()=>{
        setUsertype("");
        setShowlogin(false);
        setIsloggedin(false);

    }
    const getusers=async (url)=>{
        try{
            const res =await fetch(url);
            const users=await res.json();
            setUsers(users);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getusers("https://doctordata-9p14.onrender.com/users");


    },[])

    return (
        <FixhealthContext.Provider value={{
        usertype,
        setUsertype,
        handleLoginbtn,
        showlogin, setShowlogin,
        isloggedin,
        setIsloggedin,
        handlelogin,
        handleLogout,
        error,setError,logindata,handleLoginFormdata
        }}>{children}
        </FixhealthContext.Provider>
    );
}
export default DataProvider;
