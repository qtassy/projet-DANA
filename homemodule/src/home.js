import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logo from "./img/logo1_hori.jpg"
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";

class Menu extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src={Logo} alt="logo principal Dana" width="150"/>
                </a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#"><BsFillPersonFill/>Profil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><AiFillShopping/>Promos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><RiMessage2Fill/>Messages</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><AiOutlineMenuUnfold/>Plus</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

class Card extends React.Component{
    render(){
        return(
            <div></div>
        )
    }
}

class Home extends React.Component{
    render(){
        return(
            <>
                <Menu/>
                <Card/>
            </> 
        )
    }
}

export default Home;