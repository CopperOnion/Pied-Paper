import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './footer.css'
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

function Footer({theme}) {
    const topics =['World','U.S. Politics' ,'Business' , 'Opinion', 'Tech', 'Science', 'Health' ]
    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="footer">
                    <>
                    <Typography className={classes.title} variant="h5" color='primary'>
                        Pied Paper
                    </Typography>
                    </>

                    <div>
                        <ul>
                            <li>
                                <Typography className={classes.title} variant="h6" color='primary'>
                                    News
                                </Typography>
                            </li>
                            
                            {
                                topics.map(el => (
                                <li>
                                    <Typography className={classes.title} variant="body2" color='primary'>
                                        {el}
                                    </Typography>
                                </li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}


export default Footer
