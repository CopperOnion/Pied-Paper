import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core/styles';

import './dashboard.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      marginBottom: '2vh'
    },
  }));


function Dashboard({theme}) {
    const classes = useStyles();

    return (
        <div className = "dashboard">
   
            
            <div className="top">
                <ThemeProvider theme={theme}>
                    <Typography className={classes.title} variant="h2" color='primary'>
                        Pied Paper
                    </Typography>
                </ThemeProvider>
            </div>
            

            <div className= "smallbar">
                <ThemeProvider theme={theme}>
                    <Typography className={classes.title} variant="h5" color='primary'>
                        Truth-based news aggregator
                    </Typography>
                </ThemeProvider>
            </div>


        </div>
    )
}

export default Dashboard
