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
    height: "500px",
    borderBottom:'1px solid black',
    borderRadius:'0'
  },
  media: {
    width: '100%',
    height: '100px',
    flex:.3,
  },
  content:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex:.7,
    padding:0,marginRight:'1em'

  },

  cardaction:{
    width: '100%',
    padding:"2% 0",
    display:'flex',


  },
  title:{
    marginBottom:"1em"
  },
  
});

export default function MediaCard({title,description, image, theme}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

        <Card elevation={0} className={classes.root}>
         
            <div className={classes.cardaction}>
               
                <CardContent className={classes.content}>
                    <div className={classes.title}>
                      <h2>  {title} </h2>
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
