import React from 'react';
import './MyCardboards.scss';
import Piece from '../../components/Piece/Piece';
import NavMyCardboards from "../../components/Menu/NavMyCardboard";
import {httpRequest} from '../../services/httpRequestService';

class MyCardboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList : []
    };

  this.getRooms();
  }
  getRooms = () =>{
    // let data =
    // [
    //   {
    //   number : 5,
    //   name : "salon"
    //   }, 
    //   {
    //     number : 1,
    //     name : "cuisine"
    //   }
    // ];
    // this.state.roomList = data;
    // console.log("state: ", this.state);

    var url = "http://obiwan2.univ-brest.fr:7144/nbCartons/4";

    var options = {
      method: 'GET',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    }

    console.log("requete")
    httpRequest(url, options).then(rooms=> {
      console.log("response : " + rooms.pieces);
      this.setState({roomList : rooms.pieces});
      console.log(this.state);
    });
  }

  getState(){
    console.log(this.state);
    return this.state;
  }

  render() {
    return (
      <div className="MyCardboards">
        <NavMyCardboards link="/MakeMyCardboards" />
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-3">
              <div id="add-button">
                <a href="/MakeMyCardboards/myCardBoards/createCardboard">
                  <div className="div-icon">
                    <svg id="cardboard-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            {console.log(this.getState)}
            {
              this.getState().roomList.map((room, index) => 
              <Piece  
              key={index} 
              number = {room.nb} 
              roomName = {room.libelle}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default MyCardboards;
