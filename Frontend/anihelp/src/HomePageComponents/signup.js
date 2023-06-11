import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Prev } from 'react-bootstrap/esm/PageItem';
import "./signup.css";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, InputLabel } from '@mui/material';


const Signup = ({closeSignUpModal}) =>{
  const[data, setData] = useState({username:'',email:''
                                  ,password:'',password2:''
                                  ,name:'',gender:''
                                  ,age:'',place:''
                                  ,prefix:'',phone:''});


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/myapp/accounts', data)
      .then(response => {
        console.log(response.data);
        setData({username:'', email:'', password:'', password2:'', name:'', gender:'', age:'', place:'', prefix:'', phone:''});
      })
      .catch(error => {
        console.error(error);
      });  
    }

  const handleChange = (e, myKey) =>{
    setData(prevdata=>({...prevdata, [myKey]:e.target.value}))    
  }
  useEffect(()=>{console.log(data)} ,[data])
  

    return (
    <div>
      <div className='sModalBackground'>
        <div className='smodalContainer'>
          <div className='stitle'>
            <h1>Sign Up</h1>
          </div>
          <form className='form-container' onSubmit={handleSubmit}>
            <label>
            
            <TextField id="demo-helper-text-aligned" label="User name" value={data.username} onChange={(e) => handleChange(e, 'username')} helperText="Please enter your name" 
              style={{ position: "absolute", left: '25%', top: '10%', display: 'block', width: '50%' }}/>
             {/*  <input type="text" id="input1" placeholder="Enter your user name" value={data.username} onChange={(e)=>{handleChange(e,'username')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} helperText="Please enter your email" 
              style={{ position: "absolute", left: '43%', top: '10%', display: 'block', width: '50%' }}/>
              {/* <input type="email" placeholder="Enter your email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} /> */}
            </label>
            <br />
            <label>
            <TextField id="demo-helper-text-aligned" label="Password" value={data.password} onChange={(e)=>{handleChange(e,'password')}} helperText="Please enter your password" 
              style={{ position: "absolute", left: '25%', top: '26%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your password" value={data.password} onChange={(e)=>{handleChange(e,'password')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Confirm Password" value={data.password2} onChange={(e)=>{handleChange(e,'password2')}} helperText="Please Confirm your password" 
              style={{ position: "absolute", left: '43%', top: '26%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your password agin" value={data.password2} onChange={(e)=>{handleChange(e,'password2')}} /> */}
            </label>
            <br />
            <label>
            <TextField id="demo-helper-text-aligned-no-helper" label="Name" value={data.name} onChange={(e)=>{handleChange(e,'name')}} helperText="Please enter your Name" 
              style={{ position: "absolute", left: '61%', top: '10%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your name" value={data.name} onChange={(e)=>{handleChange(e,'name')}}  /> */}
            </label>
            <br />
            <label> 
            <FormControl component="fieldset" style={{ position: "absolute", left: '25%', top: '39%', display: 'block', width: '50%' }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" value={data.gender} onChange={(e)=>{handleChange(e,'gender')}}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup> 
            </FormControl>
              {/* <input type="text" placeholder="Enter your gender" value={data.gender}onChange={(e)=>{handleChange(e,'gender')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Age" value={data.age} onChange={(e)=>{handleChange(e,'age')}} helperText="Please enter your Age" 
              style={{ position: "absolute", left: '25%', top: '53%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your age" value={data.age} onChange={(e)=>{handleChange(e,'age')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Place" value={data.place} onChange={(e)=>{handleChange(e,'place')}} helperText="Please enter your Place" 
              style={{ position: "absolute", left: '43%', top: '53%', display: 'block', width: '50%' }}/>
              {/* <input type="text" placeholder="Enter your place" value={data.place} onChange={(e)=>{handleChange(e,'place')}}  /> */}
            </label>
            <br />
            <label>
               
            <FormControl fullWidth style={{ position: "absolute", left: '25%', top: '68%', display: 'block', width: '50%' }}>
              <InputLabel id="demo-simple-select-label">prefix</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Prefix" value={data.prefix} onChange={(e)=>{handleChange(e,'prefix')}}>
              <MenuItem value="050">050</MenuItem>
              <MenuItem value="052">052</MenuItem>
              <MenuItem value="053">053</MenuItem>
              </Select>
            </FormControl>
               
              {/* <input type="tel" placeholder="Enter your prefix" value={data.prefix} onChange={(e)=>{handleChange(e,'prefix')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Phone" value={data.phone} onChange={(e)=>{handleChange(e,'phone')}} helperText="Please enter your Phone" 
              style={{ position: "absolute", left: '43%', top: '68%', display: 'block', width: '50%' }}/>
              {/* <input type="tel" placeholder="Enter your phone" value={data.phone} onChange={(e)=>{handleChange(e,'phone')}}  /> */}
            </label>
            <br />
            <button className='submitSBtn' type="submit">Submit</button>
          </form>
          <div className='cancelSBtn'>
            <button onClick={()=>closeSignUpModal(false)}>cancel</button>
            {/* <button onClick={()=>navigate("/")}>Back Home</button> */}
          </div>
      </div>
    </div>
  </div>
  );
}

export default Signup;


 // let navigate = useNavigate();