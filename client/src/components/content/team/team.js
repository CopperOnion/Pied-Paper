import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import './team.css'
function Team({ theme }) {
    return (
        <ThemeProvider theme={theme}>
            <div className="about">
                <Typography style={{ margin: '4vw' }} variant="h1" color='secondary'>
                    Team members
                    <ul>
                        <li>Donghyun Park</li>
                        <li>Minyoung Na</li>
                        <li>Paul Kang</li>
                    </ul>
                </Typography>
            </div>
        </ThemeProvider>
    )
}

export default Team
