import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoomList.module.scss';

const RoomList = () => (
  <div className={styles.RoomList} data-testid="RoomList">
    RoomList Component
  </div>
);

RoomList.propTypes = {};

RoomList.defaultProps = {};

export default RoomList;
