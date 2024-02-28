import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";


function MoviesCard({ movie, onChangeMovieSave, isSaved }) {
  const location = useLocation();
 // const [isSaved, setIsSaved] = useState(true);

  /*function toggleSave() {
    setIsSaved(!isSaved);
  }*/

  function toggleSave() {
    onChangeMovieSave(location.pathname === "/saved-movies" ? movie._id : movie);
  }



  return (
    <div className="card">
      <div className="card__container">
        <h3 className="card__descrition">{movie.nameRU}</h3>
        <span className="card__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</span>
      </div>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img className="card__image" src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU}/>
      </a>
      {location.pathname === "/movies" ? (
        isSaved ?(
          <button type="button" className="card__button-saved" onClick={toggleSave}></button>
        ) : (
          <button className="card__button" onClick={toggleSave}>Сохранить</button>
        )
      ) : (<button type="button" className="card__delete-button"></button>)}
    </div>
  );
};

export default MoviesCard;