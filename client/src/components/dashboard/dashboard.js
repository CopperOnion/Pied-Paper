import React, {useCallback} from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { setCurrentTopic } from '../../actions'

import { Link } from "react-router-dom";

import './dashboard.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  date:{
    marginTop:"10vh",
    marginLeft: '4px'

  },
  title: {
    flexGrow: 1,
  },
  subtitle:{
    flexGrow: 1,
    marginBottom:"10vh"

  },
  list: {
    marginBottom: '1vh',
    cursor: 'pointer',
    fontSize: '2.2vh'
  },
  h2: {
    fontWeight: "500",
  },
  info:{
    fontSize: '3vh'

  }

}));

/* 
TODO: GIVE MORE POWER TO THE DASHBOARD ( make the background darker and font white)


*/

function Dashboard({ dispatch, theme }) {
  const classes = useStyles();
  const date = `${returnDay(new Date().getDay())}, ${new Date().getDate()} ${returnMonth(new Date().getMonth())} ${new Date().getFullYear()}`;
  const topics = ["All","Business","Entertainment","General","Health","Science","Sports","Technology"]


  /*  
    Highlighting which category is selected
  */
  const showline = useCallback((index) => {
    topics.forEach( topic=> {
      var e = document.getElementsByClassName(topic);
      e[0].classList.remove("topic_highlight");
      e[0].classList.add("topic_highlight_hidden");
    })
    
    var element = document.getElementsByClassName(index);
    element[0].classList.remove("topic_highlight_hidden");
    element[0].classList.add("topic_highlight");


  }, []);


  /* 
  Modularized list of topics to choose from

  */
  let topiclist = 
    <>
      {topics.map((e,i)=>{
        if (e=="All"){
          return (<Typography key={i} onClick={() => { dispatch(setCurrentTopic("NULL")); showline(e) }} className={classes.list + " topic_highlight" + " All"} variant="subtitle2" color='secondary'>
            <Link style={{ color: '#90FFDC' }} to="/">All</Link>
          </Typography>)
        }
        else{
          return (<Typography key={i} onClick={() => { dispatch(setCurrentTopic(`\'${e.toLowerCase()}\'`)) ; showline(e)}} className={classes.list + " topic_highlight_hidden " + e} variant="subtitle2" color='secondary'>
            <Link style={{ color: '#90FFDC' }} to="/">{e}</Link>
          </Typography>)
        }
      })}

    </>


  return (
    <ThemeProvider theme={theme}>
      <div className="dashboard">

        <div>
          <Typography className={classes.date} variant="overline" color='secondary'>
            {date}
          </Typography>

          <div className="top">
            <Typography onClick={() => { dispatch(setCurrentTopic("NULL"));}} style={{ fontWeight: "500" ,    fontSize: '7vh' }} className={classes.title} variant="h2" color='secondary'>
              <Link style={{ color: '#90FFDC' }} to="/">Pied Paper</Link>
            </Typography>
          </div>


          <div className="smallbar">
            <Typography style={{ fontWeight: "500" ,fontSize:"3vh"}} className={classes.subtitle} variant="h5" color='secondary'>
              Truth-based news aggregator
            </Typography>
          </div>

          {/* 
            dispatches the actions in index.js
            @setCurrentTopic
            @setOrdering
          */}

          <div className="smallbar">
            {topiclist}


          </div>
        </div>

        <div className="info">
        <Typography className={classes.info} variant="h6" color='secondary'>
            <Link style={{ color: '#90FFDC' }} to="/about">Data.</Link>
          </Typography>

          <Typography className={classes.info} variant="h6" color='secondary'>
            <Link style={{ color: '#90FFDC' }} to="/about">About.</Link>
          </Typography>


          <Typography className={classes.info} variant="h6" color='secondary'>
            <Link style={{ color: '#90FFDC' }} to="/team">Team.</Link>
          </Typography>



        </div>



      </div>
    </ThemeProvider>
  )
}

function returnDay(day) {
  switch (day) {
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

function returnMonth(month) {
  switch (month) {
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
