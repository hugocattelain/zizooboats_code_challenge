import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cell: {
    flexBasis: '50%',
  },
}));
export default function DetailsDialog(props) {
  const classes = useStyles();
  const { open, closeDialog, boat } = props;
  const boatProps = Object.keys(boat);
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Boat Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {boatProps.map((prop, index) => {
            return (
              <div key={index}>
                <Typography align='left' className={classes.cell}>
                  {prop}
                </Typography>
                <Typography align='right' className={classes.cell}>
                  {boat[prop]}
                </Typography>
              </div>
            );
          })}
          <Typography align='left'></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
