import React from 'react';
import { Link } from 'react-router-dom';
import './MyCardboards.scss';
import Piece from '../../components/Piece/Piece';
const MyCardboards = () => (
  <div className="MyCardboards">
    <div class="shadow-sm p-3 mb-5 bg-white rounded">
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
   
    <div class="container">
      <div class="row">
        <div class="col">
          1 of 2
        </div>
        <div class="col">
          2 of 2
        </div>
      </div>
      <div class="row">
        <div class="col">
          1 of 3
        </div>
        <div class="col">
          2 of 3
        </div>
        <div class="col">
          3 of 3
        </div>
      </div>
    </div>
    {/* <div class="container">
      <Piece></Piece>
    </div> */}
    
  </div>
);

export default MyCardboards;
