import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

//RECOMMENCER NB PAS BON

function App() {
  const [data, setData] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [nb, setNb] = useState([{value : 0}]);
  const [pieceSelectionner, setPieceSelectionner] = useState({nom : ""});
  const [recapitulatif, setRecapitulatif] = useState([]);

  useEffect(() => {
    var donnees = [
      {
        nom : "Canapé 2 places",
        longueur : 170,
        largeur : 95,
        hauteur : 85
      },
      {
        nom : "meuble TV",
        longeur : 120,
        largeur : 42,
        hauteur : 40
      }
    ];
    setData(donnees);
    setNb([
      {
        value : 0
      },
      {
        value : 0
      }
    ]);
  }, []);

  useEffect(() => {
    var lesPieces = [
      {
        nom : "Salon"
      },
      {
        nom : "Cuisine"
      }
    ];
    setPieces(lesPieces);
    setRecapitulatif([
      {
        nom : "Salon",
        lstElements : []
      },
      {
        nom : "Cuisine",
        lstElements : []
      }
    ])
  }, []);

  const changerPiece = (e) => {
    var pieceSelect = e.target.id.split('-')[0];
    var piece = pieceSelectionner;
    if(piece.nom === pieceSelect){
      piece.nom = "";
    }else{
      piece.nom = pieceSelect;
    }
    setPieceSelectionner(piece);
    console.log(pieceSelectionner);
  }

  const changerNbElement = (e) => {
    if(pieceSelectionner.nom === ""){
      document.getElementById("etat").innerHTML = "Il faut choisir une pièce !";
    }else{
      var btn = e.target.id.split('-');
      var nombre;
      switch(btn[0]){
        case "ajt":
          nombre = [...nb];
          nombre[btn[2]].value = nombre[btn[2]].value + 1;
          setNb(nombre);

          var recap = [...recapitulatif];
          var trouve = false;
          recap.forEach(element => {
            if(element.nom === pieceSelectionner.nom){
              console.log(element.lstElements.length);
              if(element.lstElements.length === 0){
                element.lstElements = [
                  {
                    nom : btn[1],
                    value : 1
                  }
                ]
              }else{
                element.lstElements.forEach(item => {
                  if(item.nom === btn[1]){
                    item.value = item.value + 1;
                    trouve = true;
                  }
                })
                if(!trouve){
                  element.lstElements.push(
                    {
                      nom : btn[1],
                      value : 1
                    }
                  )
                }
              }
            }
          })
          setRecapitulatif(recap);
          console.log(recapitulatif);
          break;
        case "suppr":
          nombre = [...nb];
          var value = nombre[btn[1]].value - 1;
          nombre[btn[2]].value = value < 0 ? 0 : value;
          setNb(nombre);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div>
      <div id="ChoixPiece">
        {
          pieces.map((x, i) => {
            return(
              <React.Fragment>
                <input key={"btn-" + i} type="button" id={x.nom + "-" + i} value={x.nom} name={x.nom} onClick={e => changerPiece(e)} />
                <label for={x.nom}></label>
              </React.Fragment>
            );            
          })
        }
      </div>
      <div id="Elements">
        {
          data.map((x, i) => {
            return(
              <div key={"zone-" + i} id={"zone-" + x.nom} >
                <div key={"bloc-" + i}>
                  <FontAwesomeIcon icon={faImages} />
                  <input key={"ajt-" + i} id={"ajt-" + x.nom + "-" + i} type="button" value="+" name="ajt" onClick={e => changerNbElement(e)} />
                  <label for="ajt"></label>
                  <p key={"nb-" + i}>{nb[i].value}</p>
                  <input key={"suppr-" + i} id={"suppr-" + i} type="button" value="-" name="suppr" onClick={e => changerNbElement(e)} />
                  <label for="suppr"></label>
                </div>
                <p key={"nom-" + i}>{x.nom}</p>
                <p key={"dim-" + i}>{x.longeur + " x " + x.largeur + " x " + x.hauteur}</p>
              </div> 
            )
          })
        }
      </div>
      <p id="etat"></p>
    </div>
  );
}

export default App;
