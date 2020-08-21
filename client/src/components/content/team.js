import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import './about.css'
function Team( {theme}) {
    return (
        <ThemeProvider theme={theme}>
            <div className="about">
                <Typography style={{ margin: '2vw' }} variant="h4" color='primary'>
                    Team members -
                    Our team is composed of three members, all recent graduates from the Cooper Union for the Advancement of Science and Art.
                    <ul>
                        <li>Minyoung Na
                            <ul>
                                <li>Fullstack dev + Design + AWS</li>
                                <li>https://github.com/flyingonionman</li>
                            </ul>
                        </li>
                        <li>Donghyun Park
                            <ul>
                                <li>Fullstack dev + Database management</li>
                                <li>https://github.com/dhyunpark</li>
                            </ul>
                        </li>
                        <li>Paul Kang
                            <ul>
                                <li>Machine Learning Model Development</li>
                                <li>https://github.com/paulhkang</li>
                            </ul>
                        </li>
                    </ul>
                </Typography>
            </div>
        </ThemeProvider>
    )
}

export default Team
