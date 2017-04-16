/**
 * Created by wangbo on 16/04/2017.
 */

import {Router, Route, hashHistory} from 'react-router'
import * as React from "react";
import App from './App'

let AppRouter =
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
export default AppRouter