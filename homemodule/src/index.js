import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.js';
import Home from './home.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);
