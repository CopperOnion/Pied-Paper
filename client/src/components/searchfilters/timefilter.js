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

function TimeMenu(props) {

  // from here
  const classes = useStyles();
  const [state, setState] = React.useState({
    range: props.topic.range,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    dispatch(setTimeRange(event.target.value));
  };
  // to here ^ , I have NO CLUE AS TO WHAT IM DOING lmao
  return (
    <div style={{ display: "inline-block" }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Time Range</InputLabel>
        <Select
          native
          value={state.selectedOption}
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

const mapStateToProps = state => ({
  topic: state.topic,
  order: state.order,
  range: state.range
})

export default connect(mapStateToProps, {})(TimeMenu);