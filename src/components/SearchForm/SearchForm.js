import React from 'react';
import "./SearchForm.css";

const SearchForm = (props) => {
  return (
        <form className="search-form">
          <input className="search-form__input" type="text" name="request" title=" " required placeholder="Фильм" value=''/>
          <button className="search-form__submit-button" type="submit">Поиск</button>
        </form>
  );
};

export default SearchForm;