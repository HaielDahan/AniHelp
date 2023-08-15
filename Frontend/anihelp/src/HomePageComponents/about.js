import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #cddafd, #dfe7fd, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    maxWidth: '600px',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px',
    backgroundColor: '#eaeaea',
    border: 'none',
    cursor: 'pointer',
  },
};

function About() {
  const navigate = useNavigate();



  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate('/')}>
        Back
      </button>
      <div style={styles.content}>
        <h2>Welcome to AniHelp! 🎉</h2>
        <p>AniHelp is a social platform that facilitates the donation of animal equipment between individuals. It connects those who have animal supplies to donate with those who are in need of them. 🎁🙌</p>
        
        <h3>How it Works 💡</h3>
        <h4>Donors:</h4>
        <p>If you have animal equipment that you no longer use or need, simply create a listing on AniHelp. Share details about the items you're donating and their condition. 📦✨</p>
        
        <h4>Recipients:</h4>
        <p>Browse through the available listings to find the animal equipment you require. Filter the results based on location, item type, or specific needs. Once you find what you're looking for, connect with the donor to arrange pickup or delivery. 🔍📥</p>
        
        <h4>Spread the Love:</h4>
        <p>By participating in AniHelp, you're contributing to the well-being of animals in need. Your donation can make a significant difference in the lives of shelter animals, rescue organizations, and pet owners facing financial hardships. 😍🐶🐱</p>
      </div>
    </div>
  );
}

export default About;
