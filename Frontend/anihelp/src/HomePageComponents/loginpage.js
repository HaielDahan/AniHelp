// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import "./loginpage.css";
// import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';




// function Loginpage({closeModal}) {
//   // const [data, setData] = useState([]);
//   // const [name, setName] = useState('');
//   // const [email, setEmail] = useState('');
//   // const [phone, setPhone] = useState('');
//   // const [userDetails, setUserDetails] = useState(null);
//   // let navigate = useNavigate();
  
//   const[data, setData] = useState({username:'',password:''});

//   const handleSubmit = (event) => { 
//     event.preventDefault();
//     axios.post('http://127.0.0.1:8000/auth', data)
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

  
//   // const { data } = await axios.post('http://127.0.0.1:8000/auth',
//   //   {
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     },
//   //       username: loginData.username,
//   //       password: loginData.password
//   //   },);


//   const handleChange = (e, myKey) =>{
//     setData(prevdata=>({...prevdata, [myKey]:e.target.value}))    
//   }
//   useEffect(()=>{console.log(data)} ,[data])
    
  
//   return (
//     <div className='ModalBackground'>
//       <div className='modalContainer'>
//       <div className='title'>
//         <h1>Login</h1>
//       </div>
//         <form onSubmit={handleSubmit}>
//         <label>
//               <TextField id="demo-helper-text-aligned" label="User name" value={data.username} onChange={(e) => handleChange(e, 'username')} helperText="Please enter your name" 
//               style={{ position: "absolute", left: '40%', top: '31%', display: 'block', width: '50%' }}/>
//               {/* <input type="text" placeholder="Enter your user name" value={data.username} onChange={(e)=>{handleChange(e,'username')}}  /> */}
//             </label>
//             <br />
//             <label>
//               <TextField id="demo-helper-text-aligned" label="Password" value={data.password} onChange={(e)=>{handleChange(e,'password')}} helperText="Please enter your password" 
//               style={{ position: "absolute", left: '40%', top: '45%', display: 'block', width: '50%' }}/>
//               {/* <input type="email" placeholder="Enter your email" value={data.email} onChange={(e)=>{handleChange(e,'email')}} /> */}
//             </label>
//           <button className='submitBtn' type="submit">Submit</button>
//         </form>
//           <div className='cancelBtn'>
//            <button onClick={()=>closeModal(false)}>cancel</button>
//           {/* <button onClick={()=>navigate("/")}>Back Home</button> */}
//           </div>
//       </div>
//     </div>
//   );
// }

// export default Loginpage;

  



//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/myapp/accounts/5')
//     .then(response => {setData(response.data);})
//     .catch(error => {console.log(error);});
//     }, []);

    // const listItems = [];
    // for (let i = 0; i < data.length; i++) {
    //     listItems.push(<li key={data[i].user}>{data[i].name}</li>);
    // }

