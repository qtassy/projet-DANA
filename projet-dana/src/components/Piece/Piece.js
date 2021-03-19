import React from 'react';
import { Link } from 'react-router-dom';
import './Piece.scss';


class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  clickEvent = (idPiece, nomPiece)=>{
    localStorage.setItem("idPiece", idPiece);
    localStorage.setItem("nomPiece", nomPiece);

    window.location.href = "/MakeMyCardboards/myCardBoards/room"
  }

  render(){
    return(
      <div className="col-4 col-md-3">
      <div className="box-piece2 "  onClick = {(e)=>this.clickEvent(this.props.idPiece, this.props.roomName)}>
        {/* /room -> URL personnalisée ? */}
        {/* <Link to="/MakeMyCardboards/myCardBoards/room"> */}
       
          <div className="div-icon">
            <svg id="cardboard-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg>
            <p className = "number mb-0">
              {this.props.number}
            </p>
          </div>
        {/* </Link> */}
      </div>
      <p className = "roomName font-weight-bolder">
        {this.  props.roomName}
      </p>
    </div>
  
    )
  }
 
};

export default Piece;
