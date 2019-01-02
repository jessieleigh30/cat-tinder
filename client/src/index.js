import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { initMiddleware, } from 'devise-axios';
import "semantic-ui-css/semantic.min.css";



//this handles all of our tokens for us on each request

initMiddleware();
//react dom takes in two arguments what we want to render and where
//app.js is our routing station
//every route in the component has access to AuthProvider, which means access to consumer(user)

ReactDOM.render(
  //auth is top level because we want it accessible to the whole app
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'));


serviceWorker.unregister();
