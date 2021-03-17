import React from 'react';
import Icon1 from "../../img/icon1-home.png";
import Icon2 from "../../img/icon2-home.png";
import './home.scss';

import { IoIosArrowForward } from "react-icons/io";

class Card extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-sm-6 col-md-4 mb-5">
                <div className="card h-100 text-center">
                    <div className="card-body home-card">
                        <a href={this.props.link} className="link-round">
                            <div className="round-home">
                                <IoIosArrowForward className="arrow-home"/>
                            </div>
                        </a>
                        <img src={this.props.icon} alt="icon"/>
                        <h5 className="card-title font-weight-bold text-light">{this.props.title_card}</h5>
                        <p className="card-text text-light">{this.props.text_card}</p>
                    </div>
                </div>
            </div>
        )
    }
}

class Home extends React.Component{
    render(){
        return(
            <div className="container mt-3">
                <h1 className="title-home mb-3">Tableau de bord</h1>
                <div className="row">
                    <Card 
                        icon={Icon1}
                        title_card="Taches administratives" 
                        text_card='On vous accompagne pour vous faciliter la vie avec la "paperasse"'
                        link="\#"
                    />
                    <Card 
                        icon={Icon2}
                        title_card="Gestion des contrats" 
                        text_card="Laisser-vous guider pour transférer ou souscrire à un contrat"
                        link="\#"
                    />
                    <Card 
                        icon={Icon2}
                        title_card="Tri de ses affaires" 
                        text_card="Vous ne savez plus ou donner de la tête ? Trier, donner, jeter ?"
                        link="\#"
                    />
                    <Card 
                        icon={Icon2}
                        title_card="Faire ses cartons" 
                        text_card="Vous ne savez plus ou donner de la tête ?"
                        link="/MakeMyCardboards"
                    />
                    <Card 
                        icon={Icon2}
                        title_card="Le transport" 
                        text_card="Vous ne savez plus ou donner de la tête ?"
                        link="/Transport"
                    />
                </div>
            </div>
        )
    }
}

export default Home;