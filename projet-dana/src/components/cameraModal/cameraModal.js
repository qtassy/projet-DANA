import React from 'react';
import './CameraModal.scss';


const CameraModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={()=> handleClose}>
          Close
        </button>
      </section>
     
    </div>
  );
};

export default CameraModal;
