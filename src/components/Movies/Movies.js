import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';


import "./Movies.css";


const Movies = ({isLoading }) => {
  return (
    <main className="movies">
      <SearchForm />
      <FilterCheckbox />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList isSaved={false} />}
    </main>
  );
};

export default Movies;