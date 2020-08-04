import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './card.css'


const useStyles = makeStyles({
  root: {
    '.MuiTypography-gutterBottom':{
      marginBottom:"1em"
    },
    display:'flex',
    
    borderRadius:0
  },
  left:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '2vh',
    marginRight:'2em',
    paddingRight: '2em',
    
  },

  cardaction_left:{
    display:'flex',
  },

  title:{
    borderRadius:'0',
    borderLeft:'solid 6px #62a87c',
    marginBottom:"1em",
    paddingLeft:"1em"

  },

  heading:{
    marginBlockStart: 0     ,
    marginBlockEnd: '.2em'
  }
  
});

export default function MediaCard({title,description, image, theme}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

        <Card elevation={0} className={classes.root}>
         
            <div className={classes.cardaction_left}>
               
                <CardContent className={classes.left}>
                    <div className={classes.title}>
                      <h2 className={classes.heading}>  {title} </h2>
                      <h5>The verge</h5>


                    </div>
                    

                    <p>
                    {description}


                    </p>



                </CardContent>

            </div>


        </Card>
    </ThemeProvider>

  );
}
