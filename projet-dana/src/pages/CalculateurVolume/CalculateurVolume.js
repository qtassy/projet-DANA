import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import './CalculateurVolume.scss'
import Resume from '../../components/Resume';
const fetch = require('node-fetch');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recapitulatif: [],
      listeActuelle: {
        lstObjets: []
      },
      categorie: ""
    }
    this.child = null;
  }

  /**
   * Effectuer au montage du composant
   * Demande les données des catégorie pour les affichers
   * et créer le récapitulatif en propriété du composant.
   */
  componentDidMount() {
    var url = "http://obiwan2.univ-brest.fr:7199/categorie";
    var options = {
      method: 'GET',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, options).then(response => {
      response.json().then(infos => {
        var nouvelleListe = [];

        ([...infos]).forEach(element => {
          let data = {
            categorie: element.libelle,
            idCategorie: element.idCategorie,
            lstObjets: []
          }
          nouvelleListe.push(data);
        })
        async function func() {
          return new Promise((resolve) => {
            nouvelleListe.forEach((element, index, array) => {

              let getObjets = async (element) => {
                return new Promise((resolve) => {
                  var url = "http://obiwan2.univ-brest.fr:7199/getObjets/" + element.idCategorie;
                  var options = {
                    method: 'GET',
                    body: null,
                    headers: { 'Content-Type': 'application/json' }
                  }
                  fetch(url, options).then(response => {
                    response.json().then(infos => {
                      ([...infos]).forEach(objet => {
                        element.lstObjets.push({
                          idObjet: objet.idObjet,
                          libelle: objet.libelle,
                          quantite: 0
                        })
                      })
                      resolve(element);
                    });
                  });
                })
              }
              getObjets(element).then(result => {
                element = result;
                if (index === array.length - 1) resolve();
              })

            })
          })
        }
        func().then(_ => {
          this.setState({ listeActuelle: nouvelleListe[0] })
          this.setState({ recapitulatif: nouvelleListe })
          this.setState({ categorie: nouvelleListe[0].categorie })
          
          var selectedButton = document.getElementById("btnCategorie"+this.state.categorie);
          selectedButton.classList.add("Actif");
        })
      })
    })
  }


  /**
   * Appeler quand on clique sur le bouton d'une catégorie
   * Change la catégorie courante et la liste d'objets courant dans la page.
   * Sauvegarde l'ancienne liste d'objets dans le récapitulatif.
   * @param {*} e input type button
   */
  onClickCategorie = async (e) => {
    this.state.recapitulatif.forEach(element => {
      if (element.categorie === this.state.categorie) {
        element = this.state.listeActuelle;
        
      }
    })
 
    var unselectedButton = document.getElementById("btnCategorie"+this.state.categorie);
    unselectedButton.classList.rResumeemove("Actif");
    console.log(this.state.categorie)
    console.log(e.target.value)
    await this.setState({ categorie: e.target.value });

    var selectedButton = document.getElementById("btnCategorie"+this.state.categorie);
    selectedButton.classList.add("Actif");
    console.log(this.state.categorie)

    this.state.recapitulatif.forEach(element => {
      if (element.categorie === this.state.categorie) {
        this.setState({ listeActuelle: element });
      }
    })
  }

  /**
   * Appeler quand on clique sur le bouton - d'un objet.
   * Récupère la liste courante d'objets et le nom de l'objet.
   * Apelle la fonction decrementer()
   * @param {*} e input type button
   */
  onClickMoins = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.id;
    this.decrementer(liste, nom);
  }

  /**
   * Appeler quand on clique sur le SVG du bouton - d'un objet.
   * Récupère la liste courante d'objets et le nom de l'objet.
   * Apelle la fonction decrementer()
   * @param {*} e svg FontAwesom de l'input type button
   */
  onClickSVGMoins = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.parentNode.parentNode.id;
    this.decrementer(liste, nom);
  }

  /**
   * Fonction qui décrémente la quantité d'un objet dans la liste courante d'objets
   * @param {*} liste La liste d'objet courante : this.state.listeActuelle.
   * @param {*} nom Le nom de l'objet
   */
  decrementer = (liste, nom) => {
    ([...liste.lstObjets]).forEach(element => {
      if (element.libelle === nom.split('^')[1]) {
        element.quantite = element.quantite - 1 < 0 ? 0 : element.quantite -=1;
        this.child.decrementer();
      }
    })
    this.setState({ listeActuelle: liste });
  }

  /**
   * Appeler quand on clique sur le SVG du bouton + d'un objet.
   * Récupère la liste courante d'objets et le nom de l'objet.
   * Apelle la fonction incrementer()
   * @param {*} e svg FontAwesom de l'input type button
   */
  onClickSVGPlus = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.parentNode.parentNode.id;
    this.incrementer(liste, nom);
  }

  /**
   * Appeler quand on clique sur le bouton + d'un objet.
   * Récupère la liste courante d'objets et le nom de l'objet.
   * Apelle la fonction incrementer()
   * @param {*} e Input type button
   */
  onClickPlus = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.id;
    this.incrementer(liste, nom);
  }

  /**
   * Fonction qui incrémente la quantité d'un objet dans la liste courante d'objets
   * @param {*} liste La liste d'objet courante : this.state.listeActuelle.
   * @param {*} nom Le nom de l'objet
   */
  incrementer = (liste, nom) => {
    ([...liste.lstObjets]).forEach(element => {
      if (element.libelle === nom.split('^')[1]) {
        element.quantite += 1;
        this.child.incrementer();
      }
    })
    this.setState({ listeActuelle: liste });
  }

  /**
   * Définis un composant réact comme "enfant" et l'enregistre en propriété de la classe.
   * Permet d'utiliser ses méthodes.
   * @param {*} element Composant Resume
   */
  setChild = element => {
    this.child = element;
  }

  /**
   * Fonction de validation du calculateur de volume (appelé par le composant fils Resume).
   * Traite le récapitulatif en enlevant les objets vide et les catégorie qui n'ont aucun objet
   * L'enregistre en variable session et redirige la page vers le composant Recapitulatif.
   * @param {*} data Données venant du composant fils Resume
   */
  submit = (data) => {
    this.state.recapitulatif.forEach(element => {
      if (element.categorie === this.state.categorie) {
        element = this.state.listeActuelle;
      }
    })
    
    var nouveauRecap = {
      lstCategorie : []
    };
    var nouvelleListeObjets = [];
    nouveauRecap.idClient = localStorage.getItem("clientId");
    nouveauRecap.nbElements = data.nbElements;
    nouveauRecap.surface = data.surface;
    this.state.recapitulatif.forEach(element => {
      ([...element.lstObjets]).forEach(objet => {
        if(objet.quantite > 0){
          nouvelleListeObjets.push(objet);
        }
      })
      if(nouvelleListeObjets.length > 0){
        element.lstObjets = nouvelleListeObjets;
        nouveauRecap.lstCategorie.push(element);
        nouvelleListeObjets = [];
      }
    })

    console.log(nouveauRecap);
    localStorage.setItem("Recapitulatif", JSON.stringify(nouveauRecap));
    window.location.href = "/Recapitulatif";
  }

  render() {
    return (
      
    <React.Fragment>
      <div className={"top row"}>
          <div className={"col-12"}>
            <p className={"Title"}><FontAwesomeIcon className={"mt-5 mx-2"} icon={faChevronLeft} /> Calculateur de volume</p>
          </div>
        </div>
      <div className={"container"}>
        
        <div className={"p-1 row menuSelectCat "} id="block-categorie">
          
            {
              this.state.recapitulatif.map((x, i) => {
                return (
                  <div key={"blockBtn^" + i} className="p-1 col-lg-2 col-4 col-sm-3 col-md-3">
                    <input className={" btn  boutonSelectCat"} type="button" key={i} id={"btnCategorie" + x.categorie} value={x.categorie} onClick={e => this.onClickCategorie(e)} />
                  </div>
                )
              })
            }
         
        </div>
        <div className={"row mt-2"} id="block-objets">
          {
            this.state.listeActuelle.lstObjets.map((x, i) => {
              return (
                <div className={" mt-3 col-4 col-sm-3 col-md-2 "}  key={i} id={"block-" + x.libelle} >
                   <div key={"div^" + i} className={"row"}>
                      <div key={"blockIcone^" + i} className={"col-12 backgroundObjet itemObjet"}>
                        <FontAwesomeIcon  key={"icone^" + i} icon={faImages} />
                      </div>
                    </div>
                    <div key={"css^" + i} className={" row py-1 justify-content-center backgroundObjet"}>

                      <div key={"blockIncr^" + i} className={"col-3"}>
                        <button className={"btn btn-primary incrementButton"} type="image" alt="m" src={faPlus} key={"plus-" + i} id={"btnPlus^" + x.libelle} value="+" onClick={e => this.onClickPlus(e)} > <FontAwesomeIcon icon={faPlus} id={"btnPlus^" + x.libelle} onClick={e => this.onClickSVGPlus(e)} /></button>
                      </div>
                      <div key={"blockQte^" + i} className={"col-2"}>
                        <p key={"quantite-" + i} id={"quantite-" + x.libelle}>{x.quantite}</p>
                      </div>
                      <div key={"blockDecr^" + i} className={"col-3"}>
                        <button className={"btn btn-primary incrementButton"} type="button" key={"moins-" + i} id={"btnMoins^" + x.libelle} value="-" onClick={e => this.onClickMoins(e)} > <FontAwesomeIcon id={"btnMoins^" + x.libelle} icon={faMinus} onClick={e => this.onClickSVGMoins(e)} /> </button> 
                      </div>

                    </div>
                    <div key={"blockNom^" + i}className={"row"}>
                        <span key={"nom-" + i} id={"nom-" + x.libelle}>{x.libelle}</span>
                    </div>
                    <div key={"blockDim^" + i}className={"row"}>
                        <span key={"dimention-" + i} id={"dimention-" + x.libelle}>{"Dim : ...x..."}</span>
                    </div>    
                    
                  </div>

              )
            })
          }
        </div>
        
        </div>
        <div className={"justify-content-center row resumeBottom"}>
        <Resume ref={this.setChild} validation={this.submit} />
      </div>
      </React.Fragment>
    )
  }
}

export default App;
