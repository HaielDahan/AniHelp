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
  const { numSelected , itemsfordelete } = props;
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the profile?');
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
          console.log(response.data);
          // navigate('/');
        } else {
          throw new Error('Failed to delete the profile');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const handleEdit = () => {
    // Perform delete operation
    
    console.log('Edit clicked');
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
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Add">
        <IconButton onClick={handleEdit}>
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
    };
    setOriginalValues((prevOriginalValues) => ({
      ...prevOriginalValues,
      [id]: originalRowValues,
    }));
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

  const handleCellChange = (event, id) => {
    const { name, value } = event.target;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  return (
    <div>
      <NavbarOption />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10vh',
        }}
      >
        <h1>Personal Area</h1>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            itemsfordelete={itemsForDelete}
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
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
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
                          <TextField
                            name="size"
                            value={row.size}
                            onChange={(event) => handleCellChange(event, row.id)}
                          />
                        ) : (
                          row.size
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {editingCells[row.id] ? (
                          <TextField
                            name="animal"
                            value={row.animal}
                            onChange={(event) => handleCellChange(event, row.id)}
                          />
                        ) : (
                          row.animal
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {editingCells[row.id] ? (
                          <TextField
                            name="category"
                            value={row.category}
                            onChange={(event) => handleCellChange(event, row.id)}
                          />
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
                      <TableCell align="right">{row.image}</TableCell>
                      <TableCell align="right">
                        {editingCells[row.id] ? (
                          <>
                            <IconButton onClick={() => handleExitEdit(row.id)}>
                              <CancelIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEditRow(row.id)}>
                              <SaveIcon />
                            </IconButton>
                          </>
                        ) : (
                          isItemSelected && (
                            <IconButton onClick={() => handleEditRow(row.id)}>
                              <EditIcon />
                            </IconButton>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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
