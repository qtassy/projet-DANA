import React from 'react';
import PropTypes from 'prop-types';
import './Option.scss';

const Option = (libelle) => (
  <div className="option" >
    <div className = "emptyRoof">
    </div>

    <div className = "optionContent">

      <div className="emptyStart">
      </div>

      <div className="leftLogo">
        <div className = "a">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
        
      </div>
      
      <div className="spaceBetween">
      </div>
      
      <div className="textContainer">
        <span>
          {libelle}
        </span>
      </div>
      
      <div className="emptySpace">
      </div>
      
      <div className="rightLogo">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
      </svg>
      </div>
      
      <div className="emptyEnd">
      </div>
    </div>

    <div className = "emptyFloor">
    </div>
  </div>
);

Option.propTypes = {};

Option.defaultProps = {};

export default Option;
