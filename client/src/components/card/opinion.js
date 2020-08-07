import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './card.css'


const useStyles = makeStyles({
  root: {
    '.MuiTypography-gutterBottom':{
      marginBottom:"1em"
    },
    display:'flex',
    height:'100px',
    borderRadius:0,
    marginBottom : '4vh'

  },
  left:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    marginRight:'2em',
    width: '100vh'
  },

  cardaction_left:{
    display:'flex',
    width: '100vw'
  },

  title:{
    borderRadius:'0',
    borderLeft:'solid 6px #8AC4FF',
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
