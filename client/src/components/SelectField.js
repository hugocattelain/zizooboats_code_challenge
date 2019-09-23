import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

MultipleSelect.propTypes = {
  handleTypeChange: PropTypes.func.isRequired,
  boatTypeList: PropTypes.array.isRequired,
};

export default function MultipleSelect(props) {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState(props.selectedType);
  const { boatTypeList, handleTypeChange } = props;

  function handleChange(event) {
    setPersonName(event.target.value);
    handleTypeChange(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='select-multiple-checkbox'>Boat Type</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id='select-multiple-checkbox' />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {boatTypeList.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
