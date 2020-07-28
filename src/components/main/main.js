import React , { useState} from 'react'
import Navbar from "../nav/navbar"
import Dashboard from "../dashboard/dashboard"

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
                
        </div>
    )
}

export default Main
