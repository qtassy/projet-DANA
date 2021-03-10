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
  }

  componentDidMount() {
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
    this.setstate({roomList : data});
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

    <div className="d-flex justify-content-center justify-content-between">
      <div className="container">
        <div className="row align-items-center">
        {this.state.roomList.map((room, index) => 
          <Piece  key={index} number = {room.number} roomName = {room.name}/>
        )}
        </div>
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
