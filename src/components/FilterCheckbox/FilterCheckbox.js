import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({onChange, shortMovieCheck}) {
  return (
    <section className="filter">
        <label className="filter__switch" htmlFor="filter__input">
          <input 
            type="checkbox" 
            className="filter__input" 
            name="checkbox" 
            id="search-form-checkbox"  
            onChange={onChange} 
            checked={shortMovieCheck && "checked"}/>
          <span  className="filter__label">Короткометражки</span>
         </label>
    </section>
  );
}

export default FilterCheckbox;