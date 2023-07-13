import { useState } from 'react';
import React from 'react';
import back from '../photos/back3.jpg';
import Loginpage from './loginpage';
import Signup from './signup';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

const styles = {
  backgroundImage: `url(${back})`,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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
        <nav className='position-absolute top-0 end-0 w-20'>
        <div>
           <button className="AboutBtn" onClick={() => navigate('/about')}>About</button>
          </div>
        </nav>
        <nav>
      </nav>
    </div>
  );
}

export default Homepage;
