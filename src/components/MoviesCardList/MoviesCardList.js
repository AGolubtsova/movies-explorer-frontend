import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesBtn from '../MoreMoviesBtn/MoreMoviesBtn';
import "./MoviesCardList.css";

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

function MoviesCardList ({moviesArray, saveMoviesArray, onSaveMovie, onDelete, verifyLike }) {

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

  return (
    <>
      {location.pathname === "/movies" && (
        <div className="cards">
          <ul className="cards__list">
           {moviesArray.slice(0, shownMovies).map((movie) => (
             <li className="cards__item-list">
               <MoviesCard
                 key={movie.id}
                 movie={movie} 
                 onSave={onSaveMovie}
                 onDelete={onDelete}
                 verifyLike={verifyLike}
              />
              </li>
            ))}
          </ul>
          {shownMovies < moviesArray.length && <MoreMoviesBtn showMoreMovies={showMoreMovies} />}
        </div>
      )}

      {location.pathname === "/saved-movies" &&(
        <div className="cards">
          <ul className="cards__list">
            {saveMoviesArray.map((movie) => {
              return (
                <li className="cards__item-list">
                  <MoviesCard
                    key={movie.movieId}
                    movie={movie}
                    onDelete={onDelete}
                    verifyLike={verifyLike}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        )
      }

    </>
  );
};

export default MoviesCardList;

