import * as React from 'react';
import NavbarOption from './navbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./userportal.css"; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  width: '100%',
  maxWidth: 1250,
  bgcolor: 'background.paper',
};


const card_style = {
  width: '100%',
  maxWidth: 1250,
  margin: '0 auto', // Add this line to horizontally center the cards
  bgcolor: 'background.paper',
  display: 'grid', // Add a grid layout to the container
  gridTemplateColumns: 'repeat(3, 1fr)', // Arrange cards in 3 columns
  gap: '16px', // Add gap between cards
};



function Userportalpage() {
  const[items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
        .get('http://127.0.0.1:8000/myapp/menu', {
    })
    .then((res) => {
      console.log("menu items:",res.data) 
      setItems(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
      }, []);


  useEffect(() => {
    console.log("item:", items);
  }, [items]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <div className="user-portal-page">
      <NavbarOption />
      <div className="button-container">
        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem button onClick={() => setSelectedCategory('All')}> {/* Update the selected category */}
            <ListItemText primary="All" />
          </ListItem>
          {/* ... (other categories) */}
          <ListItem button onClick={() => setSelectedCategory('Toys')}>
        <ListItemText primary="Toys" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Food & Related" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Sleep" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Clothing" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Strap" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Cages" />
      </ListItem>
        </List>
      </div>
      <div className="items-container" style={card_style}>
        {items
          .filter(item => selectedCategory === 'All' || item.category === selectedCategory) // Filter items based on the selected category
          .map(item => (
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.item_name}
        subheader="September 14, 2016"
      />
      <CardMedia
      component="img"
      height="194"
      image={`http://127.0.0.1:8000${item.image}`} // Use item.image directly as the value
      alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Intended for: {item.animal} size: {item.size}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{item.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>            

          ))}
      </div>
    </div>
  );
}

export default Userportalpage;




{/* <Stack spacing={20} direction="row">
  <Button variant="outlined">All</Button>
  <Button variant="outlined">Toys</Button>
  <Button variant="outlined">Food And Related</Button>
  <Button variant="outlined">Sleep</Button>
  <Button variant="outlined">Clothing</Button>
  <Button variant="outlined">Strap</Button>
  <Button variant="outlined">Cages</Button>
</Stack> */}

            // <div key={item.id}>
            // {/* Display item information here */}
            // <p>Name: {item.item_name}</p>
            // <p>Size: {item.size}</p>
            // <p>Animal: {item.animal}</p>
            // <p>Description: {item.description}</p>
            // <p>Image: <img
            //             src={`http://127.0.0.1:8000${item.image}`}
            //             alt="img"
            //             className="small-image"
            //           /></p>
            
            // </div>