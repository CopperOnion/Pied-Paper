import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//state management
import { connect } from 'react-redux';
import { setTimeRange } from '../../actions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
}));

function TimeMenu({ dispatch, range }) {
  //initial setup
  const classes = useStyles();
  const [state, setState] = React.useState({
    range: range,
  });

  //event handler for changing time range
  const handleChange = (event) => {
    //changes the local state of the button for the sake of rendering. not the most optimal solution but it works
    setState({
      [event.target.name]: event.target.value,
    });

    //dispatches a reducer to change the state variable for time range to retrieve new range of articles
    dispatch(setTimeRange(event.target.value));
  };

  //JSX return values
  return (
    <div style={{ display: "inline-block" }}>
      <FormControl variant="outlined" className={classes.formControl}>

        <InputLabel>Time Range</InputLabel>

        <Select
          native
          value={state.range}
          onChange={handleChange}
          label={"Time Range"}
          inputProps={{
            name: 'range',
          }}
        >
          <option value={'1 day'}>1 day</option>
          <option value={'7 days'}>7 days</option>
          <option value={'30 days'}>30 days</option>
        </Select>
      </FormControl>
    </div>
  )
};

//brings the state into the component to be used as props
const mapStateToProps = state => ({
  range: state.topic.range
})

//connects the component to the store and bridges the props importer as well
export default connect(
  mapStateToProps
)(TimeMenu);