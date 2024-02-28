import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesBtn from '../MoreMoviesBtn/MoreMoviesBtn';
import "./MoviesCardList.css";
import MovieImage from '../../images/movieImage.jpg';
import { movieDuration, movieTitle, moviesQty, moreMovies} from '../../utils/constants';
/*import MovieApi from '../../utils/MovieApi';*/
import api from '../../utils/MovieApi';

import {
  DEFAULT_SHOWN_MOVIES_LARGE,
  DEFAULT_SHOWN_MOVIES_MEDIUM,
  DEFAULT_SHOWN_MOVIES_SMALL,
  DEFAULT_MOVIES_TO_ADD_LARGE,
  DEFAULT_MOVIES_TO_ADD_MEDIUM,
  DEFAULT_MOVIES_TO_ADD_SMALL,
  DEFAULT_WIDTH_LARGE,
  DEFAULT_WIDTH_SMALL,
} from "../../utils/constants";

function MoviesCardList ({moviesArray, saveMoviesArray, isSaved, onSaveMovie, deleteMovie }) {
  //const [showMovieList, setShowMovieList] = useState(movies);
  //const [index, setIndex] = useState(moviesQty);

  const location = useLocation();

  const [shownMovies, setShownMovies] = useState(0);
  const [moviesToAdd, setMoviesToAdd] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeWindow = () => {
      setWidth(window.innerWidth);
    };

    if (location.pathname === "/movies") {
      if (width >= DEFAULT_WIDTH_LARGE) {
        setShownMovies(DEFAULT_SHOWN_MOVIES_LARGE);
        setMoviesToAdd(DEFAULT_MOVIES_TO_ADD_LARGE);
      } else if (width >= DEFAULT_WIDTH_SMALL) {
        setShownMovies(DEFAULT_SHOWN_MOVIES_MEDIUM);
        setMoviesToAdd(DEFAULT_MOVIES_TO_ADD_MEDIUM);
      } else {
        setShownMovies(DEFAULT_SHOWN_MOVIES_SMALL);
        setMoviesToAdd(DEFAULT_MOVIES_TO_ADD_SMALL);
      }
    }

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [window.innerWidth, location, moviesArray]);

  function showMoreMovies() {
    setShownMovies((shownMovies) => shownMovies + moviesToAdd);
  }

  /*function showMoreMovies() {
    if (index < moviesQty) {
      setIndex(index + moreMovies);
    }
  }*/


  return (
    <>
      {location.pathname === "/movies" && (
        <div className="cards">
          <ul className="cards__list">
           {moviesArray.sort().map((movie) => (
             <li className="cards__item-list" key={movie.id}>
               <MoviesCard
                 movie={movie} 
                 onChangeMovieSave={onSaveMovie}
                 isSaved={isSaved}
              />
              </li>
            ))}
          </ul>
          {shownMovies < moviesArray.length && <MoreMoviesBtn showMore={showMoreMovies} />}
        </div>
      )}

      {location.pathname === "/saved-movies" &&
        (<ul className="movies-card-list">
            {saveMoviesArray.map((saveMovie) => {
              return (
                <li className="movies-card-list__item" key={saveMovie._id}>
                  <MoviesCard
                    movie={saveMovie}
                    onChangeMovieSave={deleteMovie}
                  />
                </li>
              );
            })}
          </ul>
        )
      }

    </>
  );
};

export default MoviesCardList;

