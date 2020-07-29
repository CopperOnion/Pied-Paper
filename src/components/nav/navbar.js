import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InstagramIcon from '@material-ui/icons/Instagram';
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
     
    },
    loginButton:{
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1,
    },
  }));

function Navbar({theme}) {
    const classes = useStyles();
    const date = `${returnDay(new Date().getDay())}, ${new Date().getDate()} ${returnMonth(new Date().getMonth())} ${new Date().getFullYear()}`;
    return (
        <>
            <ThemeProvider theme={theme}>
              <AppBar  elevation={0}  style={{ backgroundColor: 'transparent' , borderBottom: 'solid 1px black' }} position="static">
                  <Toolbar variant="dense" >

                      <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                        <MenuIcon/>
                      </IconButton>

                      <AccessTimeIcon className={classes.loginButton} color="primary" />

                      <Typography className={classes.title} variant="subtitle1" color='primary'>
                          {date}
                      </Typography>


                      <Button  className={classes.loginButton} color="black">Login</Button>

                      <InstagramIcon color="primary" />

                  </Toolbar>
              </AppBar>
            </ThemeProvider>
        </>
    )
}

function returnDay(day){
  switch (day){
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}

function returnMonth(month){
  switch (month){
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
  }
}

export default Navbar
