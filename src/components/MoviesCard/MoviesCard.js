import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";


function MoviesCard({ nameRU, duration, image }) {
  const { location } = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  function toggleSave() {
    setIsSaved(!isSaved);
  }


  return (
    <div className="card">
      <div className="card__container">
        <h3 className="card__descrition">{nameRU}</h3>
        <span className="card__duration">{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</span>
      </div>
      <img className="card__image" src={image} alt={nameRU}/>
      {isSaved && (location.pathname === "/movies") ? (<button type="button" className="card__button_saved" onClick={toggleSave}/>) :  (<button className="card__button" onClick={toggleSave}>Сохранить</button>)}
      {isSaved && (location.pathname === "/saved-movies") && <button type="button" className="card__button_delete" /> }
    </div>
  );
};

export default MoviesCard;