import React from 'react'

import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './toolbar.css'


function Menubar({theme}) {
    const topics =['World','U.S. Politics' ,'Business' , 'Opinion', 'Tech', 'Science', 'Health' ]
    return (
        <>
            <ThemeProvider theme={theme}>
              <div className="menubar">
                <AppBar  elevation={0}  style={{ backgroundColor: 'transparent' , borderBottom: 'solid 1px black' }} position="static">
                    <Toolbar style={{minHeight:'32px'}}variant="dense" >
                        <ul>
                        {
                          topics.map(el => (
                            <li key={el}>{el}</li>
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
