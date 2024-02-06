import { useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesBtn from '../MoreMoviesBtn/MoreMoviesBtn';
import "./MoviesCardList.css";
import MovieImage from '../../images/movieImage.jpg';
import { movieDuration, movieTitle, moviesQty, moreMovies} from '../../utils/constants';

function MoviesCardList ({isSaved}) {
  const [index, setIndex] = useState(moviesQty);
  const location = useLocation();

  function showMoreMovies() {
    if (index < moviesQty) {
      setIndex(index + moreMovies);
    }
  }

  const moviesArray = Array.from({ length: 8 }, () => ({
        nameRU: movieTitle,
        duration: movieDuration,
        image: MovieImage,
  }));

  const savedMovies = location.pathname === "/saved-movies" ? moviesArray.slice(0, 3) : moviesArray;

  return (
    <div className="cards">
      <ul className="cards__list">
        {savedMovies.slice(0, index).map((movie, i) => (
          <li className="cards__item-list" key={i}>
            <MoviesCard nameRU ={movie.nameRU} duration={movie.duration} image={movie.image}/>
          </li>
        ))}
      </ul>
      {index < savedMovies.length && <MoreMoviesBtn showMore={showMoreMovies} />}
    </div>
  );
};

export default MoviesCardList;

