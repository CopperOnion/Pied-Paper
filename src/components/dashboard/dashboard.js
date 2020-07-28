import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core/styles';
import DailyCard from './card/card'

import './dashboard.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));


function Dashboard({theme}) {
    const classes = useStyles();

    return (
        <div className = "dashboard">
            <div className = "left">
                <ThemeProvider theme={theme}>
                    <Typography className={classes.title} variant="h1" color='primary'>
                        Pied Paper
                    </Typography>

                    <Typography className={classes.title} variant="h5" color='primary'>
                        The only source of news
                    </Typography>
                </ThemeProvider>

            </div>


            <div className = "right">

                <DailyCard theme={theme}/>
                
            </div>
        
        </div>
    )
}

export default Dashboard
