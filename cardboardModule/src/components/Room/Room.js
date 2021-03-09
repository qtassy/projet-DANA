import React from 'react';
import PropTypes from 'prop-types';
import styles from './Room.module.scss';

const Room = () => (
  <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
);

Room.propTypes = {};

Room.defaultProps = {};

export default Room;
