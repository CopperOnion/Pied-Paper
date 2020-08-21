import React from 'react'
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import logo from "./logo.svg";
import './about.css'
function About( {theme}) {
    return (
        <ThemeProvider theme={theme}>
            <div className="about">
                <Typography  style={{marginLeft: '2vw', marginTop:'4vh'}}variant="h4" color='primary'>
                    What is Pied Paper?
                </Typography>

                <img src={logo} alt="Kiwi standing on oval" height="200px" width="200px"/>

                <Typography  style={{marginLeft: '2vw', marginTop:'1.5vh'}}variant="body1" color='primary'>
                    This project was made as a submission to the PyTorch Summer Hackathon 2020. The task was to build a web application using PyTorch libraries.
                    Our project is a truth-based news aggregator. With the rise of smaller, internet-based news publications, and political value in controlling the spread of information, fake news has become a genuine problem. Pied Paper seeks to provide a clearer view of online news, using real news articles scraped from the web.
                    Our website aggregates news from various media sites, and uses a PyTorch-based neural net model to classify articles as fake or real. This model is trained on a fake/real news dataset obtained from Kaggle. The model’s prediction is shown to the user, and user input is also taken to measure users’ agreement with the model. Articles can be sorted by genre and date.

                </Typography>

                <Typography  style={{marginLeft: '2vw', marginTop:'1.5vh'}}variant="body1" color='primary'>
                    The goal of this project is to give users an opportunity to see for themselves the existence of “fake news”, and to interact with it. Our model provides a baseline prediction to the user, but a key part of the app is the user being challenged to read articles themselves and form their own opinions. “Fake news” is used both as a factual term and a derogatory term: some news is truly made-up, while some news is labeled as “fake” by opposing political groups. In the case of the latter, a user being shown that articles that they considered trustworthy are actually fake may be eye-opening.

                </Typography>


            </div>
        </ThemeProvider>
    )
}

export default About
