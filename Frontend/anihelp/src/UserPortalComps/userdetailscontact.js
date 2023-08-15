import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavbarOption from './navbar';

const style = {
  BackGroundImageStyle: {
    background: 'linear-gradient(to bottom, #cddafd, #dfe7fd, #ffffff)',
    backgroundAttachment: 'fixed',
    top: '0',
    left: '0',
    position: 'fixed',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  detailstyle: {
    position: 'absolute',
    top: '37%',
    left: '46.5%',
  },
  ModalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background overlay
    zIndex: 9999,
    backdropFilter: 'blur(3px)',
  },
  
  modalContainer: {
    width: '30%',
    height: '50%',
    borderRadius: '12px',
    background: 'linear-gradient(to bottom, #cddafd, #dfe7fd, #ffffff)',
    boxShadow: '0px 5px 15px rgb(0, 0, 0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    opacity: 1, // Change this to 1 since the modal is initially visible
    animation: 'fadeIn 0.5s ease-in forwards',
  },
  cancelBtn: {
    position: 'absolute',
    top: '64%',
    left: '46.5%',
    backgroundColor: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
  },
  info: {
    position: 'absolute',
    top: '27.5%',
    left: '40%',
    backgroundColor: 'transparent',
  },
  BackgroundSymbol:{
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px', // Adjust the margin as needed
  },
};


function UserDetailsContact({ closeModal, detail}) {
  const location = useLocation();
  const user = location?.state?.user;

  useEffect(() => {
    console.log("here:", detail);
  }, [detail]);

  const handleSearch = (results) => {
    if (results.length === 0) {
      return;
    }
  }

  return (
    <div style={style.ModalBackground}>
      <div style={style.modalContainer}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={style.BackgroundSymbol}>
          📞
        </div>
        </div>
        <div style={style.info}>
          <h2>Contact info</h2></div>
        <div style={style.detailstyle}>
          {detail ? (
            <React.Fragment>
                <div style={{ position: 'relative', left: '-2%', marginBottom: '8px' }}>
                <h4>📛: {detail.name}</h4>
              </div>
              <p>📧:  {detail.email}</p>
              <p>🏢:  {detail.place}</p>
              <p>☎️:  {detail.prefix} - {detail.phone}</p>
            </React.Fragment>
          ) : (
            <h4>User data not found.</h4>
          )}
      </div>
      {/* Add a close button or element */}
      <button style={style.cancelBtn} onClick={() => closeModal(false)}>Close</button>
    </div>
    </div>
  );
}

export default UserDetailsContact;
