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

function SortMenu({ dispatch, order }) {
  //initial setup
  const classes = useStyles();
  const [state, setState] = React.useState({
    sort: order,
  });

  //event handler for changing sort order
  const handleChange = (event) => {
    //changes the local state of the button for the sake of rendering. not the most optimal solution but it works
    setState({
      [event.target.name]: event.target.value,
    });

    //dispatches a reducer to change the state variable for time range to retrieve new range of articles
    dispatch(setOrdering(event.target.value));
  };

  //JSX return values
  return (
    <div style={{ display: "inline-block" }}>
      <FormControl variant="outlined" className={classes.formControl}>

        <InputLabel>Sort By</InputLabel>

        <Select
          native
          value={state.sort}
          onChange={handleChange}
          label={"Sort By"}
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

//brings the state into the component to be used as props
const mapStateToProps = state => ({
  order: state.topic.order
})

//connects the component to the store and bridges the props importer as well
export default connect(
  mapStateToProps
)(SortMenu);