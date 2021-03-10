import React, { useState, useEffect } from 'react';
const fetch = require('node-fetch');

function App() {
  const [recapitulatif, setRecapitulatif] = useState([]);
  //const [listeActuelle, setListeActuelle] = useState([]);

  useEffect(() => {
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
              getObjets(element).then(result => {
                element = result;
                console.log(element);
                if(index === array.length - 1) resolve();
              })
            })
          })
        }
        func().then(_ => {
          setRecapitulatif(nouvelleListe);
          console.log("FIN");
          console.log(recapitulatif);
        })
      });
    });
  }, []);

  const getObjets = async (element) => {
    return new Promise((resolve) => {
      var url = "http://obiwan2.univ-brest.fr:7199/getObjets/" + element.categorie;
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
              libelle: objet.libelle
            })
          })
          resolve(element);
        });
      });
    })
  }

  return (
    <div>
      {
        recapitulatif.map((x, i) => {
          return (
            <p key={i} >{x.categorie}</p>
          )
        })
      }
    </div>
  )
}

export default App;
