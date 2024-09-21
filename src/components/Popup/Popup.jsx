import React from 'react'
import styling from './Popup.css'

const Popup = ({closePopup, productivity, isRunning}) => {
  return (
    <div className = "popup">
      <div className = "popup-inner">
        {productivity && isRunning && <h1 className="modalText">Productivity Time!</h1>}
        {!productivity && isRunning && <h1 className="modalText">Break Time!</h1>}
        {!isRunning && <h1 className="modalText">Congratulations! Your study session is complete!</h1>}
        <button className = "close" onClick ={closePopup}>
            x
        </button>
      </div>
    </div>
  );
};

export default Popup;
