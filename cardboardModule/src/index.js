import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

<BrowserRouter>
</BrowserRouter>

ReactDOM.render(
  <div>
  <NavBar></NavBar>
   <App />
  </div>,
  document.getElementById('root')
);

reportWebVitals();
