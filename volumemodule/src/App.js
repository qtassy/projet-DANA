import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const [data, setData] = useState([]);
  const [pieces, setPieces] = useState([]);

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
  }, []);

  return (
    <div>
      <div id="ChoixPiece">
        {
          pieces.map((x, i) => {
            return(
              <React.Fragment>
                <input key={"btn-" + i} type="button" value={x.nom} name={x.nom} />
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
                <i className="fas fa-couch"></i>
                <div key={"bloc-" + i}>
                  <input key={"ajt-" + i} type="button" value="+" name="ajt" />
                  <label for="ajt"></label>
                  <input key={"suppr-" + i} type="button" value="-" name="suppr" />
                  <label for="suppr"></label>
                </div>
                <p key={"nom-" + i}>{x.nom}</p>
                <p key={"dim-" + i}>{x.longeur + " x " + x.largeur + " x " + x.hauteur}</p>
              </div> 
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
