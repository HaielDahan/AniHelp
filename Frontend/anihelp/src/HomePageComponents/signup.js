import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./signup.css";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, InputLabel } from '@mui/material';



const Signup = ({closeSignUpModal}) =>{
  const[data, setData] = useState({username:'',email:''
                                  ,password:'',password2:''
                                  ,name:'',gender:''
                                  ,age:'',place:''
                                  ,prefix:'',phone:''});

  const[err_message, setErrMessage] = useState('');
  const[err_flag, setErrFlag] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/myapp/accounts', data)
      .then(response => {
        if (response.status === 201) {
          // console.log(response.data);
          setData({username:'', email:'', password:'', password2:'', name:'', gender:'', age:'', place:'', prefix:'', phone:''});
          window.alert('The account was created successfully');
          closeSignUpModal(false);
        }
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
            
            <TextField id="demo-helper-text-aligned" label="User name" value={data.username} onChange={(e) => handleChange(e, 'username')} helperText="Enter your name" 
              style={{ position: "absolute", left: '10%', top: '10%', display: 'block'}}/>
             {/*  <input type="text" id="input1" placeholder="Enter your user name" value={data.username} onChange={(e)=>{handleChange(e,'username')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} helperText="Enter your email" 
              style={{ position: "absolute", left: '37%', top: '10%', display: 'block'}}/>
              {/* <input type="email" placeholder="Enter your email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} /> */}
            </label>
            <br />
            <label>
            <TextField id="demo-helper-text-aligned" label="Password" value={data.password} onChange={(e)=>{handleChange(e,'password')}} helperText="Enter your password" 
              style={{ position: "absolute", left: '10%', top: '26%', display: 'block'}}/>
              {/* <input type="text" placeholder="Enter your password" value={data.password} onChange={(e)=>{handleChange(e,'password')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Confirm Password" value={data.password2} onChange={(e)=>{handleChange(e,'password2')}} helperText="Confirm your password" 
              style={{ position: "absolute", left: '37%', top: '26%', display: 'block'}}/>
              {/* <input type="text" placeholder="Enter your password agin" value={data.password2} onChange={(e)=>{handleChange(e,'password2')}} /> */}
            </label>
            <br />
            <label>
            <TextField id="demo-helper-text-aligned-no-helper" label="Name" value={data.name} onChange={(e)=>{handleChange(e,'name')}} helperText="Enter your Name" 
              style={{ position: "absolute", left: '64%', top: '10%', display: 'block' }}/>
              {/* <input type="text" placeholder="Enter your name" value={data.name} onChange={(e)=>{handleChange(e,'name')}}  /> */}
            </label>
            <br />
            <label> 
            <FormControl component="fieldset" style={{ position: "absolute", left: '10%', top: '41%', display: 'block'}}>
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
              <TextField id="demo-helper-text-aligned-no-helper" label="Age" value={data.age} onChange={(e)=>{handleChange(e,'age')}} helperText="Enter your Age" 
              style={{ position: "absolute", left: '10%', top: '68%', display: 'block'}}/>
              {/* <input type="text" placeholder="Enter your age" value={data.age} onChange={(e)=>{handleChange(e,'age')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Place" value={data.place} onChange={(e)=>{handleChange(e,'place')}} helperText="Enter your Place" 
              style={{ position: "absolute", left: '37%', top: '68%', display: 'block' }}/>
              {/* <input type="text" placeholder="Enter your place" value={data.place} onChange={(e)=>{handleChange(e,'place')}}  /> */}
            </label>
            <br />
            <label>
               
            <FormControl fullWidth style={{ position: "absolute", left: '10%', top: '53%', display: 'block' }}>
              <InputLabel id="demo-simple-select-label">prefix</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Prefix" value={data.prefix} onChange={(e)=>{handleChange(e,'prefix')}} helperText="Enter your prefix" >
              <MenuItem value="050">050</MenuItem>
              <MenuItem value="052">052</MenuItem>
              <MenuItem value="053">053</MenuItem>
              </Select>
            </FormControl>
               
              {/* <input type="tel" placeholder="Enter your prefix" value={data.prefix} onChange={(e)=>{handleChange(e,'prefix')}}  /> */}
            </label>
            <br />
            <label>
              <TextField id="demo-helper-text-aligned-no-helper" label="Phone" value={data.phone} onChange={(e)=>{handleChange(e,'phone')}} helperText="Enter your Phone" 
              style={{ position: "absolute", left: '37%', top: '53%', display: 'block' }}/>
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