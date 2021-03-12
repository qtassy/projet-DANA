import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import Resume from './Resume';
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
        })
      })
    })
  }


  onClickCategorie = (e) => {
    this.state.recapitulatif.forEach(element => {
      if (element.categorie === this.state.categorie) {
        element = this.state.listeActuelle;
      }
    })

    this.setState({ categorie: e.target.value });


    this.state.recapitulatif.forEach(element => {
      if (element.categorie === this.state.categorie) {
        this.setState({ listeActuelle: element });
      }
    })
  }

  onClickMoins = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.id;
    ([...liste.lstObjets]).forEach(element => {
      if (element.libelle === nom.split('-')[1]) {
        element.quantite = element.quantite - 1 < 0 ? 0 : element.quantite -=1;
        this.child.decrementer();
      }
    })
    this.setState({ listeActuelle: liste });
  }

  onClickPlus = (e) => {
    var liste = this.state.listeActuelle;
    var nom = e.target.id;
    ([...liste.lstObjets]).forEach(element => {
      if (element.libelle === nom.split('-')[1]) {
        element.quantite += 1;
        this.child.incrementer();
      }
    })
    this.setState({ listeActuelle: liste });
  }

  setChild = element => {
    this.child = element;
  }

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
    nouveauRecap.idUtilisateur = 1;
    nouveauRecap.nbElements = data.nbElements;
    nouveauRecap.surface = data.surface;
    this.state.recapitulatif.forEach(element => {
      ([...element.lstObjets]).forEach(objet => {
        if(objet.quantite > 0){
          nouvelleListeObjets.push(objet);
        }
      })
      if(nouvelleListeObjets.length > 0){
        console.log(nouvelleListeObjets);
        element.lstObjets = nouvelleListeObjets;
        nouveauRecap.lstCategorie.push(element);
        nouvelleListeObjets = [];
      }
    })

    console.log(nouveauRecap);
  }

  render() {
    return (
      <React.Fragment>
        <div id="block-categorie">
          {
            this.state.recapitulatif.map((x, i) => {
              return (
                <input type="button" key={i} id={"btnCategorie" + x.categorie} value={x.categorie} onClick={e => this.onClickCategorie(e)} />
              )
            })
          }
        </div>
        <div id="block-objets">
          {
            this.state.listeActuelle.lstObjets.map((x, i) => {
              return (
                <div key={i} id={"block-" + x.libelle} >
                  <FontAwesomeIcon icon={faImages} />
                  <input type="button" key={"plus-" + i} id={"btnPlus-" + x.libelle} value="+" onClick={e => this.onClickPlus(e)} />
                  <p key={"quantite-" + i} id={"quantite-" + x.libelle}>{x.quantite}</p>
                  <input type="button" key={"moins-" + i} id={"btnMoins-" + x.libelle} value="-" onClick={e => this.onClickMoins(e)} />
                  <p key={"nom-" + i} id={"nom-" + x.libelle}>{x.libelle}</p>
                  <p key={"dimention-" + i} id={"dimention-" + x.libelle}>{"Dim : ...x..."}</p>
                </div>
              )
            })
          }
        </div>
        <Resume ref={this.setChild} validation={this.submit} />
      </React.Fragment>
    )
  }
}

export default App;
