import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesBtn from '../MoreMoviesBtn/MoreMoviesBtn';
import "./MoviesCardList.css";

import {
  WIDTH_LARGE,
  WIDTH_SMALL,
  SHOWN_MOVIES_LARGE,
  SHOWN_MOVIES_MEDIUM,
  SHOWN_MOVIES_SMALL,
  TO_ADD_LARGE,
  TO_ADD_MEDIUM,
  TO_ADD_SMALL,
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
      if (width >= WIDTH_LARGE) {
        setShownMovies(SHOWN_MOVIES_LARGE);
        setMoviesToAdd(TO_ADD_LARGE);
      } else if (width >= WIDTH_SMALL) {
        setShownMovies(SHOWN_MOVIES_MEDIUM);
        setMoviesToAdd(TO_ADD_MEDIUM);
      } else {
        setShownMovies(SHOWN_MOVIES_SMALL);
        setMoviesToAdd(TO_ADD_SMALL);
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
          {moviesArray.length === 0 && (<h1 className="cards__error">Ничего не найдено</h1>)}
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
         {saveMoviesArray.length === 0 && (<h1 className="cards__error">Ничего не найдено</h1>)}
        </div>
        )
      }
    </>
  );
};

export default MoviesCardList;

