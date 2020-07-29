import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './extra.css'
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

function Extra({theme}) {
    const topics =['World','U.S. Politics' ,'Business' , 'Opinion', 'Tech', 'Science', 'Health' ]
    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={theme}>
              <div>
                <AppBar  elevation={0}  style={{ backgroundColor: 'transparent' , borderBottom: 'solid 1px black' }} position="static">
                    <Toolbar className="extra" style={{minHeight:'32px'}}variant="dense" >
                        <ul>
                            <li>
                                Team
                            </li>

                            <li>
                                Technology
                            </li>

                            <li>
                                devpost
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
              </div>

            </ThemeProvider>
        </>
    )
}


export default Extra
