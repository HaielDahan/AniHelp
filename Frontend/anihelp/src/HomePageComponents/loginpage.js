import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./loginpage.css";
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




function Loginpage({closeModal}) {  
  const[data, setData] = useState({username:'',password:''});
  const[err_message, setErrMessage] = useState('');
  const[err_flag, setErrFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/myapp/auth', data)
      .then(response => {
        const authToken = response.data['detail'];
        localStorage.setItem('authToken', authToken);
        navigate('/userportal');
      })
      .catch(error => {
        setErrMessage('The username or password is incorrect!');
        setErrFlag(true);
        console.error(error);
      });
  }
  
  const handleChange = (e, myKey) =>{
    setData(prevdata=>({...prevdata, [myKey]:e.target.value}))    
  };
    
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='ModalBackground'>
      <div className='modalContainer'>
      <div className='title'>
        <h1>Login</h1>
      </div>
        <form onSubmit={handleSubmit}>
        <label>
              <TextField id="demo-helper-text-aligned" label="User name" value={data.username} onChange={(e) => handleChange(e, 'username')} helperText="Please enter your name" 
              style={{ position: "absolute", left: '37%', top: '25%', display: 'block', width: '50%' }}/>
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned" label="Password" value={data.password} onChange={(e)=>{handleChange(e,'password')}} helperText="Please enter your password" 
              type={showPassword ? 'text' : 'password'} 
              style={{ position: "absolute", left: '37%', top: '50%', display: 'block', width: '50%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </label>
            {err_flag && <p className="errorMessage">{err_message}</p>}
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

