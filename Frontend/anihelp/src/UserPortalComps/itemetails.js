import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarOption from './navbar';
import { useNavigate } from 'react-router-dom';



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

  backButton: {
    position: 'absolute',
    top: '12%',
    left: '3%',
    padding: '0.8%',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  image:{
    position: 'absolute', 
    top: '30%', 
    left: '10%',
    width: '25%', 
    height: '50%',

  },
  style_name:{
    position: 'absolute', 
    top: '31%', 
    left: '42%',
    textTransform: 'uppercase',
    textDecoration: 'overline underline',
    textShadow:'2px 2px 5px white',
    fontFamily:'serif',
  },
  item_details:{
    position: 'absolute', 
    top: '50%', 
    left: '40%',
  },
  
};



function ItemDetails() {
  const location = useLocation();
  const item = location?.state?.item;
  const navigate = useNavigate();
  
  const handleSearch = (results) => {
    if (results.length === 0) {
      return;
    }
  }
  
  return( 
      <div style={styles.BackGroundImageStyle}>
        <NavbarOption search={handleSearch}/>
        {item && (
          <img
            src={`http://127.0.0.1:8000${item.image}`}
            alt={item.item_name}
            style={styles.image}
          />
        )}
      <h1 style={styles.style_name}>{item.item_name}</h1>;
        <p style={{position:'absolute', top:'38%', left:'42%', width:'30%'}}>{item.description}</p>
        <h5 style={{position:'absolute', top:'72%', left:'42%'}}>adapted to:</h5>
        <p style={{position:'absolute', top:'72%', left:'49%'}}>{item.animal}s</p>
        <h5 style={{position:'absolute', top:'77%', left:'42%'}}>size:</h5>
        <p style={{position:'absolute', top:'77%', left:'49%'}}>{item.size}</p>
        <div style={{position: 'absolute',top:'20%', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'white'}}></div>
        <div style={{position: 'absolute',top:'90%', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: ' #cddafd'}}></div>
      </div>
  );
}

export default ItemDetails;

