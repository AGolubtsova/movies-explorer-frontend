import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { chooseShortMovies, filterMovies } from '../../utils/functions';

function SavedMovies({likedMovies, isLoading, onDelete, verifyLike, setPopupMessage, setIsPopupOpen}) {

  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(likedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (inputValue) => {
    if (!inputValue || inputValue.trim().length === 0) {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }

  const moviesList = filterMovies(likedMovies, inputValue, shortMovies);
    setSearchQuery(inputValue);
    if (moviesList.length === 0) {
      setPopupMessage('Ничего не найдено.');
      setIsPopupOpen(true);
    } else {
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  const handleShortFilms = () => {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(chooseShortMovies(filteredMovies));
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(chooseShortMovies(likedMovies));
    } else {
      setShortMovies(false);
      const moviesList = filterMovies(likedMovies, searchQuery, shortMovies);
      setShowedMovies(moviesList);
    }
  }, [likedMovies, location, shortMovies]);

  useEffect(() => {
    setFilteredMovies(likedMovies);
  }, [likedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm 
        shortMovieCheck={shortMovies}
        onChooseShortMovies={handleShortFilms}
        onSearchMovies={handleSearchSubmit}
      />
      {isLoading && (
          <Preloader />
        )}
      {!isLoading && (<MoviesCardList
        saveMoviesArray={showedMovies}
        onDelete={onDelete}
        verifyLike={verifyLike}/>)}
      <div className="saved-movies__devider"></div>
    </main>
  );
}

export default SavedMovies;