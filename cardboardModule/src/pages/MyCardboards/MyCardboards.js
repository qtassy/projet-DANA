import React from 'react';
import { Link } from 'react-router-dom';
import './MyCardboards.scss';
import Piece from '../../components/Piece/Piece';
import {httpRequest} from '../../services/httpRequestService';
class MyCardboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList : [
        // {
        //   number : 5,
        //   name : "salon"
        // }, 
        // {
        //   number : 1,
        //   name : "cuisine"
        // }
      ]
    };

    let data =
    [
      {
      number : 5,
      name : "salon"
      }, 
      {
        number : 1,
        name : "cuisine"
      }
    ];
    this.state.roomList = data;
    console.log("state: ", this.state);
  }

   

  render() {
    return (
      <div className="MyCardboards">
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <nav id = "pinkNavbar" className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="navbar-brand navbar-header">
            <Link to="/MakeMyCardboards">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
              </svg>
            </Link>
            <span>
              Mes cartons virtuels
            </span>
          </div>
        </div>
      </nav>
    </div>
    {/* <div className="d-flex justify-content-center justify-content-between">
      <div className="container">
        <div className="row align-items-center">
          <Piece number = "1" roomName = "Cuisine"></Piece>
          <Piece number = "3" roomName = "Salon"></Piece>
          <Piece number = "2" roomName = "Chambre étage "></Piece>
          <Piece number = "10" roomName = "grenier"></Piece>
          <Piece number = "7" roomName = "Chambre rez-de-chaussé"></Piece>
          <Piece number = "1" roomName = "salle de bain"></Piece>
        </div>
      </div>
    </div> */}

      <div className="container">
        <div className="row">
        <div className="col-4 col-md-3">
          <div id="add-button">
              <a href="#">
                <div className="div-icon">
                  <svg id="cardboard-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        {/* {this.state.roomList.map((room, index) => 
          <Piece  key={index} number = {room.number} roomName = {room.name}/>
        )} */}
        <Piece number="1" roomName="CUISINE"/>
        <Piece number="2" roomName="SALLE DE BAIN"/>
        <Piece number="3" roomName="CHAMBRE 1"/>
        <Piece number="4" roomName="CAVE"/>
        </div>
      </div>
    </div>
    );
  }
}

const getRooms = ()=>{

  // var url = "";

  // let data = {
  //   token : "qskldjqsldkjqs"
  // }

  //   var options = {
  //       method: 'GET',
  //       body: JSON.stringify(data),
  //       headers: { 'Content-Type': 'application/json' }
  //   }

  // httpRequest(url, options).then((response) => {
  //   this.setState({roomList : response});
  // });

  let data =
  [
    {
    number : 5,
    name : "salon"
    }, 
    {
      number : 1,
      name : "cuisine"
    }
  ];
  this.state({roomList : data});
  console.log("state: ", this.state);
  
}
export default MyCardboards;
