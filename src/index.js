import React from "react";
import ReactDOM from "react-dom";

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import injectTapEventPlugin from "react-tap-event-plugin";

import "./index.css";
//-----------------------------------------
//import TestApp from "./test/TestApp";
// const App = () => (
//   <MuiThemeProvider>
//     <TestApp/>
//   </MuiThemeProvider>
// )
//
// ReactDOM.render(
//   <App />,
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
// import AppRouter from './AppRouter'
// ReactDOM.render(
//   <AppRouter/>,
//   document.getElementById('root')
// );
//---------------------------------------------
// import Login from "./health/Login";

//--------------------------------------------

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
//
//
// const App = () => (
//   <MuiThemeProvider>
//     <Login/>
//   </MuiThemeProvider>
// )
// ReactDOM.render(
//   <App/>,
//   document.getElementById('root')
// );
//---------------------------------------------
import App from './health/HealthApp'

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
