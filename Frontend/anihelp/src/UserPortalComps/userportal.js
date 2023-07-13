import React from 'react';
import NavbarOption from './navbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./userportal.css"; 


function Userportalpage() {
  return (
    <div className="user-portal-page">
      <NavbarOption />
      <div className="button-container">
        <Stack spacing={20} direction="row">
          <Button variant="outlined">All</Button>
          <Button variant="outlined">Toys</Button>
          <Button variant="outlined">Food And Related</Button>
          <Button variant="outlined">Sleep</Button>
          <Button variant="outlined">Clothing</Button>
          <Button variant="outlined">Strap</Button>
          <Button variant="outlined">Cages</Button>
        </Stack>
      </div>
    </div>
  );
}

export default Userportalpage;
