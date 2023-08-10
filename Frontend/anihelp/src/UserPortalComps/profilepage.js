import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarOption from './navbar';
import { Navbar } from 'react-bootstrap';
import boy from '../photos/boy.png';
import girl from '../photos/girl.png';

const styles = {
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
  container: {
    position: 'relative',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value as needed
  },

  avatar: {
    verticalalign: 'middle',
    width: '20%',
    height: '37%',
    borderradius: '50%',
    position:'absolute',
    top:'25%',
    left:'25%',
  },
  buttonPositin:{
    position:'absolute',
    top:'20%',
    left:'90%',
  },
  EditButtonPositin:{
    position:'absolute',
    top:'-40%',
    left:'275%',
  },
  DeleteButtonPositin:{
    position:'absolute',
    top:'-40%',
    left:'350%',
  },
  SaveButtonPositin:{
    position:'absolute',
    top:'-40%',
    left:'70%',
  },
  CancelButtonPositin:{
    position:'absolute',
    top:'-40%',
    left:'90%',
  },
  Genderdetail:{
    position:'absolute',
    top:'0%',
    left:'120%',
  },
  Agedetail:{
    position:'absolute',
    top:'28%',
    left:'120%',
  },
  Residencedetail:{
    position:'absolute',
    top:'50%',
    left:'120%',
    width: '100%'
  },
  Phonedetail:{
    position:'absolute',
    top:'75%',
    left:'120%',
  },
  tooltip:{
    position:'absolute',
    top:'90%',
    left:'0%',
    display: 'inline-block',
    borderBottom:' 1px dotted black',
  }
  // background: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 250,
  //   width: '70%',
  //   height: '100%',
  //   backgroundImage: `url(${back})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   opacity: 0.5, // Adjust the opacity value as needed
  // },
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
  const handleSearch = (results) => {
    if (results.length === 0) {
      return;
    }
  }

  return (
    <div style={styles.BackGroundImageStyle}>
      <NavbarOption search={handleSearch}/>
      {personprofile.gender ==='male' ?(
        <img src={boy} alt="images" style={styles.avatar}/>
      ):
      (
        <img src={girl} alt="images" style={styles.avatar}/>
      )}
      <h1 style={{position:'absolute', top:'63%', left:'33.05%',fontFamily:'serif',textShadow:'2px 2px 5px white',}}>{titlename}</h1>
      <ul>
      <p>
        {isEditing ? (
          <input
          style={{position:'absolute', top:'69%', left:'33.05%'}}
            type="text"
            value={personprofile.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
        ) : (
          null
        )}
      </p>
      </ul>
      <div style={{position:'absolute', dislay: 'flex', flexDirection: 'column', alignItems: 'center',top:'34%', left:'47%'}}>
      <ul style={{marginBottom: '7%'}}>
      <p >
        Gender: {isEditing ? (
          <input
            type="text"
            style={{position:'absolute', top:'0%', left:'30%'}}
            value={personprofile.gender}
            onChange={(e) => handleFieldChange('gender', e.target.value)}
          />
        ) : (
          <div style={styles.Genderdetail}>
          {personprofile.gender}
          </div>
        )}
      </p>
      </ul>
      <ul style={{marginBottom: '7%'}}>
      <p>
        Age: {isEditing ? (
          <input
            type="text"
            style={{position:'absolute', top:'22%', left:'30%'}}
            value={personprofile.age}
            onChange={(e) => handleFieldChange('age', e.target.value)}
          />
        ) : (
          <div  style={styles.Agedetail}>
          {personprofile.age}
          </div>
        )}
      </p>
      </ul>
      <ul style={{marginBottom: '7%'}}>
      <p>
        Residence: {isEditing ? (
          <input
            type="text"
            style={{position:'absolute', top:'44%', left:'30%'}}
            value={personprofile.place}
            onChange={(e) => handleFieldChange('place', e.target.value)}
          />
        ) : (
          <div  style={styles.Residencedetail}>
          {personprofile.place}
          </div>
        )}
      </p>
      </ul>
      <ul style={{marginBottom: '7%'}}>
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
          <div  style={styles.Phonedetail}>
          {personprofile.prefix + personprofile.phone}
          </div>
        )}
      </p>
      </ul>
      {isEditing ? (
        <>
        <button style={styles.SaveButtonPositin} onClick={handleSave}>Save</button>
        <button style={styles.CancelButtonPositin} onClick={handleCancelEdit}>cancel</button>
        </>
      ) : (
        <>
        <button style={styles.EditButtonPositin} onClick={handleEdit}>Edit</button>
        <button style={styles.DeleteButtonPositin} onClick={handleDelete}>Delete</button>
        </>
      )}
      </div>
      <div style={{position: 'absolute',top:'90%', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: ' #cddafd'}}></div>
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
