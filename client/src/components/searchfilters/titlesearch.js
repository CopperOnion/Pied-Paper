import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
      
      justifyContent:"flex-end",
      flex: 1

    },
    textfield:{
        verticalAlign:"baseline"

    }
  }));

function TitleSearch() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Search title" className={classes.textfield}/>
        
        </form>
    )
}

export default TitleSearch
