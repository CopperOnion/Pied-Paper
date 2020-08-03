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

          <div style={{display:'flex'}}> 

            <div style={{display:'flex', flex:'.5',flexDirection:'column'}}>
              <Dashboard theme={theme}/>
            </div>

    
            <div style={{display:'flex', flex:'.5', flexDirection:'column'}}>
              <Content theme={theme}/>
              <Analysis theme={theme}/>
              <Review theme={theme}/>

            </div>


          </div>
          <Footer theme={theme}/>
          <Extra theme={theme}/>

        </>
    )
}

export default Main
