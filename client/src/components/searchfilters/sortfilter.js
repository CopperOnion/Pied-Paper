import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//state management
import { connect } from 'react-redux';
import { setOrdering } from '../../actions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
}));

function SortMenu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    sort: props.topic.order,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    dispatch(setOrdering(event.target.value));
  };

  return (
    <div style={{ display: "inline-block" }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select
          native
          value={state.selectedOption}
          onChange={handleChange}
          label={"Sort"}
          inputProps={{
            name: 'sort',
          }}
        >
          <option value={'DESC'}>Newest</option>
          <option value={'ASC'}>Oldest</option>
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

export default connect(mapStateToProps, {})(SortMenu);