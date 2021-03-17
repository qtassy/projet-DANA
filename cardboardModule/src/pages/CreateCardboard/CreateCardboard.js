import React from 'react';
import './CreateCardboard.scss';
import {httpRequest} from '../../services/httpRequestService';
import AvailableContent from '../../components/AvailableContent/AvailableContent';
import { Link } from 'react-router-dom';
class CreateCardboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numeroCarton : null, //int
      pieceOrigine: null, //int
      pieceArrive : null,//int
      contenus : null,//int [1,*]
      largeur : null,//double
      hauteur : null,//double
      longueur : null,//double
      couleur : "",//string
      fragile : false,//int
      poids : null,//double
      image : "",//data uri (string)
      availableContentList : [
        // {
        //   idContenu: int, 
        //   descriptif: string
        // }
      ],
      chosenContentList : [
        // {
        //   idContenu: int, 
        //   descriptif: string
        // }
      ],
      originRoomList: [
        // id : int,
        // libelle : string
         
      ],
      destinationRoomList: [
        // id : int,
        // libelle : string
      ],

    }
    this.getAvailableCardBoardContent();
    this.getRooms();
  }

  changeStateInt=(libelle, value)=>{
    if (!(!isNaN(value) && Number.isInteger(parseFloat(value))) && value !==''){
      return;
    }    
    
    let obj = {};
    obj[libelle] = value;
    this.setState(obj);
  }

  changeStateBoolean = (libelle, value)=>{
    console.log(libelle, value)  
    let obj = {};
    obj[libelle] =value;
    this.setState(obj);
  }
  changeState = (libelle, value)=>{
    let obj = {};
    obj[libelle] = value;
    this.setState(obj);
  }

  addCardboard = ()=>{
    var url = "http://obiwan2.univ-brest.fr:7144/addCarton";

    var options = {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' }
    }
    

    httpRequest(url, options).then(response=> {
      // console.log(response);
    });
  }

  getAvailableCardBoardContent = () =>{
    let url = "http://obiwan2.univ-brest.fr:7144/contenus"

    var options = {
      method: 'GET',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    }

    httpRequest(url, options).then(response=> {
      let obj = {
        availableContentList : response
      };
      this.setState(obj);
    });
  }

  getRooms= () =>{
    let url = "http://obiwan2.univ-brest.fr:7144/lstPiece/1/2"

    var options = {
      method: 'GET',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    }

    httpRequest(url, options).then(response=> {
      console.log(response)
      let obj = {
        originRoomList : response.origine,
        destinationRoomList : response.destination,
      };
      this.setState(obj);
    });
  }

  addContent = (content) =>{
    let newArray = this.state.chosenContentList.concat(content);
    this.setState({ chosenContentList: newArray });

  }

  removeContent(index){
    this.state.chosenContentList.splice(index, 1);
    let newArray = this.state.chosenContentList;
    this.setState({ chosenContentList: newArray });
  }

  selectContent(key){
    let state = this.state;
    let selectedContent = state.availableContentList[key];

    let index = state.chosenContentList.indexOf(selectedContent);

    //if content has already been added to the content of the cardboard
    if(index === -1){
      this.addContent(selectedContent);
    }else{
      this.removeContent(index);
    }
  }

  showTitle(){
    if (this.state.chosenContentList.length === 0) {
      return ( <p className="text" >Contenu du carton</p>)
    }
  }

  render(){
    return(
      <div className="container mt-3">
        <div className="row mb-4">
          <div className="col-6">
            <div className="square">
              <div className="content">
                <div className="table">
                  <div className="table-cell">
                    <svg id="picture" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <input id="input" type="number" className="form-control" placeholder="N°" 
              value={this.state.numeroCarton} onChange={ (e) => this.changeStateInt("numeroCarton", e.target.value)}/>
            </div>
            <div className="circles mb-2">
              <p className="font-weight-bolder mb-1">Etiquette</p>
              <div className="row mx-auto">
                <div className="col-3">
                  <button className="btn etiquette1 btn-circle rounded-circle" onClick = { (e) => this.changeState("couleur", "rose")}></button>
                </div>
                <div className="col-3">
                  <button className="btn etiquette2 btn-circle rounded-circle"  onClick = {(e) => this.changeState("couleur", "mauve")}></button>
                </div>
                <div className="col-3">
                  <button className="btn etiquette3 btn-circle rounded-circle"  onClick = {(e) => this.changeState("couleur", "cyan")}></button>
                </div>
                <div className="col-3">
                  <button className="btn etiquette4 btn-circle rounded-circle"  onClick = {(e) => this.changeState("couleur", "gris")}></button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck"
                    checked = {this.state.fragile}
                    onChange = {(e) => this.changeStateBoolean("fragile", e.target.checked)}/>
                  <label className="form-check-label">Fragile</label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <select id="input" className="form-select" type="text"
            value={this.state.selectedOrigin}
            onChange={ (e) => this.changeState("pieceOrigine", e.target.value)}
          >
            <option defaultValue>Origine</option>
            { 
              this.state.originRoomList.map((room, key) =>{
              return(
                <option value={key}>{room.libelle}</option>
              )         
              })
            }
          </select>
        </div>
        
        <div className="form-group">
          <select id="input" className="form-select" type="text" 
            value = {this.state.selectedOrigin}
            onChange={ (e) => this.changeState("pieceDestination", e.target.value)}
          >
            <option defaultValue>Destination</option>
            { 
              this.state.destinationRoomList.map((room, key) =>{
              return(
                <option value={key}>{room.libelle}</option>
              )         
              })
            }
          </select>
        </div>

        <div className="form-group mt-4">
          <div className="input-group">
            <input type="number" className="form-control cardDim" placeholder="Longueur"
            value={this.state.longueur} onChange={ (e) => this.changeStateInt("longueur", e.target.value)}
            />
            <input type="number" className="form-control cardDim" placeholder="largeur"
            value={this.state.largeur} onChange={ (e) => this.changeStateInt("largeur", e.target.value)}
            />
            <input type="number" className="form-control cardDim" placeholder="hauteur"
            value={this.state.hauteur} onChange={ (e) => this.changeStateInt("hauteur", e.target.value)}
            />

          </div>
        </div>
        <div id="cardboard-content">
            {
              this.showTitle()
            }
            
          <div className="row">
            {
            this.state.chosenContentList.map((content, key) =>{
              return(
                <div className="col-3 mt-4" idContenu = {this.props.idContenu}  onClick= {() => this.selectContent(key)}> 
                  <AvailableContent id={key} content={content.idContenu} title={content.descriptif} />
                </div>
              )         
            })
            }
          </div>
        </div>

        <div className="row">

          {
            this.state.availableContentList.map((content, key) =>{
            return(
              <div className="col-3 mt-4" onClick= {() => this.selectContent(key)}> 
                <AvailableContent id={key} title={content.descriptif} />
              </div>
            )         
            })
          }
          
        </div>
        
        <div className="row text-center mt-5 mb-3">
          <div className="col-6">
            <button className="btn btn-save">Enregistrer</button>
          </div>
          <div className="col-6">
            <Link to="/MakeMyCardboards/myCardBoards">
              <button className="btn btn-cancel">Annuler</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCardboard;
