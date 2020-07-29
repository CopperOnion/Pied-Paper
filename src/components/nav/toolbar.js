import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './toolbar.css'
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

function Menubar({theme}) {
    const topics =['World','U.S. Politics' ,'Business' , 'Opinion', 'Tech', 'Science', 'Health' ]
    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={theme}>
              <div className="menubar">
                <AppBar  elevation={0}  style={{ backgroundColor: 'transparent' , borderBottom: 'solid 1px black' }} position="static">
                    <Toolbar style={{minHeight:'32px'}}variant="dense" >
                        <ul>
                        {
                          topics.map(el => (
                            <li>{el}</li>
                          ))
                        }
                        </ul>
                        
                    </Toolbar>
                </AppBar>
              </div>

            </ThemeProvider>
        </>
    )
}


export default Menubar
