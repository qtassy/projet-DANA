import React from 'react';

import Logo from "./img/logo1_hori.jpg"
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";

class LinkMenu extends React.Component{
    render(){
        return(
            <li className="nav-item">
                <a className="nav-link" href="\#">{this.props.icon}{this.props.text}</a>
            </li>
        )
    }
}

class Menu extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light nav-home">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="logo principal Dana" width="150"/>
                </a>
                <ul className="navbar-nav">
                    <LinkMenu icon={<BsFillPersonFill/>} text="Profil"/>
                    <LinkMenu icon={<AiFillShopping/>} text="Promos"/>
                    <LinkMenu icon={<RiMessage2Fill/>} text="Messages"/>
                    <LinkMenu icon={<AiOutlineMenuUnfold/>} text="Plus"/>
                </ul>
            </nav>
        )
    }
}

export default Menu;