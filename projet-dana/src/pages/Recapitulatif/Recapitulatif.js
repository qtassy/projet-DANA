import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Recapitulatif.scss'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
const fetch = require('node-fetch');

export class Recapitulatif extends React.Component {
    constructor() {
        super();
        this.state = {
            recapitulatif: {
                lstCategorie: []
            }
        }
    }

    /**
     * Effectuer au montage du composant
     * Récupère le récapitulatif en variable session
   */
    componentDidMount = () => {
        var recap = localStorage.getItem("Recapitulatif");
        console.log(JSON.parse(recap));
        this.setState({ recapitulatif: JSON.parse(recap) });
    }

    /**
     * Appeler quand on clique sur le bouton + d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction incrementer()
     * @param {*} e Input type button
   */
    onClickPlus = (e) => {
        var cat = e.target.id.split('-')[1];
        var libelle = e.target.id.split('-')[2];
        this.incrementer(cat, libelle);
    }

    /**
     * Appeler quand on clique sur le SVG du bouton + d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction incrementer()
     * @param {*} e Input type button
   */
    onClickSVGPlus = (e) => {
        var cat = e.target.parentNode.id.split('^')[1];
        var libelle = e.target.parentNode.id.split('^')[2];
        this.incrementer(cat, libelle);
    }

    /**
     * Appeler quand on clique sur le bouton - d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction decrementer()
     * @param {*} e Input type button
   */
    onClickMoins = (e) => {
        var cat = e.target.id.split('^')[1];
        var libelle = e.target.id.split('^')[2];
        this.decrementer(cat, libelle);
    }
    /**
     * Appeler quand on clique sur le SVG du bouton - d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction decrementer()
     * @param {*} e Input type button
   */
    onClickSVGMoins = (e) => {
        var cat = e.target.parentNode.id.split('^')[1];
        var libelle = e.target.parentNode.id.split('^')[2];
        this.decrementer(cat, libelle);
    }

    /**
     * Fonction qui incrémente la quantité d'un objet dans la liste de la catégorie du récapitulatif
     * @param {*} cat La catégorie de l'objet.
     * @param {*} libelle Le nom de l'objet
   */
    incrementer = (cat, libelle) => {
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element) => {
            if (element.categorie === cat) {
                element.lstObjets.forEach((obj) => {
                    if (obj.libelle === libelle) {
                        obj.quantite = obj.quantite + 1;
                        liste.nbElements = liste.nbElements + 1;
                    }
                })
            }
        })
        this.setState({ recapitulatif: liste });
    }

    /**
     * Fonction qui décrémente la quantité d'un objet dans la liste de la catégorie du récapitulatif
     * @param {*} cat La catégorie de l'objet.
     * @param {*} libelle Le nom de l'objet
   */
    decrementer = (cat, libelle) => {
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element) => {
            if (element.categorie === cat) {
                element.lstObjets.forEach((obj) => {
                    if (obj.libelle === libelle) {
                        obj.quantite = obj.quantite - 1 < 0 ? 0 : obj.quantite - 1;
                        liste.nbElements = liste.nbElements - 1 < 0 ? 0 : liste.nbElements - 1;
                        if (obj.quantite === 0) {
                            this.suppressionObjet(cat, libelle);
                        }
                    }
                })
            }
        })
        this.setState({ recapitulatif: liste });
    }

    /**
     * Appeler quand on clique sur le SVG du bouton x d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction suppressionObjet()
     * @param {*} e Input type button
   */
    onClickSVGSuppr = (e) => {
        var cat = e.target.parentNode.id.split('^')[1];
        var libelle = e.target.parentNode.id.split('^')[2];
        this.suppressionObjet(cat, libelle);
    }

    /**
     * Appeler quand on clique sur le bouton x d'un objet.
     * Récupère le libelle de l'objet et sa catégorie.
     * Apelle la fonction suppressionObjet()
     * @param {*} e Input type button
   */
    onClickSuppr = (e) => {
        var cat = e.target.id.split('^')[1];
        var libelle = e.target.id.split('^')[2];
        this.suppressionObjet(cat, libelle);
    }

    /**
     * Fonction qui supprime un objet dans la liste de la catégorie du récapitulatif
     * Et si la liste de la catégorie est vide, supprime la catégorie du récapitulatif
     * @param {*} cat La catégorie de l'objet.
     * @param {*} libelle Le nom de l'objet
   */
    suppressionObjet = (categorie, libelle) => {
        var liste = this.state.recapitulatif;
        [...liste.lstCategorie].forEach((element, indexLst) => {
            if (element.categorie === categorie) {
                var index = -1;
                var quantite = -1;
                for (let i = 0; i < element.lstObjets.length; i++) {
                    if (element.lstObjets[i].libelle === libelle) {
                        index = i;
                        quantite = element.lstObjets[i].quantite;
                    }
                }
                if (index !== -1 && quantite !== -1) {
                    var listeObjets = [...element.lstObjets];
                    listeObjets.splice(index, 1);
                    index = -1;
                    element.lstObjets = listeObjets;
                    liste.nbElements = liste.nbElements - quantite < 0 ? 0 : liste.nbElements - quantite;
                }
                if (element.lstObjets.length === 0) {
                    liste.lstCategorie.splice(indexLst, 1);
                }
            }
        })
        this.setState({ recapitulatif: liste });
    }

    /**
     * Évènnement de clique sur les 2 boutons de validation
     * Permet l'enregistrement du récapitulatif.
     */
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
                localStorage.removeItem("Recapitulatif");
                window.location.href = "/home"
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={"top row"}>
                    <div className={"col"}>
                        <p className={"Title"}><a href="/CalculateurVolume"><FontAwesomeIcon className={"mt-5 mx-2"} icon={faChevronLeft} /></a> Récapitulatif</p>
                    </div>
                </div>
                <div className={"container"}>

                    <div className={"row"}>
                        <div className={"mt-perso"}>
                            {
                                [...this.state.recapitulatif.lstCategorie].map((x, i) => {
                                    return (
                                        <React.Fragment>
                                            <div className={" m-3 justify-content-center row"} key={"titreCategorie-" + i}>
                                                <p className={"nomCat col-12"} key={"categorie-" + i} id={"categorie-" + i}>{x.categorie}</p>
                                            </div>
                                            {
                                                x.lstObjets.map((y, j) => {
                                                    return (
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
                                                                    <span key={"quantite-" + j} id={"quantite-" + y.libelle}>{y.quantite}</span>
                                                                </p>
                                                            </div>
                                                            <div className="col-1 justify-content-center boutonRecapIncrem ">
                                                                <button className={"btn btn-primary incrementButtonRecap m-2 "} key={"moins-" + j} id={"btnMoins^" + x.categorie + "^" + y.libelle} value="-" onClick={e => this.onClickMoins(e)} ><FontAwesomeIcon id={"btnMoins^" + x.categorie + "^" + y.libelle} icon={faMinus} onClick={e => this.onClickSVGMoins(e)} /></button>
                                                                <button className={"btn btn-primary incrementButtonRecap m-2 "} key={"plus-" + j} id={"btnPlus^" + x.categorie + "^" + y.libelle} value="+" onClick={e => this.onClickPlus(e)} ><FontAwesomeIcon icon={faPlus} id={"btnPlus^" + x.categorie + "^" + y.libelle} onClick={e => this.onClickSVGPlus(e)} /></button>
                                                            </div>
                                                            <div className="col-2 justify-content-center boutonRecapSupp">
                                                                <button className={"btn btn-primary suppresionButtonRecap"} key={"suppr-" + j} id={"btnSuppr^" + x.categorie + "^" + y.libelle} value="x" onClick={e => this.onClickSuppr(e)} > <FontAwesomeIcon icon={faTimes} id={"btnSuppr^" + x.categorie + "^" + y.libelle} onClick={e => this.onClickSVGSuppr(e)} /></button>
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