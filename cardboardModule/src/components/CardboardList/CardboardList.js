import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardboardList.module.scss';

const CardboardList = () => (
  <div className={styles.CardboardList} data-testid="CardboardList">
    CardboardList Component
  </div>
);

CardboardList.propTypes = {};

CardboardList.defaultProps = {};

export default CardboardList;
