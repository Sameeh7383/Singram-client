import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { subscribeUser } from './subscription';
// import {AuthContextProvider} from './context/authContext'


ReactDOM.render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
    <App />
    {/* </AuthContextProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.register();

subscribeUser()