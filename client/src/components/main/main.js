import React, { } from 'react'
import Dashboard from "../dashboard/dashboard"

import Content from "../content/content"
import About from "../content/about"
import Team from '../content/team'

import Extra from "../nav/extra"
import { createMuiTheme } from '@material-ui/core/styles';
import './main.css'


import { Provider } from "react-redux";
import store from "../../store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {createBrowserHistory} from 'history';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: 'rgb(144, 255, 220)',
    },
  },
});

const browserHistory = createBrowserHistory();

function Main() {
  return (
    <Provider store={store}>

      <Router history={browserHistory}>
        <div className='main_container'>

          <div className='main_left'>
            <Dashboard theme={theme} />
          </div>


          <div className='main_right'>
            <Switch>
              <Route exact path="/">

                <Content theme={theme} />
              </Route>
              <Route exact path="/about">
                <About theme={theme} />
              </Route>

              <Route exact path="/team">
                <Team theme={theme} />
              </Route>
            </Switch>

          </div>


        </div>
        {/* <Footer theme={theme}/>*/}

        <Route exact path="/">
          <Extra theme={theme} />
        </Route>

      </Router>
    </Provider>

  )
}

export default Main
