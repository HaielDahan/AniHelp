import { useState } from 'react';
import React from 'react';
// import back from '../photos/back.jpg';
import back from '../photos/back5.png';
import Loginpage from './loginpage';
import Signup from './signup';
import './homepage.css';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
    BackGroundImage:{
    backgroundImage: `url(${back})`,
    position: 'absulut',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
  },
  signupModalBtn:{
    position: 'absolute',
    top: '18%',
    left: '12%', 
  },
  signupPop:{
    position: 'absolute',
    top: '4%',
    left: '21%', 
  },
  title:{
    position: 'absolute',
    top: '28%',
    left: '21%', 
  },
  title2:{
    position: 'absolute',
    top: '40%',
    left: '20%', 
  },
  title3:{
    position: 'absolute',
    top: '53%',
    left: '14%',
    lineHeight: '2.5'
  },
  paragraph:{
    position: 'absolute',
    top: '70%',
    left: '19%', 
  },
  About:{
    position: 'absolute',
    top: '70%',
    left: '36%', 
  },
};


function Homepage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSignUpModal, setopenSignUpModal] = useState(false);

  const navigate = useNavigate();
  
  const handleLoginButtonClick = () => {
    setOpenModal(true);
    setopenSignUpModal(false);
  }

  const handleSignupButtonClick = () => {
    setOpenModal(false);
    setopenSignUpModal(true);
  }
 
  return (
    <div style={styles.BackGroundImage}>
      <h1 style={styles.title}>🐶 AniHelp 🐱</h1>
      <h3 style={styles.title2}>Everything for your per 😃</h3>
      <h6 style={styles.title3}>
        Discover a hub where you can find or share anything you have in mind for your pets,
        <br />
        as well as items for people in need of essentials like food, toys, and more.. 🛍️🐾
      </h6>
      <p style={styles.paragraph}>If you want to know more you can enter here</p>
        <nav className='bd-highlight" w-20'>
          <div>
          <button className="loginModalBtn" onClick={handleLoginButtonClick}>login</button>
          {openModal && <Loginpage closeModal= {setOpenModal}/>}  
            {/* <Link to="/Login">Login</Link> */}
          </div>
        </nav>
        <nav >
          <div>
          <button onClick={handleSignupButtonClick} style={styles.signupModalBtn}>Sign up</button>
          {openSignUpModal && <Signup closeSignUpModal= {setopenSignUpModal}/>} 
            {/* <Link to="signup">Sign up</Link> */}
          </div>
        </nav>
        
        <div style={styles.About}>
        <Link to="/about" className="AboutBtn">
          📖
        </Link>
          </div>
        <nav>
      </nav>
    </div>
  );
}

export default Homepage;
