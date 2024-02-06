import './MoreMoviesBtn.css';
import React from 'react';

function MoreMoviesBtn({ showMoreMovies }) {
    return (
        <div className="more-movies">
          <button onClick={showMoreMovies} className="more-movies__button" type="button">
            Ещё
          </button>
        </div>
      );
    };
    

export default MoreMoviesBtn;