import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarOption from './navbar';
import { useNavigate } from 'react-router-dom';



const styles = {
  backButton: {
    position: 'absolute',
    top: '12%',
    left: '3%',
    padding: '0.8%',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  imageDiv: {
    position: 'absolute', 
    top: '20%', 
    left: '20%',
  },
  image:{
    width: '30%', 
    height: '45%',
  },
  style_name:{
    position: 'absolute', 
    top: '40%', 
    left: '20%',
  },
  item_details:{
    position: 'absolute', 
    top: '50%', 
    left: '20%',
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
      <div>
        <NavbarOption search={handleSearch}/>
        <button style={styles.backButton} onClick={() => navigate('/userportal')}>
          Back
        </button>
        <div style={styles.imageDiv}>
        {item && (
          <img
            src={`http://127.0.0.1:8000${item.image}`}
            alt={item.item_name}
            style={styles.image}
          />
        )}
        </div>
      <h1 style={styles.style_name}>{item.item_name}</h1>;
      <div style={styles.item_details}>
        <p>adapted to: {item.animal}</p>
        <p>size: {item.size}</p>
        <p>description: {item.description}</p>
      </div>
    </div>
  );
}

export default ItemDetails;

