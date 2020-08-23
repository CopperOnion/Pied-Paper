import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './card.css'

import axios from "axios";

const useStyles = makeStyles({
  root: {
    '.MuiTypography-gutterBottom': {
      marginBottom: "1em"
    },
    display: 'flex',
    flexDirection: 'row',
    padding: '2em',
    transition: 'transform .4s',
    overflow: 'visible',
    height: "20vh",
    


  },
  '.MuiCardContent-root:last-child': {
    padding: 0
  },

  'root:hover': {

  },
  media: {
    height: '20vh',
    flex: .3,
    right: 0
  },

  content: {
    display: 'flex',
    marginRight: '2vw',
    flex: .7,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    marginBottom: "1em"
  },

});

/* 
TODO: Add a detail tab that expands upon hover ( separate from the original card)

*/
export default function MediaCard({ title, description, url, i, image, theme, date, author, roboTF }) {
  const classes = useStyles();
  const [current_true, setTrue] = useState(0)
  const [current_false, setFalse] = useState(0)

  let num_votes = current_true + current_false
  let true_rate = parseFloat((current_true / (num_votes)) * 100).toFixed(2)
  let false_rate = parseFloat((current_false / (num_votes)) * 100).toFixed(2)
  let roboFalse = parseFloat(100 - roboTF).toFixed(2)

  const showmore = useCallback((index) => {
    var element = document.getElementsByClassName(index);
    element[0].classList.remove("notdisplayed");
    element[0].classList.add("displayed");
  }, []);

  const showless = useCallback((index) => {
    var element = document.getElementsByClassName(index);
    element[0].classList.remove("displayed");
    element[0].classList.add("notdisplayed");
  }, []);

  //handler for user voting on articles
  const uservote = useCallback((votetype, url, i) => {
    axios
      .post('/api/news/uservote', {
        headers: { Accept: 'application/json' },
        params: {
          url: url,
          type: votetype
        }
      })
      .then(res => {
        /*
            res = {
                user_true: 123,
                user_false: 123
            }
        */
        showless("details_question" + i)

        console.log(res.data.votes)
        setTrue(res.data.votes.user_true)
        setFalse(res.data.votes.user_false)
        showmore("stats" + i)

      })
  }, []);

  const urlcleanse = /^(?!.*(https))\w+/g;
  let cleansed_author = ""
  /* 
  
  Use effect hook to fetch image using an 
  
  */



  return (
    <div>
      {/* 
      TODO: Open tab unfocused (This might actually be impossible)

      Something on the right side of the cards to give it more jazz

      added shadows to the card
      */}
      <a onClick={() => showmore('attached' + i)} href={url} target="_blank">
        <ThemeProvider theme={theme}>
          <Card elevation={0} className={classes.root}>


            <div className={classes.content}>
              <div className={classes.title}>
                <h3 className='article_title'>  {title} </h3>
                <h5>{author}</h5>

                <h6>{date}</h6>

              </div>


              <p style={{ marginBottom: "50px" }}>
                {description}
              </p>


            </div>



            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />

          </Card>
        </ThemeProvider>
      </a>

      <div className={'attached' + i + ' notdisplayed'}>
        <div className='details'>
          <h3 className={"details_question" + i + " displayed"}>Do you think this article is <button className='details_buttons' onClick={() => uservote("user_true", url, i)}>True News</button> or <button className='details_buttons' onClick={() => uservote("user_false", url, i)}>Fake News</button> ?</h3>

          <div className={'stats' + i + ' notdisplayed'}>
            <h3 className='details_people'>
              Out of {num_votes} reader(s) <br />
              {true_rate}% <sub>({current_true})</sub> thought this was <i>True News</i> while {false_rate}% <sub>({current_false})</sub> thought this article was <i>Fake News</i>
            </h3>
            <h3 className='details_machine'>
              {/* 
                False and True values are flipped on purpose !
              */}
              Our ML algorithm has determined that this article has <br />
              {roboFalse}% chances of being <b>True News</b> and {roboTF}% chances of being <b>Fake News</b>
            </h3>
          </div>

          {/* Do not know if we need these anymore
            <h4 onMouseOver={() => this.showmore("source" + i)} >Hover to see source</h4>
            <h4 className={`source` + i + ' notdisplayed'}>{e.articles.source.name}</h4>  
          */}
        </div>
        <button className = 'details_hide' onClick={() => showless("attached" + i)}>Hide</button>

      </div>
    </div>
  );
}
