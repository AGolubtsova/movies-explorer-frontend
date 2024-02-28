import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

import "./Movies.css";
import api from '../../utils/MovieApi';
import { useLocation } from 'react-router-dom';


const Movies = ({isLoading, isSaved, moviesArray, onSaveMovie, /*setPopupMessage, setIsPopupOpen, onLoading,*/ onSearchMovies, onChooseShortMovies, shortMovieCheck   }) => {

  /*const [shortMoviesCheck, setShortMoviesCheck] = useState(true);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();

  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration <= 40);
    
  }

  function filterMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });
  
    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }


  
  const handleSetFilteredMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userQuery, false);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage('Ничего не найдено.');
      setIsPopupOpen(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim().length === 0) {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }

    localStorage.setItem('movieToSearch', inputValue);
    localStorage.setItem('shortMoviesCheck', shortMoviesCheck);

    if (isAllMovies.length === 0) {
     onLoading(true);
      api.getMovies()
        .then(movies => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            movies,
            inputValue,
            shortMoviesCheck
          );
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => onLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMoviesCheck);
    }
  }

  const handleShortFilms = () => {
    setShortMoviesCheck(!shortMoviesCheck);
    if (!shortMoviesCheck) {
      setFilteredMovies(filterShortMovies(initialMovies));
      if (filterMovies.length === 0) {
        setNotFound(true);
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMoviesCheck);
  }
  
  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMoviesCheck(true);
    } else {
      setShortMoviesCheck(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem('shortMovies') === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [location]);

  return (
    <main className="movies">
      <SearchForm onSearchMovies={handleSearchSubmit} shortMovieCheck={shortMoviesCheck} showShorts={handleShortFilms}/>
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList isSaved={false} moviesArray={filteredMovies} />}
    </main>
  );
};*/

return (
  <main className="movies">
    <SearchForm onSearchMovies={onSearchMovies} shortMovieCheck={shortMovieCheck} onChooseShortMovies={onChooseShortMovies}/>
    {isLoading && <Preloader />}
    {!isLoading && <MoviesCardList isSaved={isSaved} moviesArray={moviesArray} onSaveMovie={onSaveMovie} />}
  </main>
);
};

export default Movies;

       