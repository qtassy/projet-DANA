import React from 'react';
import Card from "../../components/Card/Card";
import './Home.scss';

import Icon1 from "../../img/icon1-home.png";
import Icon2 from "../../img/icon2-home.png";

class Home extends React.Component{
    render(){
        return(
            <>
                <div className="container-fluid nav-home">
                    <div className="container">
                        <h1 className="title-home mb-0">Tableau de bord</h1>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <Card 
                            icon={Icon1}
                            title_card="Taches administratives" 
                            text_card='On vous accompagne pour vous faciliter la vie avec la "paperasse"'
                            link="#"
                        />
                        <Card 
                            icon={Icon2}
                            title_card="Gestion des contrats" 
                            text_card="Laisser-vous guider pour transférer ou souscrire à un contrat"
                            link="#"
                        />
                        <Card 
                            icon={Icon2}
                            title_card="Tri de ses affaires" 
                            text_card="Vous ne savez plus ou donner de la tête ? Trier, donner, jeter ?"
                            link="#"
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
            </>
            
        )
    }
}

export default Home;