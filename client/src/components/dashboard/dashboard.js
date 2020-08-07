import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { setCurrentTopic , setOrdering} from '../../actions'

import {
    Link
  } from "react-router-dom";

  
import './dashboard.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      marginBottom: '5vh',
      marginTop: '3vh',
      
    },
    list:{
        marginBottom: '1vh'
    },
    h2:{
        fontWeight:"500"
    }

  }));

/* 
TODO: GIVE MORE POWER TO THE DASHBOARD ( make the background darker and font white)


*/
function Dashboard({dispatch,theme}) {
    const classes = useStyles();
    const date = `${returnDay(new Date().getDay())}, ${new Date().getDate()} ${returnMonth(new Date().getMonth())} ${new Date().getFullYear()}`;

    return (
        <ThemeProvider theme={theme}>
            <div className = "dashboard">

                <div>
                    <Typography className={classes.title} style={{marginLeft: '4px'}}variant="overline" color='secondary'>
                            {date}
                    </Typography>
                    
                    <div className="top">
                        <Typography style={{fontWeight:"500"}}className={classes.title} variant="h2" color='secondary'>
                            <Link style={{color:'#90FFDC'}}to="/">Pied Paper</Link>

                        </Typography>
                    </div>
                    

                    <div className= "smallbar">
                        <Typography style={{fontWeight:"600"}} className={classes.title} variant="h5" color='secondary'>
                            Truth-based news aggregator
                        </Typography>
                    </div>

                    <div className= "smallbar">
                        <Typography onClick={()=>{dispatch(setCurrentTopic("general"))}} className={classes.list} variant="subtitle2" color='secondary'>
                            General
                        </Typography>
                        <Typography onClick={()=>{dispatch(setCurrentTopic("technology"))}} className={classes.list} variant="subtitle2" color='secondary'>
                            Technology
                        </Typography>

                        <Typography onClick={()=>{dispatch(setCurrentTopic("business"))}} className={classes.list} variant="subtitle2" color='secondary'>
                            Business
                        </Typography>
                        <Typography onClick={()=>{dispatch(setCurrentTopic("entertainment"))}} className={classes.list} variant="subtitle2" color='secondary'>
                            Entertainment
                        </Typography>

                        <Typography onClick={()=>{dispatch(setOrdering("recent_first"))}} className={classes.list} variant="subtitle2" color='secondary'>
                            Most recent
                        </Typography>
    
                    </div>
                </div>
                

                <div className= "info">

                     <Typography className={classes.info} variant="h6" color='secondary'>
                        <Link style={{color:'#90FFDC'}}to="/about">About</Link>
                      </Typography>


                      <Typography className={classes.info} variant="h6" color='secondary'>
                        <Link style={{color:'#90FFDC'}}to="/team">Team</Link>
                      </Typography>
                </div>

            </div>
        </ThemeProvider>
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
      default: return;
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
      default: return;
    }
  }

export default connect()(Dashboard)
