import React from 'react'

import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './extra.css'


function Extra({theme}) {
    return (
        <>
            <ThemeProvider theme={theme}>
              <div>
                <AppBar  elevation={0}  style={{ backgroundColor: 'transparent' }} position="static">
                    <Toolbar className="extra" style={{minHeight:'32px'}}variant="dense" >
                        <ul>
                            <li>
                               Submission for 2020 Pytorch summer hackathon
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
