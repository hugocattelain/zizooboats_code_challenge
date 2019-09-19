import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

function createData(
  id,
  name,
  type,
  year,
  bathrooms,
  cabins,
  length,
  nr_guests,
  rating,
  review_rating
) {
  return {
    id,
    name,
    type,
    year,
    bathrooms,
    cabins,
    length,
    nr_guests,
    rating,
    review_rating,
  };
}

const pageLength = [10, 25, 50, 100];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, label: 'Boat Name' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'year', numeric: true, label: 'Year' },
  { id: 'bathrooms', numeric: true, label: 'Bathrooms' },
  { id: 'cabins', numeric: true, label: 'Cabins' },
  { id: 'length', numeric: true, label: 'Length' },
  { id: 'nr_guests', numeric: true, label: 'Guests Capacity' },
  { id: 'rating', numeric: true, label: 'Rating' },
  { id: 'review_rating', numeric: true, label: 'Review Rating' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.title}>
        <Typography variant='h6' id='tableTitle'>
          Boats
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

function TablePaginationActions(props) {
  const classes = useToolbarActionsStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleBackButtonClick(event) {
    onChangePage(page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(page + 1);
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

const useToolbarActionsStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [dense, setDense] = useState(false);
  const [rows, setRows] = useState([]);
  const {
    rowsPerPage,
    page,
    handleChangerowsPerPage,
    handleChangepage,
    pageLengthOptions,
    count,
    boatList,
  } = props;

  useEffect(() => {
    setRows(createRows(boatList));
  }, [boatList]);

  function createRows(list) {
    const rows = list.map(boat => {
      return createData(
        boat.id,
        boat.name,
        boat.type,
        boat.year,
        boat.bathrooms,
        boat.cabins,
        boat.length,
        boat.nr_guests,
        boat.rating,
        boat.review_rating
      );
    });
    return rows;
  }

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const emptyRows = rowsPerPage - rows.length;
  /* rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage); */

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                /* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */
                .map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className={classes.capitalize}>
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.capitalize} align='right'>
                        {row.type}
                      </TableCell>
                      <TableCell align='right'>{row.year}</TableCell>
                      <TableCell align='right'>{row.bathrooms}</TableCell>
                      <TableCell align='right'>{row.cabins}</TableCell>
                      <TableCell align='right'>{row.length}</TableCell>
                      <TableCell align='right'>{row.nr_guests}</TableCell>
                      <TableCell align='right'>{row.rating}</TableCell>
                      <TableCell align='right'>{row.review_rating}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={pageLengthOptions}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangepage}
          onChangeRowsPerPage={handleChangerowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </div>
  );
}

EnhancedTable.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangerowsPerPage: PropTypes.func.isRequired,
  handleChangepage: PropTypes.func.isRequired,
  pageLengthOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number,
};
