import React, { useEffect } from 'react';
import {useMatch} from 'react-router-dom'
import "./SearchForm.css";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useValidationForm from '../../hooks/useValidationForm';
import { useLocation } from 'react-router-dom';


const SearchForm = ({onSearchMovies, shortMovieCheck, onChooseShortMovies}) => {
 const { values, handleChange } = useValidationForm();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(values.request);
  }
  function handleSubmitSavedMovie(e) {
    e.preventDefault()
    onSearchMovies(values.request);
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const searchValue = localStorage.getItem('movieSearch');
      values.request = searchValue;
    }
  }, [location]);

  return (
    <>
      <form className="search-form form" onSubmit={useMatch("/saved-movies") ? handleSubmitSavedMovie : handleSubmit} noValidate>
          <input 
            className="search-form__input" 
            type="text" 
            name="request" 
            required 
            placeholder="Фильм"
            value={values.request || ''}
            onChange={handleChange}
          />
          <button className="search-form__submit-button" type="submit">Поиск</button>
      </form>
      <FilterCheckbox onChange={onChooseShortMovies} shortMovieCheck={shortMovieCheck}/>
    </>
  );
};

export default SearchForm;