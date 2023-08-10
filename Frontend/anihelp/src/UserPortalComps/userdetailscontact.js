import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavbarOption from './navbar';

const style = {
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
  },
  detailstyle:{
    position:'absolute',
    top:'15%',
    left:'20%'
  },
};

function UserDetailsContact() {
  const location = useLocation();
  const user = location?.state?.user;

  useEffect(() => {
    console.log("here:", user);
  }, [user]);

  const handleSearch = (results) => {
    if (results.length === 0) {
      return;
    }
  }

  return (
  <div style={style.BackGroundImageStyle}>
    <NavbarOption search={handleSearch}/>
    <div style={style.detailstyle}>
      {user ? (
        <React.Fragment>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.place}</p>
        <p>{user.prefix} - {user.phone}</p>
      </React.Fragment>
        ) : (
        <h1>User data not found.</h1>
      )}
    </div>
  </div>
  );
}

export default UserDetailsContact;
