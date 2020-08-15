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
    margin: 0
  },
  select: {
    paddingTop: '3px'
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
    <div style={{ display: "inline-block", marginRight: "1em" }}>
      <FormControl variant="outlined" className={classes.formControl}>

        <InputLabel>Time Range</InputLabel>

        <Select
          native
          value={state.range}
          className={classes.select}
          onChange={handleChange}
          label={"Time Range"}
          inputProps={{
            name: 'range',
            style: { paddingTop: "6px", paddingBottom: "6px", fontSize: '12px', height: 'inherit' }

          }}
        >
          <option value={'12 hours'}>12 hours</option>
          <option value={'24 hours'}>24 hours</option>
          <option value={'48 hours'}>48 hours</option>
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