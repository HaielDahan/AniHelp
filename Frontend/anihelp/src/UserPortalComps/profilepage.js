import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import back from '../photos/back3.jpg';
import NavbarOption from './navbar';
import { Navbar } from 'react-bootstrap';
const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value as needed
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 250,
    width: '70%',
    height: '100%',
    backgroundImage: `url(${back})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5, // Adjust the opacity value as needed
  },
};


function Profilepage() {
  const [personprofile, setPersonProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [titlename, setTitleName] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
      .get('http://127.0.0.1:8000/myapp/account', {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then((res) => {
        setTitleName(res.data['name']);
        setPersonProfile(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setPersonProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name: personprofile.name,
        gender: personprofile.gender,
        age: personprofile.age,
        place: personprofile.place,
        prefix: personprofile.prefix,
        phone : personprofile.phone
      };
      const authToken = localStorage.getItem('authToken');
      const response = await axios.put('http://127.0.0.1:8000/myapp/account/', updatedData, {
      headers: {
      Authorization: `${authToken}`,
      },
      });
      if (response.status === 200) {
        setTitleName(response.data['name'])
        setIsEditing(false);
      } else {
        throw new Error('Failed to save the profile');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the profile?');
    if (confirmed) {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.delete('http://127.0.0.1:8000/myapp/account/', {
          headers: {
            Authorization: `${authToken}`,
          },
        });
        if (response.status === 204) {
          console.log(response.data)
          navigate('/');
        } else {
          throw new Error('Failed to delete the profile');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div>
      <NavbarOption/>
      <div style={{ dislay: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{titlename}</h1>
      <ul>
      <p>
        Name: {isEditing ? (
          <input
            type="text"
            value={personprofile.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
        ) : (
          personprofile.name
        )}
      </p>
      </ul>
      <ul>
      <p>
        Gender: {isEditing ? (
          <input
            type="text"
            value={personprofile.gender}
            onChange={(e) => handleFieldChange('gender', e.target.value)}
          />
        ) : (
          personprofile.gender
        )}
      </p>
      </ul>
      <ul>
      <p>
        Age: {isEditing ? (
          <input
            type="text"
            value={personprofile.age}
            onChange={(e) => handleFieldChange('age', e.target.value)}
          />
        ) : (
          personprofile.age
        )}
      </p>
      </ul>
      <ul>
      <p>
        Residence: {isEditing ? (
          <input
            type="text"
            value={personprofile.place}
            onChange={(e) => handleFieldChange('place', e.target.value)}
          />
        ) : (
          personprofile.place
        )}
      </p>
      </ul>
      <ul>
      <p>
        Phone number: {isEditing ? (
          <>
            <input
              type="text"
              value={personprofile.prefix}
              onChange={(e) => handleFieldChange('prefix', e.target.value)}
            />
            <input
              type="text"
              value={personprofile.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
            />
          </>
        ) : (
          personprofile.prefix + personprofile.phone
        )}
      </p>
      </ul>
      {isEditing ? (
        <>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancelEdit}>cancel</button>
        </>
      ) : (
        <>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate('/userportal')}>Back</button>
        </>
      )}
      </div>
    </div>
  );
}

export default Profilepage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profilepage() {
//   const [personprofile, setPersonProfile] = useState({});

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     axios
//       .get('http://127.0.0.1:8000/myapp/account', {
//         headers: {
//           Authorization: `${authToken}`,
//         },
//       })
//       .then((res) => {
//         setPersonProfile(res.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <h1>{personprofile.name}</h1>
//       <p>Name: {personprofile.name}</p>
//       <p>Gender: {personprofile.gender}</p>
//       <p>Age: {personprofile.age}</p>
//       <p>Residence: {personprofile.place}</p>
//       <p>Phone number: {personprofile.prefix}{personprofile.phone}</p>
//     </div>
//   );
// }

// export default Profilepage;
