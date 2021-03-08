import React from 'react';
import PropTypes from 'prop-types';
import styles from './VirtualCarboard.module.scss';
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from "react-router-dom"
import CardboardFormular from './components/VirtualCarboard/CardboardFormular';
import CardboardList from './components/VirtualCarboard/CardboardList';
const VirtualCarboard = () => (
  <div>
    <div class="btn-group d-flex align-items-center justify-content-center primaryColor" role="group" aria-label="Basic outlined example">
      <button type="button" onClick={() => {
        window.location.href = "http://localhost:3000/virtualCardboard/cardboardFormular"
        }}
         class="btn btn-outline-primary primaryColor" >Mes cartons</button>
      <button type="button" class="btn btn-outline-primary primaryColor">Ajouter un carton</button>
    </div>

  
    <BrowserRouter>
      <Route path="/virtualCardboard/cardboardFormular" component={CardboardFormular}/>
      <Route path="/cardboardList" component={CardboardList}/>
    </BrowserRouter>
  </div>
  
   
  

VirtualCarboard.propTypes = {};

VirtualCarboard.defaultProps = {};

export default VirtualCarboard;
