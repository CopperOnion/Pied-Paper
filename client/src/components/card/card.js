import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop: '2vh'
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({title,description, image, theme}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

        <Card elevation={3} className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image= {image}
                title= {title}
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
        </Card>
    </ThemeProvider>

  );
}
