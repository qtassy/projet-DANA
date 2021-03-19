import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Recapitulatif.scss'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
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

    onClickSVGPlus = (e) => {
        /*var liste = this.state.listeActuelle;
        var nom = e.target.parentNode.parentNode.id;
        ([...liste.lstObjets]).forEach(element => {
          if (element.libelle === nom.split('^')[1]) {
            element.quantite += 1;
            this.child.incrementer();
          }
        })
        this.setState({ listeActuelle: liste });*/
      }
    
      onClickSVGMoins = (e) => {
       /* var liste = this.state.listeActuelle;
        var nom = e.target.parentNode.parentNode.id;
        ([...liste.lstObjets]).forEach(element => {
          if (element.libelle === nom.split('^')[1]) {
            element.quantite = element.quantite - 1 < 0 ? 0 : element.quantite -=1;
            this.child.decrementer();
          }
        })
        this.setState({ listeActuelle: liste });*/
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
            <React.Fragment>
                <div className={"top row"}>
                    <div className={"col"}>
                        <p className={"Title"}><a href="/"><FontAwesomeIcon className={"mt-5 mx-2"} icon={faChevronLeft} /></a> Récapitulatif</p>
                    </div>
                </div>
            <div className={"container"}>
                
                <div className={"row"}>
                    <div className={"mt-perso"}>
                        {
                            [...this.state.recapitulatif.lstCategorie].map((x, i) => {
                                return(
                                    <React.Fragment>
                                        <div className={" m-3 justify-content-center row"} key={"titreCategorie-" + i}>
                                            <p className={"nomCat col-12"} key={"categorie-" + i} id={"categorie-" + i}>{x.categorie}</p>
                                        </div>
                                        {
                                            x.lstObjets.map((y, j) => {
                                                return(
                                                    <div className={"row borderBot"} key={"blockCategorie-" + j}>
                                                        <div className="col-2  centerImg">
                                                            <FontAwesomeIcon className={"imgRecap "} key={"img-" + j} icon={faImages} />
                                                        </div>
                                                        <div className="col-4">
                                                            <p key={"nom-" + j} id={"nom-" + y.libelle}>{y.libelle}</p>
                                                            <p key={"dimention-" + j} id={"dimention-" + y.libelle}>{"Dim : ...x..."}</p>
                                                        </div>
                                                        <div className="col-3 justify-content-center centerDot" key={"calcul-" + j}>
                                                            <p class="dot text-center justify-content-center ">
                                                                <span  key={"quantite-" + j} id={"quantite-" + y.libelle}>{y.quantite}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-1 justify-content-center boutonRecapIncrem ">
                                                            <button className={"btn btn-primary incrementButtonRecap m-2 "} key={"moins-" + j} id={"btnMoins-" + x.categorie + "-" + y.libelle} value="-" onClick={e => this.onClickMoins(e)} ><FontAwesomeIcon id={"btnMoins^" + y.libelle} icon={faMinus} onClick={e => this.onClickSVGMoins(e)} /></button>
                                                            <button className={"btn btn-primary incrementButtonRecap m-2"} key={"plus-" + j} id={"btnPlus-" + x.categorie + "-" + y.libelle} value="+" onClick={e => this.onClickPlus(e)} ><FontAwesomeIcon icon={faPlus} id={"btnPlus^" + y.libelle} onClick={e => this.onClickSVGPlus(e)} /></button>
                                                        </div>
                                                        <div className="col-2 justify-content-center boutonRecapSupp" >    
                                                            <button className={"btn btn-primary suppresionButtonRecap"} key={"suppr-" + j} id={"btnSuppr-" + x.categorie + "-" + y.libelle} value="x" onClick={e => this.onClickSuppr(e)} > <FontAwesomeIcon icon={faTimes} id={"btnPlus^" + y.libelle} onClick={e => this.onClickSuppr(e)} /></button>
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
                </div>
                <div className={"row text-center mt-3"}>
                    <div className={"col m-2"}>
                        <button className={"btn btn-primary boutonRecapValider"} id="boutonValider" onClick={this.valider} >
                            <p className={"labelValidation px-4"}>Cette suggestion me convient</p>
                        </button>
                    </div>
                </div>
                <div className={"row text-center"}>
                    <div className={"col "}>
                    <button className={"btn btn-primary boutonRecapPerso"} id="boutonAutre" onClick={this.valider} >
                        <p>Je souhaite utiliser mon véhicule personnel</p>
                    </button>
                    </div>
                </div>
            </div>
            </React.Fragment> 
        )
    }
}

export default Recapitulatif;