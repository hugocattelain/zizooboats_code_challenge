import React from 'react';
import AutoCompleteTextField from './AutoCompleteTextField';
import SelectField from './SelectField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  sliders: {
    position: 'relative',
    bottom: '150px',
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  dialogContent: {
    overflowY: 'hidden',
  },
}));
export default function FilterDialog(props) {
  const classes = useStyles();
  const {
    dialogIsOpen,
    closeDialog,
    handleFiltersChange,
    locationList,
    boatTypeList,
    ratingOptions,
    lengthOptions,
    guestsNumberOptions,
    filterValues,
  } = props;

  const [type, setType] = React.useState(filterValues.type);
  const [location, setLocation] = React.useState(filterValues.location);
  const [minLength, setMinLength] = React.useState(filterValues.minLength);
  const [maxLength, setMaxLength] = React.useState(filterValues.maxLength);
  const [minGuests, setMinGuests] = React.useState(filterValues.minGuests);
  const [maxGuests, setMaxGuests] = React.useState(filterValues.maxGuests);
  const [minRating, setMinRating] = React.useState(filterValues.minRating);
  const [maxRating, setMaxRating] = React.useState(filterValues.maxRating);
  const handleTypeChange = value => {
    setType(value);
  };

  const handleLocationChange = value => {
    setLocation(value);
  };

  const handleLengthChange = (event, newValue) => {
    setMinLength(newValue[0]);
    setMaxLength(newValue[1]);
  };

  const handleGuestsChange = (event, newValue) => {
    setMinGuests(newValue[0]);
    setMaxGuests(newValue[1]);
  };

  const handleRatingChange = (event, newValue) => {
    setMinRating(newValue[0]);
    setMaxRating(newValue[1]);
  };

  const handleSubmit = () => {
    handleFiltersChange({
      type: type,
      location: location,
      minLength: minLength,
      maxLength: maxLength,
      minGuests: minGuests,
      maxGuests: maxGuests,
      minRating: minRating,
      maxRating: maxRating,
    });
  };

  return (
    <div>
      <Dialog
        open={dialogIsOpen}
        onClose={closeDialog}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Filters</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.input}>
            <AutoCompleteTextField
              suggestions={locationList}
              handleLocationChange={handleLocationChange}
              selectedItems={location}
            />
          </div>
          <Divider />
          <div className={classes.sliders}>
            <div className={classes.input}>
              <SelectField
                handleTypeChange={handleTypeChange}
                boatTypeList={boatTypeList}
                selectedType={type}
              />
            </div>
            <Typography id='range-slider-1' gutterBottom>
              Length
            </Typography>
            <Slider
              value={[minLength, maxLength]}
              onChange={handleLengthChange}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider-1'
              max={lengthOptions[1]}
              className={classes.input}
            />
            <Typography id='range-slider-2' gutterBottom>
              Number of guests
            </Typography>
            <Slider
              value={[minGuests, maxGuests]}
              onChange={handleGuestsChange}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider-2'
              max={guestsNumberOptions[1]}
              className={classes.input}
            />
            <Typography id='range-slider-3' gutterBottom>
              Rating (reviews)
            </Typography>
            <Slider
              value={[minRating, maxRating]}
              onChange={handleRatingChange}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider-3'
              max={ratingOptions[1]}
              className={classes.input}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
