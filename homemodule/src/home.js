import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Icon from "./img/icon-home.png";
import './index.css';

class Card extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-sm-6 col-md-4 mb-5">
                <a href="#" className="link-card">
                    <div className="card h-100 text-center">
                        <div className="card-body home-card">
                            <img src={Icon}/>
                            <h5 className="card-title fw-bold text-light">{this.props.title_card}</h5>
                            <p className="card-text text-light">{this.props.text_card}</p>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

class Home extends React.Component{
    render(){
        return(
            <>
                <div className="container">
                    <div className="row">
                            <Card 
                                title_card="Taches administratives" 
                                text_card='On vous accompagne pour vous faciliter la vie avec la "paperasse"'
                            />
                            <Card 
                                title_card="Gestion des contrats" 
                                text_card="Laisser-vous guider pour transférer ou souscrire à un contrat"
                            />
                            <Card 
                                title_card="Tri de ses affaires" 
                                text_card="Vous ne savez plus ou donner de la tête ? Trier, donner, jeter ?"
                            />
                            <Card title_card="Faire ses cartons" text_card="Vous ne savez plus ou donner de la tête ?"/>
                            <Card title_card="Le transport" text_card="Vous ne savez plus ou donner de la tête ?"/>
                        </div>
                    </div>
            </> 
        )
    }
}

export default Home;