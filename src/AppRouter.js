/**
 * Created by wangbo on 16/04/2017.
 */

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React from "react";
import App from './App'

import Timer from './doc/Timer'
import Game from './ticgame/tic'


let AppRouter = () =>
  (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/timer">Timer</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={App}/>
        <Route path="/game" component={Game}/>
        <Route path="/timer" component={Timer}/>
      </div>

    </Router>
  )
export default AppRouter