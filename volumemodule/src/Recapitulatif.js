import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

export class Recapitulatif extends React.Component {
    constructor(){
        super();
        this.state = {
            recapitulatif : {
                lstCategorie : []
            }
        }
    }

    componentDidMount = () => {
        var recap = localStorage.getItem("Recapitulatif");
        console.log(JSON.parse(recap));
        this.setState({ recapitulatif : JSON.parse(recap) });
    }

    render() {
        return(
            <div id="recapitulatif">
                {
                    [...this.state.recapitulatif.lstCategorie].map((x, i) => {
                        return(
                            <React.Fragment>
                                <div key={"titreCategorie-" + i}>
                                    <p key={"categorie-" + i} id={"categorie-" + i}>{x.categorie}</p>
                                </div>
                                {
                                    x.lstObjets.map((y, j) => {
                                        return(
                                            <div key={"blockCategorie-" + j}>
                                                <FontAwesomeIcon icon={faImages} />
                                                <p key={"nom-" + j} id={"nom-" + y.libelle}>{y.libelle}</p>
                                                <p key={"dimention-" + j} id={"dimention-" + y.libelle}>{"Dim : ...x..."}</p>
                                                <div key={"calcul-" + j} id={"calcul-" + j}>
                                                    <p key={"quantite-" + j} id={"quantite-" + y.libelle}>{y.quantite}</p>
                                                    <input type="button" key={"moins-" + j} id={"btnMoins-" + y.libelle} value="-" onClick={e => this.onClickMoins(e)} />
                                                    <input type="button" key={"plus-" + j} id={"btnPlus-" + y.libelle} value="+" onClick={e => this.onClickPlus(e)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                    
                                }
                            </React.Fragment>
                        )
                        
                    })
                }
            </div>
        )
    }
}

export default Recapitulatif;