import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import CardMedia from '@material-ui/core/CardMedia';

import './team.css'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      display:'flex',
      margin: '5vh'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
        height: 140,
        flex:1,
        maxWidth:'200px'
      },
    content: {
        flex:1
    },
    button: {
        padding:0,
        marginTop:'30px'
    },
  });


function Team({ theme }) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className="team">

                <Card className={classes.root}>
                    <CardContent className={classes.content} >
                        <Typography variant="h5" component="h2">
                            Minyoung Na
                        </Typography>
                        <Typography variant="body2" component="p">
                            Team Lead. Fullstack dev + Design + AWS
                        </Typography>
                        <Button onClick={() => { window.open("https://github.com/flyingonionman");}} className={classes.button} size="small">https://github.com/flyingonionman</Button>
                        
                    </CardContent>
                    <CardMedia
                            className={classes.media}
                            image="https://avatars2.githubusercontent.com/u/39283458?s=460&u=0c84ad1f5b0e74272a4d01e13e4a8013b96bfe13&v=4"
                            title="photo"
                        />
                </Card>

                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h2">
                            Donghyun Park
                        </Typography>
                        <Typography variant="body2" component="p">
                            Fullstack dev + Database management
                        </Typography>
                        <Button onClick={() => { window.open("https://github.com/dhyunpark");}} className={classes.button} size="small">https://github.com/dhyunpark</Button>

                    </CardContent >
                    <CardMedia
                            className={classes.media}
                            image="https://avatars3.githubusercontent.com/u/26557663?s=460&u=9dea15fba60235321c76f5557d3bda10f9c8cc0a&v=4"
                            title="photo"
                        />
                   
                </Card>

                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h2">
                        Paul Kang
                        </Typography>
                        <Typography variant="body2" component="p">
                            Machine Learning Model Development
                        </Typography>
                        <Button onClick={() => { window.open("https://github.com/paulhkang");}} className={classes.button} size="small">https://github.com/paulhkang</Button>

                    </CardContent>
                    <CardMedia
                            className={classes.media}
                            image="https://media-exp1.licdn.com/dms/image/C5603AQG7EdICWm4KZg/profile-displayphoto-shrink_400_400/0?e=1603929600&v=beta&t=OtT_nKn0yINzf_zV2lBXVuCHx3AAR05qtHIMZAPxZ8Y"
                            title="photo"
                        />
                </Card>
                
                
            </div>
        </ThemeProvider>
    )
}

export default Team
