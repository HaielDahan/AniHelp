import axios from 'axios';
import { useEffect, useState } from 'react';

function Userportalpage() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken)
    axios.get('http://127.0.0.1:8000/myapp/auth', {
      headers: {
        Authorization: `${authToken}`,
      },
    })
      .then(res => {
        setUser(res.data.username); // Set the username in the state variable
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello {user}</h1>
    </div>
  );
}

export default Userportalpage;
