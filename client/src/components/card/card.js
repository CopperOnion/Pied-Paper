import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './card.css'


const useStyles = makeStyles({
  root: {
    '.MuiTypography-gutterBottom': {
      marginBottom: "1em"
    },
    display: 'flex',
    borderBottom: '1px solid black',
    borderRadius: '0',
    padding: 0,

  },
  '.MuiCardContent-root:last-child': {
    padding: 0
  },

  'root:hover': {
    cursor: 'pointer'
  },
  media: {
    height: '100px',
    flex: .3,
    right: 0
  },

  content: {
    display: 'flex',

    flex: .7,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  cardaction: {
    padding: "3% 0",
    width: '100%',
    display: 'flex',
    '&:hover': {
      cursor: "pointer",
    }
  },

  title: {
    marginBottom: "1em"
  },

});

export default function MediaCard({ title, publication, description, image, theme, onClickCard, publishdate, category }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

      <Card elevation={0} className={classes.root}>

        <div onClick={onClickCard} className={classes.cardaction}>

          <div className={classes.content}>
            <div className={classes.title}>
              <h3>  {title} </h3>
              <h5>The verge</h5>


            </div>


            <p>
              {description}
            </p>

            <h6>{publishdate}<br />{category}</h6>


          </div>




          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
        </div>



      </Card>
    </ThemeProvider>

  );
}
