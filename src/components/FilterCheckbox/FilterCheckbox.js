import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({onChange, shortMovieCheck}) {
  return (
    <section className="filter">
        <label className="filter__switch">
          <input 
            type="checkbox" 
            className="filter__input" 
            onChange={onChange} 
            checked={shortMovieCheck}/>
          <span className="button filter__slider filter__slider_type_round"></span>
         </label>
         <p  className="filter__label">Короткометражки</p>
    </section>
  );
}

export default FilterCheckbox;