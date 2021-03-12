import React from 'react';
import './AvailableContent.scss';

const AvailableContent = (props) => (
    <button className="btn btn-content">{props.title}</button>
);

export default AvailableContent;
