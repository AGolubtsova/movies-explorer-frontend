import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMovies from '../MoreMoviesBtn/MoreMoviesBtn';
import "./MoviesCardList.css";
import MovieImage from '../../images/movieImage.jpg';
import { movieDuration, movieTitle, moviesQty, moreMovies} from '../../utils/constants';

function MoviesCardList ({isSaved}) {
  const [index, setIndex] = useState(moviesQty);

  function showMoreMovies() {
    if (index < moviesQty) {
      setIndex(index + moreMovies);
    }
  }

  const movies = Array.from({ length: 5 }, () => ({
        nameRU: movieTitle,
        duration: movieDuration,
        image: MovieImage,
  }));

  return (
    <div className="cards">
      <ul className="cards__list">
        {movies.slice(0, index).map((movie, i) => (
          <li className="card__list-item" key={i}>
            <MoviesCard nameRU ={movie.nameRU} duration={movie.duration} image={movie.image}/>
          </li>
        ))}
      </ul>
      {index < movies.length && <MoreMovies showMore={showMoreMovies} />}
    </div>
  );
};

export default MoviesCardList;

