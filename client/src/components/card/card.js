import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './card.css'

import axios from "axios";

const useStyles = makeStyles({
  root: {
    '.MuiTypography-gutterBottom': {
      marginBottom: "1em"
    },
    display: 'flex',
    flexDirection:'row',
    padding: 0,
    transition:'transform .4s',
    overflow:'visible',
    height:"20vh",
    marginBottom:"2vh"
  },
  '.MuiCardContent-root:last-child': {
    padding: 0
  },

  'root:hover': {
    
  },
  media: {
    height: '20vh',
    flex: .3,
    right: 0
  },

  content: {
    display: 'flex',
    marginRight: '2vw',
    flex: .7,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    marginBottom: "1em"
  },

});
/* 
TODO: Add a detail tab that expands upon hover ( separate from the original card)

*/
export default function MediaCard({ title, description, theme ,date , author , image}) {
  const classes = useStyles();

  const urlcleanse = /^(?!.*(https))\w+/g;
  let cleansed_author = ""
  /* 
  
  Use effect hook to fetch image using an 
  
  */
  
  



  return (
    <ThemeProvider theme={theme}>

      <Card elevation={0} className={classes.root}>


          <div className={classes.content}>
            <div className={classes.title}>
              <h3 className='article_title'>  {title} </h3>
              <h5>{author}</h5>

              <h6>{date}</h6>

            </div>


            <p style={{marginBottom:"50px"}}>
              {description}
            </p>

            
          </div>




          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />

        


      </Card>
    </ThemeProvider>

  );
}
