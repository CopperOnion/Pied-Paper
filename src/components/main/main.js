import React , { } from 'react'
import Navbar from "../nav/navbar"
import Dashboard from "../dashboard/dashboard"
import Menubar from "../nav/toolbar"
import Content from "../content/content"
import Footer from "../nav/footer"
import Extra from "../nav/extra"
import Analysis from '../content/analysis'
import Review from '../content/Review.js'
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f44336',
    },
  },
});


function Main() {
    return (
        <>
          <Navbar theme={theme}/>
          <Dashboard theme={theme}/>
          <Menubar theme={theme}/>
   
          <Content theme={theme}/>
          <Analysis theme={theme}/>
          <Review theme={theme}/>

          <Footer theme={theme}/>
          <Extra theme={theme}/>

        </>
    )
}

export default Main
