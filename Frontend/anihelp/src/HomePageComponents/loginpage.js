import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./loginpage.css";
import {TextField } from '@mui/material';




function Loginpage({closeModal}) {
  // const [data, setData] = useState([]);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [userDetails, setUserDetails] = useState(null);
  // let navigate = useNavigate();
  
  const[data, setData] = useState({username:'',password:''});

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/myapp/auth', data)
      .then(response => {
        console.log(response.data);
        const authToken = response.data['detail'];
        localStorage.setItem('authToken', authToken);
        // Perform any necessary actions after successful login
        navigate('/userportal'); // Navigate to the new page
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  const handleChange = (e, myKey) =>{
    setData(prevdata=>({...prevdata, [myKey]:e.target.value}))    
  }
  // useEffect(()=>{console.log(data)} ,[data])
    
  return (
    <div className='ModalBackground'>
      <div className='modalContainer'>
      <div className='title'>
        <h1>Login</h1>
      </div>
        <form onSubmit={handleSubmit}>
        <label>
              <TextField id="demo-helper-text-aligned" label="User name" value={data.username} onChange={(e) => handleChange(e, 'username')} helperText="Please enter your name" 
              style={{ position: "absolute", left: '40%', top: '31%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your user name" value={data.username} onChange={(e)=>{handleChange(e,'username')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned" label="Password" value={data.password} onChange={(e)=>{handleChange(e,'password')}} helperText="Please enter your password" 
              style={{ position: "absolute", left: '40%', top: '45%', display: 'block', width: '50%' }}/>
              {/* <input type="email" placeholder="Enter your email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} /> */}
            </label>
          <button className='submitBtn' type="submit">Submit</button>
        </form>
          <div className='cancelBtn'>
           <button onClick={()=>closeModal(false)}>cancel</button>
          {/* <button onClick={()=>navigate("/")}>Back Home</button> */}
          </div>
      </div>
    </div>
  );
}

export default Loginpage;

