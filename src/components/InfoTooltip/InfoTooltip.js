import React from 'react';
import './InfoTooltip.css';

export default function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <div className = {`popup ${isOpen && "popup_opened"}`}>
      <div className = "popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >
        </button>
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  )
}