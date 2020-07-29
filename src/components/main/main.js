import React , { useState} from 'react'
import Navbar from "../nav/navbar"
import Dashboard from "../dashboard/dashboard"
import Menubar from "../nav/toolbar"
import Content from "../content/content"
import Footer from "../nav/footer"
import Extra from "../nav/extra"

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
    const [count,  setCount] = useState(0)

    const increment = () => {
      setCount(count + 1);
    }
    return (
        <div>
          <Navbar theme={theme}/>
          <Dashboard theme={theme}/>
          <Menubar theme={theme}/>
   
          <Content theme={theme}/>

          <Footer theme={theme}/>
          <Extra theme={theme}/>

        </div>
    )
}

export default Main
