import { useState } from 'react';
import React from 'react';
import animals from '../photos/animals.jpg';
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Loginpage from './loginpage';
import Signup from './signup';
import './homepage.css';


const styles = {
  backgroundImage: `url(${animals})`,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function Homepage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSignUpModal, setopenSignUpModal] = useState(false);


  const handleLoginButtonClick = () => {
    setOpenModal(true);
    setopenSignUpModal(false);
  }

  const handleSignupButtonClick = () => {
    setOpenModal(false);
    setopenSignUpModal(true);
  }

  return (
    <div style={styles} className="container">
      <h1 className='display-1 position-absolute top-0 start-50 translate-middle-x'>AniHelp</h1>
        <nav className='bd-highlight" w-20'>
          <div>
          <button className="openModalBtn" onClick={handleLoginButtonClick}>login</button>
          {openModal && <Loginpage closeModal= {setOpenModal}/>}  
            {/* <Link to="/Login">Login</Link> */}
          </div>
        </nav>
        <nav >
          <div className='position-absolute top-0 start-0 w-20'>
          <button className="openSignUpModal" onClick={handleSignupButtonClick}>Sign up</button>
          {openSignUpModal && <Signup closeSignUpModal= {setopenSignUpModal}/>} 
            {/* <Link to="signup">Sign up</Link> */}
          </div>
        </nav>
    </div>
  );
}

export default Homepage;
