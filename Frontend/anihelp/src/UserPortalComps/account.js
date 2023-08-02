import NavbarOption from './navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import "./account.css";
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // other Material-UI imports...
} from '@mui/material';  
/// ****It will remain for me to arrange the addition of products and editing of products and correct the sorting*****

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
  },
  {
    id: 'Size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 'Animal',
    numeric: true,
    disablePadding: false,
    label: 'Animal',
  },
  {
    id: 'Category',
    numeric: true,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'Description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'Image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, itemsfordelete, onAddClick } = props;
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.delete('http://127.0.0.1:8000/myapp/item', {
          headers: {
            Authorization: `${authToken}`,
          },
          data: {
            items: itemsfordelete,
          },
        });
        if (response.status === 204) {
          window.location.reload();
        } else {
          throw new Error('Failed to delete the profile');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const handleAdd = () => {
    // Call the onAddClick callback from props
    if (onAddClick) {
      onAddClick();
    }
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      <Tooltip title="Add">
        <IconButton onClick={handleAdd}>
        <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  itemsfordelete: PropTypes.array.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [itemsForDelete, setItemsForDelete] = useState([]);
  const [editingCells, setEditingCells] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [file, setFile] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [animalOptions, setAnimalOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  
  
  const back_styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      height: '10vh',
      padding: '0 20px',
    },
    backButton: {
      padding: '10px',
      backgroundColor: 'white',
      color: 'blue',
      border: 'none',
      cursor: 'pointer',
      marginRight: '20px', // Add margin to the right to create space between back button and title
    },
    title: {
      marginLeft: '41%', // Adjust the value as per your preference to move the title to the left
      flexGrow: 1, // This makes the title occupy the remaining space and pushes the back button to the left side
      textAlign: 'left', // You can align the text to the left or center based on your preference
    },
  };

  
  
  


  const [newProduct, setNewProduct] = useState({
    // item_name: '',
    // size: '',
    // animal: '',
    // category: '',
    // description: '',
    // image: '',
  });

  const handleAdd = () => {
    // Reset newProduct state to represent a new row
    setNewProduct({
      item_name: '',
      size: '',
      animal: '',
      category: '',
      description: '',
      image: 'null',
    });
  };

  const handleSaveNewProduct = async () => {
    const newProductWithId = { id: generateUniqueId(), ...newProduct };
    const confirmed = window.confirm('Are you sure you want to save the changes?');
  
    if (confirmed) {
      if (newProductWithId) {
        try {
          const formData = new FormData();
          formData.append('id', newProductWithId.id);
          formData.append('item_name', newProductWithId.item_name);
          formData.append('size', newProductWithId.size);
          formData.append('animal', newProductWithId.animal);
          formData.append('category', newProductWithId.category);
          formData.append('description', newProductWithId.description);
  
          // Append the 'image' file data if it exists
          if (newProductWithId.image !== 'null') {
            console.log("i am here 1");
            console.log("i am here 1 : ", newProductWithId.image );
            formData.append('image', newProductWithId.image, newProductWithId.image.name);
          }
          else{
            console.log("i am here 2");
            formData.append('image','null')
          }
  
          const authToken = localStorage.getItem('authToken');
          const response = await axios.post(
            'http://127.0.0.1:8000/myapp/items',
            formData,
            {
              headers: {
                Authorization: authToken,
                'Content-Type': 'multipart/form-data', // Make sure to set the correct content type
              },
            }
          );
  
          if (response.status === 201) {
            console.log("this is the data:", response.data);
            window.location.reload();
          } else {
            throw new Error('Failed to change this item');
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    setNewProduct({}); // Reset newProduct state
  };
  


  const handleCancelAdd = () => {
    // Reset newProduct state to remove the new row
    setNewProduct({});
  };

  // Generate a unique ID for the new product
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios
      .get('http://127.0.0.1:8000/myapp/items', {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.id);
        setItems(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((row) => row.id);
      setSelected(newSelected);
      setItemsForDelete(newSelected); // Add all items to itemsForDelete
    } else {
      setSelected([]);
      setItemsForDelete([]); // Clear the itemsForDelete array
    }
  };
  

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      setItemsForDelete((prevItems) => [...prevItems, id]); // Add the item to itemsForDelete
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setItemsForDelete((prevItems) =>
        prevItems.filter((item) => item !== id)
      ); // Remove the item from itemsForDelete
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      setItemsForDelete((prevItems) =>
        prevItems.filter((item) => item !== id)
      ); // Remove the item from itemsForDelete
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      setItemsForDelete((prevItems) =>
        prevItems.filter((item) => item !== id)
      ); // Remove the item from itemsForDelete
    }

    setSelected(newSelected);
    // console.log('Selected:', newSelected);
    // console.log('Items For Delete:', itemsForDelete);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  useEffect(() => {
    console.log(originalValues); // Log the value of originalValues
    // ...
  }, [originalValues]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = stableSort(items, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditRow = (id) => {
    const updatedEditingCells = { ...editingCells };
    updatedEditingCells[id] = true;
    setEditingCells(updatedEditingCells);
  
    // Store the original values of the edited cells
    const editedRow = visibleRows.find((row) => row.id === id);
    const originalRowValues = {
      item_name: editedRow.item_name,
      size: editedRow.size,
      animal: editedRow.animal,
      category: editedRow.category,
      description: editedRow.description,
      image: editedRow.image,
    };
    setOriginalValues((prevOriginalValues) => ({
      ...prevOriginalValues,
      [id]: originalRowValues,
    }));
  };

  const handleSaveRow = (id) => {
    const confirmed = window.confirm('Are you sure you want to save the changes?');
    if (confirmed) {
      const updatedItem = items.find((item) => item.id === id);
      if (updatedItem) {
        const formData = new FormData();
        formData.append('id', id); // Append the 'id' directly
  
        formData.append('item_name', updatedItem.item_name);
        formData.append('size', updatedItem.size);
        formData.append('animal', updatedItem.animal);
        formData.append('category', updatedItem.category);
        formData.append('description', updatedItem.description);
         // Append the 'image' data properly
      if (file) {
        formData.append('image', file, file.name);
      } else {
        formData.append('image', updatedItem.image);
      }
  
        const authToken = localStorage.getItem('authToken');
        axios
          .put(`http://127.0.0.1:8000/myapp/item`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: authToken,
            },
          })
          .then((response) => {
            if (response.status === 204) {
              window.location.reload();
            } else {
              throw new Error('Failed to change this item');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  
  


  

  const handleExitEdit = (id) => {
    const updatedEditingCells = { ...editingCells };
    updatedEditingCells[id] = false;
    setEditingCells(updatedEditingCells);

    // Restore the original values of the edited cells
    const originalRowValues = originalValues[id];
    if (originalRowValues) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, ...originalRowValues } : item
      );
      setItems(updatedItems);
    }
  };

  // const handleCellChange = (event, id) => {
  //   const { name, value, files } = event.target;
  //   const updatedItems = items.map((item) =>
  //     item.id === id ? { ...item, [name]: value || files[0] } : item
  //   );
  //   setItems(updatedItems);
  // };


  const handleCellChange = (event, id) => {
    const { name, value, files } = event.target;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item // Spread the entire item object
    );
    setItems(updatedItems);
    // Update the 'file' state only if a new image is selected
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/myapp/category-options', {
    })
      .then(res => {
        // console.log(res.data)
        setCategoryOptions(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/myapp/animals-options/', {
    })
      .then(res => {
        // console.log("animal:",res.data)
        setAnimalOptions(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/myapp/size-options/', {
    })
      .then(res => {
        // console.log(res.data)
        setSizeOptions(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const handleSearch = (results) => {
    if (results.length === 0) {
      return;
    }
  }

return (
  <div>
      <NavbarOption search={handleSearch}/>
    <Box sx={back_styles.container} >
      <div style={back_styles.title}>
      <h1>Personal Area</h1>
      </div>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          itemsfordelete={itemsForDelete}
          onAddClick={handleAdd}// Pass the handleAdd function to the toolbar
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {/* Render the new row with input fields */}
              {Object.keys(newProduct).length > 0 && (
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>
                    <TextField
                      name="item_name"
                      value={newProduct.item_name}
                      onChange={(event) => setNewProduct({ ...newProduct, item_name: event.target.value })}
                    />
                  </TableCell>
                  <TableCell align="right">
                  <FormControl fullWidth variant="outlined">
                        <InputLabel id={`size-label-${newProduct.id}`}>Size</InputLabel>
                        <Select
                          labelId={`size-label-${newProduct.id}`}
                          name="size"
                          value={newProduct.size}
                          onChange={(event) => setNewProduct({ ...newProduct, size: event.target.value })}
                          label="size"
                        >
                          {Object.entries(sizeOptions).map(([key, value]) => (
                          <MenuItem key={key} value={value}>
                          {value}
                          </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    
                    {/* <TextField
                      name="size"
                      value={newProduct.size}
                      onChange={(event) => setNewProduct({ ...newProduct, size: event.target.value })}
                    /> */}
                  </TableCell>
                  <TableCell align="right">
                  <FormControl fullWidth variant="outlined">
                      <InputLabel id={`animal-label-${newProduct.id}`}>Animal</InputLabel>
                      <Select
                        labelId={`animal-label-${newProduct.id}`}
                        name="animal"
                        value={newProduct.animal}
                        onChange={(event) => setNewProduct({ ...newProduct, animal: event.target.value })}
                        label="animal"
                      >
                        {Object.entries(animalOptions).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                        {value}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                    
                    {/* <TextField
                      name="animal"
                      value={newProduct.animal}
                      onChange={(event) => setNewProduct({ ...newProduct, animal: event.target.value })}
                    /> */}
                  </TableCell>
                  <TableCell align="right">
                  <FormControl fullWidth variant="outlined">
                      <InputLabel id={`category-label-${newProduct.id}`}>Category</InputLabel>
                      <Select
                        labelId={`category-label-${newProduct.id}`}
                        name="category"
                        value={newProduct.category}
                        onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
                        label="category"
                      >
                        {Object.entries(categoryOptions).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                        {value}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  
                    {/* <TextField
                      name="category"
                      value={newProduct.category}
                      onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
                    /> */}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      name="description"
                      value={newProduct.description}
                      onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setNewProduct({ ...newProduct, image: event.target.files[0] })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleCancelAdd}>
                      <CancelIcon />
                    </IconButton>
                    <IconButton onClick={handleSaveNewProduct}>
                      <SaveIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}

              {/* Render the existing rows */}
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isSelected(row.id)}
                  tabIndex={-1}
                  key={row.id}
                  selected={isSelected(row.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected(row.id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${index}`,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={`enhanced-table-checkbox-${index}`}
                    scope="row"
                    padding="none"
                  >
                    {editingCells[row.id] ? (
                      <TextField
                        name="item_name"
                        value={row.item_name}
                        onChange={(event) => handleCellChange(event, row.id)}
                      />
                    ) : (
                      row.item_name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                        <FormControl fullWidth variant="outlined">
                        <InputLabel id={`size-label-${row.id}`}>Size</InputLabel>
                        <Select
                          labelId={`size-label-${row.id}`}
                          name="size"
                          value={row.size}
                          onChange={(event) => handleCellChange(event, row.id)}
                          label="size"
                        >
                          {Object.entries(sizeOptions).map(([key, value]) => (
                          <MenuItem key={key} value={value}>
                          {value}
                          </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      row.size
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                      <FormControl fullWidth variant="outlined">
                      <InputLabel id={`animal-label-${row.id}`}>Animal</InputLabel>
                      <Select
                        labelId={`animal-label-${row.id}`}
                        name="animal"
                        value={row.animal}
                        onChange={(event) => handleCellChange(event, row.id)}
                        label="animal"
                      >
                        {Object.entries(animalOptions).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                        {value}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    ) : (
                      row.animal
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                      <FormControl fullWidth variant="outlined">
                      <InputLabel id={`category-label-${row.id}`}>Category</InputLabel>
                      <Select
                        labelId={`category-label-${row.id}`}
                        name="category"
                        value={row.category}
                        onChange={(event) => handleCellChange(event, row.id)}
                        label="Category"
                      >
                        {Object.entries(categoryOptions).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                        {value}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    ) : (
                      row.category
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                      <TextField
                        name="description"
                        value={row.description}
                        onChange={(event) => handleCellChange(event, row.id)}
                      />
                    ) : (
                      row.description
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCellChange(e, row.id)}
                        />
                      </>
                    ) : (
                      <img
                        src={`http://127.0.0.1:8000${row.image}`}
                        alt="img"
                        className="small-image"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingCells[row.id] ? (
                      <>
                        <IconButton onClick={() => handleExitEdit(row.id)}>
                          <CancelIcon />
                        </IconButton>
                        <IconButton onClick={() => handleSaveRow(row.id)}>
                          <SaveIcon />
                        </IconButton>
                      </>
                    ) : (
                      isSelected(row.id) && (
                        <IconButton onClick={() => handleEditRow(row.id)}>
                          <EditIcon />
                        </IconButton>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  </div>
);
}


  
  
  




// function Account() {
// const[items,setItems] = useState([]);
// useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     axios
//         .get('http://127.0.0.1:8000/myapp/items', {
//         headers: {
//             Authorization: `${authToken}`,
//         },
//     })
//     .then((res) => {
//         console.log(res.data);
//         setItems(res.data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
//       }, []);
//   return (
//     <div>
//     <NavbarOption />
//     <h1>My List:</h1>
//     {items.map((item) => (
//       <div key={item.id}>
//       <ul> key={item.id} ,name:{item.item_name} Size: {item.size}, Animal: {item.animal}, Category: {item.category}, Description: {item.description}</ul>
//     </div>
//     ))}
//   </div>
//   );
// }

// export default Account;




  // const handleSaveRow = (id) => {
    // const confirmed = window.confirm('Are you sure you want to save the changes?');
    //   if (confirmed) {
    //     const updatedItem = items.find((item) => item.id === id);
    //   if (updatedItem) {
    //     console.log('Updated Item:', updatedItem);
    //       const handleEditReq = async () => {
    //         try {
    //           const authToken = localStorage.getItem('authToken');
    //           const response = await axios.put('http://127.0.0.1:8000/myapp/item', {
    //             headers: {
    //               Authorization: authToken,
    //             },
    //             data: {
    //               items: updatedItem,
    //             },
    //           });
    //           if (response.status === 204) {
    //               window.location.reload();
    //           } else {
    //             throw new Error('Failed to change this item');
    //           }
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       };
    //       handleEditReq();
    //     }
    //   }
  // };

  
  // const handleSaveNewProduct = () => {
  //   // Add the new product data to the items array
  //   const newProductWithId = { ...newProduct, id: generateUniqueId() };
  //   // setItems((prevItems) => [newProductWithId, ...prevItems]);
  //   const handleSaveNewProduct = async () => {
  //     // Add the new product data to the items array
  //     const newProductWithId = { ...newProduct, id: generateUniqueId() };
  //     const confirmed = window.confirm('Are you sure you want to save the changes?');
    
  //     if (confirmed) {
  //       if (newProductWithId) {
  //         try {
  //           const authToken = localStorage.getItem('authToken');
  //           const response = await axios.post(
  //             'http://127.0.0.1:8000/myapp/items',
  //             {
  //               items: newProductWithId,
  //             },
  //             {
  //               headers: {
  //                 Authorization: authToken, // Pass the token directly here
  //               },
  //             }
  //           );
    
  //           if (response.status === 204) {
  //             setItems((prevItems) => [response.data, ...prevItems]);
  //             window.location.reload();
  //           } else {
  //             throw new Error('Failed to change this item');
  //           }
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     }
  //     setNewProduct({}); // Reset newProduct state
  //   };
    
    // const handleSaveNewProduct = async () => {
  //   const newProductWithId = {id: generateUniqueId() ,...newProduct };
  //   const confirmed = window.confirm('Are you sure you want to save the changes?');
  
  //   if (confirmed) {
  //     if (newProductWithId) {
  //       try {
  //         const authToken = localStorage.getItem('authToken');
  //         const response = await axios.post(
  //           'http://127.0.0.1:8000/myapp/items',newProductWithId,
  //           {
  //             headers: {
  //               Authorization: authToken, 
  //             },
  //           }
  //         );
  
  //         if (response.status === 201) {
  //           console.log("this is the data:",response.data)
  //           // setItems(response.data);
  //           window.location.reload();
  //         } else {
  //           throw new Error('Failed to change this item');
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   }
  //   setNewProduct({}); // Reset newProduct state
  // };