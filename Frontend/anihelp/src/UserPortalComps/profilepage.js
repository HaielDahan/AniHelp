import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profilepage() {
  const [personprofile, setPersonProfile] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
      .get('http://127.0.0.1:8000/myapp/account', {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then((res) => {
        setPersonProfile(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{personprofile.name}</h1>
      <p>Name: {personprofile.name}</p>
      <p>Gender: {personprofile.gender}</p>
      <p>Age: {personprofile.age}</p>
      <p>Residence: {personprofile.place}</p>
      <p>Phone number: {personprofile.prefix}{personprofile.phone}</p>
    </div>
  );
}

export default Profilepage;
