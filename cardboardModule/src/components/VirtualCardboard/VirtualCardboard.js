import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Route} from "react-router-dom"
import CardboardFormular from '../CardboardFormular/CardboardFormular';
import CardboardList from '../CardboardList/CardboardList';
const VirtualCarboard = () => (
  <div>
    <div class="btn-group d-flex align-items-center justify-content-center primaryColor" role="group" aria-label="Basic outlined example">
      <button type="button" onClick={() => {
        window.location.href = "http://localhost:3000/virtualCardboard/cardboardFormular"
        }}
         class="btn btn-outline-primary primaryColor" 
      >
        Mes cartons
      </button>

      <button type="button" onClick={() => {
        window.location.href = "http://localhost:3000/virtualCardboard/cardboardList"
        }}
         class="btn btn-outline-primary primaryColor" 
      >
        Mes cartons
      </button>
    </div>

  
    <BrowserRouter>
      <Route path="/virtualCardboard/cardboardFormular" component={CardboardFormular}/>
      <Route path="/virtualCardboard/cardboardList" component={CardboardList}/>
    </BrowserRouter>
  </div>
  
   
);

// VirtualCarboard.propTypes = {};

// VirtualCarboard.defaultProps = {};

export default VirtualCarboard;
