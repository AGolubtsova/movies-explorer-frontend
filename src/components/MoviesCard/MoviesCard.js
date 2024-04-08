import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";


function MoviesCard({ movie, onSave, onDelete, verifyLike}) {
  const location = useLocation();

  const handleSaveCard = () => {
    onSave(movie);
  };

  const handleDeleteCard = () => {
    onDelete(location.pathname === '/movies' ? movie.id : movie.movieId);
  };

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
        verifyLike(location.pathname === '/movies' ? movie.id : movie.movieId) ? (
          <button type="button" className="card__button-saved" onClick={handleDeleteCard}></button>
        ) : (
          <button className="card__button" onClick={handleSaveCard}>Сохранить</button>
        )
      ) : (<button type="button" className="card__delete-button" onClick={handleDeleteCard}></button>)}
    </div>
  );
};

export default MoviesCard;