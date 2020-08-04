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
import './main.css'

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

          <div className='main_container'> 

            <div className='main_left'>
              <Dashboard theme={theme}/>
            </div>

    
            <div className='main_right'>
              <Content theme={theme}/>
              {/* <Analysis theme={theme}/> */}
              {/* <Review theme={theme}/> */}

            </div>


          </div>
          {/* <Footer theme={theme}/>*/}
          <Extra theme={theme}/> 

        </>
    )
}

export default Main
