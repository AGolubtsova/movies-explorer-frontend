import React from 'react';
import SearchForm from "../SearchForm/SearchForm";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

import "./Movies.css";

const Movies = ({
  likedMovies, 
  isLoading, 
  onSearchMovies, 
  onChooseShortMovies, 
  moviesArray, 
  shortMoviesCheck, 
  onSave, 
  onDelete, 
  verifyLike}) => {

 
  return (
    <main className="movies">
      <SearchForm onSearchMovies={onSearchMovies} shortMovieCheck={shortMoviesCheck} onChooseShortMovies={onChooseShortMovies}/>
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList moviesArray={moviesArray} saveMoviesArray={likedMovies} onSaveMovie={onSave} onDelete={onDelete} verifyLike={verifyLike}/>}
    </main>
  );
};

export default Movies;

       