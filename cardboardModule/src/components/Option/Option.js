import React from 'react';
import PropTypes from 'prop-types';
import styles from './Option.module.scss';

const Option = () => (
  <div className={styles.Option}>
    <div class="container">
      <div class="item"><span>Logo</span></div>
      <div class="item"><span>libelle </span></div>
      <div class="item"><span>lofo fin </span></div>
    </div>
  </div>
);

Option.propTypes = {};

Option.defaultProps = {};

export default Option;
