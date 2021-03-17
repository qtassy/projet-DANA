import React from 'react';
import './cameraModal.scss';


const cameraModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
     
    </div>
  );
};

export default cameraModal;
