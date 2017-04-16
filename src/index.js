import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//--------------------------------------------
// import TestApp from "./test/TestApp";
//
// ReactDOM.render(
//   <TestApp />,
//   document.getElementById('root')
// );
//-----------------------------------------
// import App from "./App";
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
//--------------------------------------------
// import AppRouter from "./AppRouter";
//
// ReactDOM.render(
//   <AppRouter />,
//   document.getElementById('root')
// );
//---------------------------------------------
import {Router, Route} from 'react-router';
import App from './App'

ReactDOM.render(
  <Router >
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('root')
);