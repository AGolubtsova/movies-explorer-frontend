import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import api from '../../utils/MovieApi';
import apiMain from '../../utils/MainApi';
import * as Auth from '../../utils/auth';
/*import api from '../../utils/MovieApi';*/



function App() {
  // Стейты
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [searcheMovies, setSearcheMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [allSaveMovies, setAllSaveMovies] = useState([]);
 
  // Текущий пользователь
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  
  //const [isOpen, setIsOpen] = useState(false);
  //const [isPreloader, setIsPreloader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [shortMovieCheck, setShortMovieCheck] = useState(false);
  const [saveShortMovie, setSaveShortMovie] = useState(false);
 // const [isLockedButton, setIsLockedButton] = useState(false);
 // const [errorMessage, setErrorMessage] = useState("");

 //const [savedMovies, setSavedMovies] = useState([]);
 // const [isPopupOpen, setIsPopupOpen] = useState(false);
 // const [popupMessage, setPopupMessage] = useState('');
 
  const navigate = useNavigate();
  const location = useLocation();
  function signOut() {
    setIsLoggedIn(false);
    navigate("/");
  }
  useEffect(() => {
    // Проверка авторизации пользователя при загрузке приложения
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiMain
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate(location.pathname, { replace: true });
        })
        .catch(() => {
          localStorage.removeItem("jwt"); // Очищаем токен, если он недействителн
          setIsLoggedIn(false);
          setCurrentUser({});
          navigate("/", { replace: true });
        });
    }

    // Проверка сохраненных фильтров для короткометражек
    const savedShortMoviesCheck = localStorage.getItem("savedShortMoviesCheck");
    if (savedShortMoviesCheck === "true") {
      setSaveShortMovie(true);
    }
    const shortMoviesCheck = localStorage.getItem("shortMoviesCheckbox");
    if (shortMoviesCheck === "true") {
      setShortMovieCheck(true);
    }

    // Получение всех сохраненных фильмов
    getAllSaveMovies();

    // Обновление списк найденных фильмов
    updatePreviousMovies();
  }, []);

  // Обновление всех сохраненных фильмов при изменении
  useEffect(() => {
    updateAllSaveMovies();
    updateSaveMovies();
  }, [allSaveMovies]);

  // Функция для обновления списка найденных фильмов
  const updateSearchedMovies = (movies) => {
    const updatedMovies = movies.length ? movies : [];
    setSearcheMovies(updatedMovies);
    localStorage.setItem("searched-movies", JSON.stringify(updatedMovies));
    setNotFound(!updatedMovies.length);
  };

  const updatePreviousMovies = () => {
    const previousMovies =
      JSON.parse(localStorage.getItem("searched-movies")) || [];
    updateSearchedMovies(previousMovies);
  };

// Функция для поиска фильмов
const handleSearchMovie = async (movieToSearch) => {
  if (!movieToSearch) {
    setIsPopupOpen(true);
    setPopupMessage("Нужно ввести название.");
    return;
  }

  setNotFound(false);
  localStorage.removeItem("searched-movies");
  setSearcheMovies([]);
  setIsLoading(true);

  try {
    const movies = await api.getMovies();
    const filteredMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
    );

    localStorage.setItem("filtered-movies", JSON.stringify(filteredMovies));
    localStorage.setItem("movie-to-search", JSON.stringify(movieToSearch));

    const filteredShortMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40
    );
    localStorage.setItem(
      "filtered-short-movies",
      JSON.stringify(filteredShortMovies)
    );

    updateSearchedMovies(
      shortMovieCheck ? filteredShortMovies : filteredMovies
    );
  } catch (error) {
    setIsPopupOpen(true);
    setPopupMessage(
      "Произошла ошибка. Проблема с соединением или сервер недоступен."
    );
  } finally {
    setIsLoading(false);
  }
};

// Функция для выбора короткометражек
const handleChooseShortMovies = (movieToSearch) => {
  if (location.pathname === "/movies") {
    if (!movieToSearch) {
      setIsPopupOpen(true);
      setPopupMessage("Нужно ввести название");
      return;
    }
    setShortMovieCheck(!shortMovieCheck);
    localStorage.setItem("shortMoviesCheckbox", !shortMovieCheck);
  }

  if (location.pathname === "/saved-movies") {
    const saveMoviesArray = JSON.parse(localStorage.getItem("allSaveMovies"));
    if (saveMoviesArray.length === 0) {
      setIsPopupOpen(true);
      setPopupMessage("Нет сохраненных фильмов");
      return;
    }

    setSaveShortMovie(!saveShortMovie);
    const savedFilteredShortMovies = saveMoviesArray.filter(
      (movie) => movie.duration <= 40
    );
    localStorage.setItem("savedShortMoviesCheck", !saveShortMovie);
    setSaveMovies(
      saveShortMovie ? saveMoviesArray : savedFilteredShortMovies
    );
  }
};
// Функция для поиска сохраненных фильмов
const handleSearchSaveMovie = (movieToSearch) => {
  if (!movieToSearch) {
    setIsPopupOpen(true);
    setPopupMessage("Нужно ввести название");
    return;
  }

  setNotFound(false);

  const localSaveMovies =
    JSON.parse(localStorage.getItem("allSaveMovies")) || [];
  const searchedMoviesLowerCase = movieToSearch.toLowerCase();

  let filteredSaveMovies;
  if (saveShortMovie) {
    filteredSaveMovies = localSaveMovies.filter(
      (movie) =>
        movie.duration <= 40 &&
        (movie.nameRU.toLowerCase().includes(searchedMoviesLowerCase) ||
          movie.nameEN.toLowerCase().includes(searchedMoviesLowerCase))
    );
  } else {
    filteredSaveMovies = localSaveMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchedMoviesLowerCase) ||
        movie.nameEN.toLowerCase().includes(searchedMoviesLowerCase)
    );
  }

  localStorage.setItem(
    "saved-filtered-movies",
    JSON.stringify(filteredSaveMovies)
  );
  setSaveMovies(filteredSaveMovies);
  setNotFound(filteredSaveMovies.length === 0);
};
  // Функция для получения всех сохраненных фильмов
  const getAllSaveMovies = () => {
    apiMain
      .getSaveMovies()
      .then((res) => {
        localStorage.setItem("allSaveMovies", JSON.stringify(res));
        setSaveMovies(res);
        setAllSaveMovies(res);
      })
      .catch((err) => {
        console.error("Ошибка при получении списка сохраненных фильмов:", err);
        setIsPopupOpen(true);
        setPopupMessage("Ошибка при получении списка сохраненных фильмов.");
      });
  };

  // Функция для обновления списка сохраненных фильмов
  const updateSaveMovies = () => {
    setSaveMovies(JSON.parse(localStorage.getItem("allSaveMovies")));
  };

  // Функция для обновления всех сохраненных фильмов
  const updateAllSaveMovies = () => {
    localStorage.setItem("allSaveMovies", JSON.stringify(allSaveMovies));
  };

  // Функция для сохранения фильма
  const handleSaveMovie = (movie) => {
    apiMain
      .saveMovie(movie)
      .then((res) => {
        setAllSaveMovies([...allSaveMovies, res]);
      })
      .catch((err) => {
        setIsPopupOpen(true);
        setPopupMessage("При сохранении фильма произошла ошибка.");
      });
  };
 //Popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };
// Функция для получения ID фильма для удаления
const getMovieToDeleteId = (movie) => {
  const localSaveMovies = JSON.parse(localStorage.getItem("allSaveMovies"));
  if (localSaveMovies) {
    const foundMovie = localSaveMovies.find(
      (movieItem) => movieItem.movieId === movie.id
    );
    if (foundMovie) {
      return foundMovie._id;
    }
  }
};
  // Функция для удаления фильма
  const handleDeleteMovie = (movieId) => {
    apiMain
      .deleteMovie(movieId)
      .then(() => {
        setAllSaveMovies((state) =>
          state.filter((saveMovie) => saveMovie._id !== movieId)
        );
      })
      .catch(() => {
        setIsPopupOpen(true);
        setPopupMessage("При удалении фильма произошла ошибка.");
      });
  };
   // Функция для проверки, сохранения
   const isSaved = (movie) => {
    return allSaveMovies.some((movieItem) => movieItem.movieId === movie.id);
  };

  // Функция для обновления статуса (сохранен/удален)
  const updateMovieStatus = (movie) => {
    const movieId = getMovieToDeleteId(movie);
    isSaved(movie) ? handleDeleteMovie(movieId) : handleSaveMovie(movie);
  };


  return (
    
      <div className = "аpp">
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Main/>
              <Footer/>
            </>
          }/>
          <Route path="/movies" element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Movies 
                onChooseShortMovies={handleChooseShortMovies}
                shortMovieCheck={shortMovieCheck}
                isLoading={isLoading} 
                moviesArray={searcheMovies}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
                onSearchMovies={handleSearchMovie}
                onSaveMovie={updateMovieStatus}
                isSaved={isSaved}
              
              />
              <Footer />
            </>
          }/>
          <Route path="/saved-movies" element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <SavedMovies 
              onChooseShortMovies={handleChooseShortMovies}
              savedShortMoviesCheck={saveShortMovie}
              nothingFound={notFound}
              onSearchMovie={handleSearchSaveMovie}
              deleteMovie={handleDeleteMovie}
              saveMoviesArray={saveMovies}/>
              <Footer />
            </>
          }/>
          <Route path="/profile" element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Profile isEdited={false} isError={false} onClick={false} onSignOut={signOut}/>
            </>
          }/>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
   
  )
}

export default App;