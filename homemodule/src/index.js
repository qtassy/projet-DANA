import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Logo from "./img/logo1_hori.jpg"
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";

class Menu extends React.Component{
  render(){
      return(
          <nav className="navbar navbar-expand-lg navbar-dark nav-home mb-5">
              <a className="navbar-brand" href="#">
                  <img src={Logo} alt="logo principal Dana" width="150"/>
              </a>
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <a className="nav-link active" href="#"><BsFillPersonFill/>Profil</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#"><AiFillShopping/>Promos</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#"><RiMessage2Fill/>Messages</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#"><AiOutlineMenuUnfold/>Plus</a>
                  </li>
              </ul>
          </nav>
      )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);
