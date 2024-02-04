import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <section className="filter">
        <label className="filter__switch" htmlFor="filter__input">
          <input type="checkbox" className="filter__input" />
          <span  className="filter__label">Короткометражки</span>
         </label>
    </section>
  );
}

export default FilterCheckbox;