import { useState } from 'react';
import React from 'react';
import logo from '../photos/homepagelogo.png';
import back from '../photos/back3.png';
import gif from '../gif/dog.gif';
import Loginpage from './loginpage';
import Signup from './signup';
import './homepage.css';
import { Link, useNavigate } from 'react-router-dom';


const styles = {
  //   BackGroundImage:{
  //   backgroundImage: `url(${back})`,
  //   position: 'absulut',
  //   height: '100%',
  //   width: '100%',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   position: 'absolute',
  // },
  signupModalBtn:{
    position: 'absolute',
    top: '3.5%',
    left: '6%', 
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
    animation: 'mymove 3s',
    animationfillmode: 'forwards',
    top: '28%',
    left: '41%',
  },
  title3:{
    position: 'absolute',
    top: '53%',
    left: '35.2%',
    lineHeight: '2.5',
    // fontFamily: 'Times, serif',
    // fontSize:'18px',
  },
  paragraph:{
    position: 'absolute',
    top: '75%',
    left: '40.2%', 
    // fontFamily: 'Times, serif',
    // fontSize:'16px',
  },
  About:{
    position: 'absolute',
    top: '75%',
    left: '57.2%',
    zIndex: -1, 
  },
  headerStyles: {
    position: 'absolute',
    top: '20%',
    left: '38%',
    fontSize: '250%',
    fontWeight: 400,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    width: '24%',
    textAlign: 'center',
    margin: 'auto',
    whiteSpace: 'nowrap',
    border: '3px solid #222',
    padding: '5px 11px 3px 11px',
    backgroundcolor: '#000',  																  /* Set initial properties */
    backgroundcolor: '#000',
    color: 'black',
    opacity: 0,
 /* Add animation properties */
    animation: 'fadeIn 2s ease-in forwards', 

  },

  circleStyles: {
    backgroundColor: '#c50000',
    position: 'absolute',
    content: '',
    height: '7px',
    width: '7px',
    borderRadius: '50%',
    bottom: '12px',
  },
  beforeCircleStyles: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '22.5%',
    left: '36%',
    content: '',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    bottom: '12px',
  },
  afterCircleStyles: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '22.5%',
    left: '63%',
    content: '',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    bottom: '12px',
  },
  BackGroundImageStyle:{
    background: 'linear-gradient(to bottom, #cddafd, #dfe7fd,#ffffff)',
    backgroundAttachment: 'fixed',
    top: '0',
    left: '0',
    position: 'fixed',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    backgroundimage: 'url("img_tree.gif")',
    backgroundrepeat: 'no-repeat',
    backgroundattachment: 'fixed',
  },
  GifStyle:{
    position: 'absolute',
    top: '70%',
    left: '2%',
  },
  logoStyle:{
    position: 'absolute',
    top: '-3.5%',
    left: '2%',
    width: '180px', // Change the width to your desired size
    height: 'auto',
  },
  backPhoto:{
    position: 'absolute',
    top: '35%',
    left: '43%',
    width: '10%', // Change the width to your desired size
    height: 'auto',
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
    <div>
      <div style={styles.BackGroundImageStyle}>
        <img src={logo} alt="images" style={styles.logoStyle}/>
      </div>
      {!openSignUpModal && !openModal && (
        <>
          <div>
            <img src={gif} alt="GIF" style={styles.GifStyle}/>
            <img src={back} alt="GIF" style={styles.backPhoto}/>
          </div>
          <h1 style={styles.headerStyles}>🐶 AniHelp 🐱</h1>
          <span style={styles.beforeCircleStyles}></span>
          <span style={styles.afterCircleStyles}></span>
          <h3 style={styles.title2}>Everything for your pet 😃</h3>
          <h6 style={styles.title3}>
            Discover a hub where you can find or share anything you have in mind for your pets,
            <br />
            as well as items for people in need of essentials like food, toys, and more.. 🛍️🐾
          </h6>
          <p style={styles.paragraph}>If you want to know more, you can enter here</p>
        </>
      )}
      <nav className='bd-highlight' w-20>
        <div>
          <button className="loginModalBtn" onClick={handleLoginButtonClick}>login</button>
          {openModal && <Loginpage closeModal={setOpenModal}/>}  
          {/* <Link to="/Login">Login</Link> */}
        </div>
      </nav>
      <nav >
        <div>
          <button onClick={handleSignupButtonClick} style={styles.signupModalBtn}>Sign up</button>
          {openSignUpModal && <Signup closeSignUpModal={setopenSignUpModal}/>} 
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
