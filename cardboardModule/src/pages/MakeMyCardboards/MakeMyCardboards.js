import React from 'react';
import PropTypes from 'prop-types';
import styles from './MakeMyCardboards.module.scss';
import Option from '../../components/Option/Option'

const MakeMyCardboards = () => (
  <div className={styles.MakeMyCardboards}>
    <nav id = "pinkNavbar" class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <div class="navbar-brand navbar-header">
          <a href="/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
              <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
            </svg>
          </a>
          <span>
            Faire ses cartons
          </span>
        </div>
      </div>
    </nav>
    {/* <div class="d-flex justify-content-center"> */}
      <Option></Option>
    {/* </div> */}
    


  </div>
);

MakeMyCardboards.propTypes = {};

MakeMyCardboards.defaultProps = {};

export default MakeMyCardboards;
