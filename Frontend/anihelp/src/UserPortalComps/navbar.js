import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import logo from '../photos/logo.png';


const logoStyle = {
  position: 'absolute',
  top: '-3.5%',
  left: '2%',
  width: '180px', // Change the width to your desired size
  height: 'auto',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000000',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
function NavbarOption({search}) {
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [ProfileanchorEl, setProfileanchorEl] = useState(null);
  const [searchItems, setSearchItems] = useState('');
  const [displayItems, setDisplayItems] = useState([]);

  const location = useLocation();
  const isUserPortal = location.pathname === '/userportal'; 

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
      .get('http://127.0.0.1:8000/myapp/auth', {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then((res) => {
        setUser(res.data.username); // Set the username in the state variable
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


    
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/myapp/search', {
      params: { searchItems },
    })
      .then(res => {
        setDisplayItems(res.data);
      })
      .catch(error => {
        console.error(error);
      });
}, [searchItems]);

  useEffect(() => {
      search(displayItems);
  }, [displayItems]);


  const navigate = useNavigate();


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlProfileMenu = (event) => {
    setProfileanchorEl(event.currentTarget);
  };


const handleProfileClose = () => {
  setProfileanchorEl(null);
};

const handleSearchChange = (event) => {
  setSearchItems(event.target.value);
};

  return (
    <Box sx={{ flexGrow: 1 }}>
        <img src={logo} alt="images" style={logoStyle}/>
        <AppBar position="static" style={{ backgroundColor: '#000000', height: 0, position: 'absolute',top:'9.5%', }} elevation={0}>
        <Toolbar>
        <IconButton
        color="#000000"
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
      {!isUserPortal && (
       <HomeIcon onClick={() => navigate('/userportal')}/> 
      )}
      </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="#000000"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            welcome {user}
          </Typography>
          {isUserPortal && (
            <Search>
              <SearchIconWrapper style={{ color: "#000000" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchItems}
                onChange={handleSearchChange}
              />
            </Search>
          )}
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handlProfileMenu}
                color="#000000"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                ProfileanchorEl={ProfileanchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(ProfileanchorEl)}
                onClose={handleProfileClose}
              > 
                <MenuItem onClick={() => navigate('/profile')}>profile</MenuItem>
                <MenuItem onClick={() => navigate('/Myaccount')}>My account</MenuItem>
                <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      {/* Menu component */}
      <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      >
      {Object.entries(categoryOptions).map(([key, value]) => (
      <MenuItem key={key} onClick={handleMenuClose}>
      {value}
      </MenuItem>
       ))}
    </Menu>
    </Box>
    
  );
}

export default NavbarOption;

{/* <IconButton
size="large"
edge="start"
color="inherit"
aria-label="open drawer"
sx={{ mr: 2 }}
onClick={handleMenuOpen} 
>
<MenuIcon />
</IconButton> */}

// useEffect(() => {
//   axios.get('http://127.0.0.1:8000/myapp/category-options', {
//   })
//     .then(res => {
//       // console.log(res.data)
//       setCategoryOptions(res.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }, []);

  // useEffect(() => {
  //   if (searchItems.trim() !== '') { // Check if searchItems is not empty or just spaces
  //     axios.get('http://127.0.0.1:8000/myapp/search', {
  //       params: { searchItems },
  //     })
  //       .then(res => {
  //         setDisplayItems(res.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }, [searchItems]);