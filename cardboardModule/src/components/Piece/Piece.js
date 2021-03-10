import React from 'react';
import './Piece.scss';

const Piece = (props) => (
  <div className="col-4 col-md-3 ">

    <div className="btn btn-squared-default btn-outline-dark w-100 h-100">
     <span className = "number">
       {props.number}
     </span>
    </div>
    <p className = "roomName">
    {props.roomName}
    </p>
  </div>

);

export default Piece;
