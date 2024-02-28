import React, { useEffect, useState } from 'react';
import {useMatch} from 'react-router-dom'
import "./SearchForm.css";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useValidationForm from '../../hooks/useValidationForm';
import { useLocation } from 'react-router-dom';


const SearchForm = ({onSearchMovies, shortMovieCheck, onChooseShortMovies}) => {
 /* const { values, errors, handleChange, isFormValid, resetForm } = useValidationForm();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(values.request, shortMovieCheck, isFormValid); //, shortMovieCheck, isFormValid,);
  }
  function handleSubmitSavedMovie(e) {
    e.preventDefault()
    onSearchMovies(values.request, shortMovieCheck, resetForm);
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const searchValue = localStorage.getItem('movieSearch');
      values.request = searchValue;
    }
  }, [location]);*/

  const location = useLocation();
  const [movieToSearch, setMovieToSearch] = useState("");

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setMovieToSearch("");
    } else {
      const previousMovieToSearch = JSON.parse(
        localStorage.getItem("movie-to-search")
      );
      setMovieToSearch(previousMovieToSearch);
    }
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(movieToSearch);
  };

  const handleChange = (e) => {
    setMovieToSearch(e.target.value);
  };

  const showShorts = () => {
    onChooseShortMovies(movieToSearch);
  };


  return (
    <>
    {/*<form className="search-form form" onSubmit={useMatch("/saved-movies") ? handleSubmitSavedMovie : handleSubmit} noValidate></form>*/}
        <form className="search-form form" onSubmit={handleSubmit} noValidate>
          <input 
            className="search-form__input" 
            type="text" 
            name="request" 
            required 
            placeholder="Фильм"
            value={movieToSearch || ''}
            onChange={handleChange}
          />
          <button className="search-form__submit-button" type="submit">Поиск</button>
        </form>
       <FilterCheckbox onChange={showShorts} shortMovieCheck={shortMovieCheck}/>
    </>
  );
};

export default SearchForm;