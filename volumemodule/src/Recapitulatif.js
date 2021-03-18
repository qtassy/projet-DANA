import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import './Recapitulatif.scss'
const fetch = require('node-fetch');

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

    onClickPlus = (e) => {
        var cat = e.target.id.split('-')[1];
        var libelle = e.target.id.split('-')[2];
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element) => {
            if(element.categorie === cat){
                element.lstObjets.forEach((obj) => {
                    if(obj.libelle === libelle){
                        obj.quantite = obj.quantite + 1 < 0 ? 0 : obj.quantite + 1;
                        liste.nbElements = liste.nbElements + 1;
                    }
                })
            }
        })
        this.setState({ recapitulatif : liste });
    }

    onClickMoins = (e) => {
        var cat = e.target.id.split('-')[1];
        var libelle = e.target.id.split('-')[2];
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element) => {
            if(element.categorie === cat){
                element.lstObjets.forEach((obj) => {
                    if(obj.libelle === libelle){
                        obj.quantite = obj.quantite - 1 < 0 ? 0 : obj.quantite - 1;
                        liste.nbElements = liste.nbElements - 1 < 0 ? 0 : liste.nbElements - 1;
                        if(obj.quantite === 0){
                            this.suppressionObjet(cat, libelle);
                        }
                    }
                })
            }
        })
        this.setState({ recapitulatif : liste });
    }

    onClickSuppr = (e) => {
        var cat = e.target.id.split('-')[1];
        var libelle = e.target.id.split('-')[2];
        this.suppressionObjet(cat, libelle);
    }

    suppressionObjet = (categorie, libelle) => {
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element) => {
            if(element.categorie === categorie){
                var index = -1;
                var quantite = -1;
                for(let i = 0; i < element.lstObjets.length; i++){
                    if(element.lstObjets[i].libelle === libelle){
                        index = i;
                        quantite = element.lstObjets[i].quantite;
                    }
                }
                if(index !== -1 && quantite !== -1){
                    var listeObjets = [...element.lstObjets];
                    listeObjets.splice(index, 1);
                    index = -1;
                    element.lstObjets = listeObjets;
                    liste.nbElements = liste.nbElements - quantite < 0 ? 0 : liste.nbElements - quantite;
                }
            }
        })
        this.setState({ recapitulatif : liste });
    }

    valider = () => {
        console.log(this.state.recapitulatif);
        var url = "http://obiwan2.univ-brest.fr:7199/createRecapitulatif";
        var options = {
            method: 'POST',
            body: JSON.stringify(this.state.recapitulatif),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url, options).then(response => {
            response.json().then(infos => {
                console.log(infos);
            });
        });
    }

    render() {
        return(
            <div className={"container"}>
                <div className={"top row"}>
                    <div className={"col-12"}>
                        <p className={"Title"}><FontAwesomeIcon className={"mt-5 mx-2"} icon={faChevronLeft} /> Récapitulatif</p>
                    </div>
                </div>
                <div className={"mt-5"}>
                    {
                        [...this.state.recapitulatif.lstCategorie].map((x, i) => {
                            return(
                                <React.Fragment>
                                    <div className={" m-2 justify-content-center row"} key={"titreCategorie-" + i}>
                                        <p className={"nomCat col-12"} key={"categorie-" + i} id={"categorie-" + i}>{x.categorie}</p>
                                    </div>
                                    {
                                        x.lstObjets.map((y, j) => {
                                            return(
                                                <div key={"blockCategorie-" + j}>
                                                    <FontAwesomeIcon key={"img-" + j} icon={faImages} />
                                                    <p key={"nom-" + j} id={"nom-" + y.libelle}>{y.libelle}</p>
                                                    <p key={"dimention-" + j} id={"dimention-" + y.libelle}>{"Dim : ...x..."}</p>
                                                    <div key={"calcul-" + j} id={"calcul-" + j}>
                                                        <p key={"quantite-" + j} id={"quantite-" + y.libelle}>{y.quantite}</p>
                                                        <input type="button" key={"moins-" + j} id={"btnMoins-" + x.categorie + "-" + y.libelle} value="-" onClick={e => this.onClickMoins(e)} />
                                                        <input type="button" key={"plus-" + j} id={"btnPlus-" + x.categorie + "-" + y.libelle} value="+" onClick={e => this.onClickPlus(e)} />
                                                        <input type="button" key={"suppr-" + j} id={"btnSuppr-" + x.categorie + "-" + y.libelle} value="x" onClick={e => this.onClickSuppr(e)} />
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
                <button  id="boutonValider" onClick={this.valider} >
                    <span>Cette suggestion me convient</span>
                </button>
                <button  id="boutonAutre" onClick={this.valider} >
                    <span>Je souhaite utiliser mon véhicule personnel</span>
                </button>
            </div>
        )
    }
}

export default Recapitulatif;