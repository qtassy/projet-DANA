import React from 'react';
import PropTypes from 'prop-types';
import './CreateCardboard.scss';

class CreateCardboard extends React.Component{
  render(){
    return(
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <div className="square">
              <div className="content">
                <div class="table">
                  <div class="table-cell">
                    <svg id="picture" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="picture">
              <svg className="icon-cam" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
              </svg>
            </div> */}
          </div>

          <div className="col-6">
            <div class="form-group">
              <input id="input" type="number" class="form-control" placeholder="N°"/>
            </div>
            <div className="circles mb-2">
              <p className="font-weight-bolder mb-1">Etiquette</p>
              <div className="row mx-auto">
                <div className="col-3">
                  <button class="btn etiquette1 btn-circle rounded-circle"></button>
                </div>
                <div className="col-3">
                  <button class="btn etiquette2 btn-circle rounded-circle"></button>
                </div>
                <div className="col-3">
                  <button class="btn etiquette3 btn-circle rounded-circle"></button>
                </div>
                <div className="col-3">
                  <button class="btn etiquette4 btn-circle rounded-circle"></button>
                </div>
              </div>
            </div>
            <div class="form-group mb-0">
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck"/>
                  <label class="form-check-label" for="gridCheck">Fragile</label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mt-4">
          <input id="input" type="text" class="form-control" placeholder="Destination"/>
        </div>
        <div className="form-group mt-4">
          <input id="input" type="text" class="form-control" placeholder="Origine"/>
        </div>
        <div className="form-group mt-4">
          <input id="input" type="text" class="form-control" placeholder="Taille du carton"/>
        </div>
        <div className="form-group">
          <textarea disabled class="form-control" id="text-area" placeholder="Contenu du carton" rows="3"></textarea>
        </div>
        <div className="row">
          <div className="col-3">
            <button className="btn btn-content">Livres</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Outils</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Vetements</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Décorations</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Cosmétique</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Serviettes</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Draps</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Ustensiles</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Vaisselle</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Torchons</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Bric à brac</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">DVD</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Electroménager</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Jeux</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">Scolaires</button>
          </div>
          <div className="col-3">
            <button className="btn btn-content">CD</button>
          </div>
        </div>
        <div className="row text-center mt-5 mb-3">
          <div className="col-6">
            <button className="btn btn-save">Enregistrer</button>
          </div>
          <div className="col-6">
            <button className="btn btn-cancel">Annuler</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCardboard;
