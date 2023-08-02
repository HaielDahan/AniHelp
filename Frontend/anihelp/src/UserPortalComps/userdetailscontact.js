import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavbarOption from './navbar';

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
    <div>
    <NavbarOption search={handleSearch}/>
    {user && user.length > 0 ? (
       <React.Fragment>
       <h1>{user[0].name}</h1>
       <p>{user[0].prefix} - {user[0].phone}</p>
     </React.Fragment>
      ) : (
      <h1>User data not found.</h1>
    )}
  </div>
  );
}

export default UserDetailsContact;
