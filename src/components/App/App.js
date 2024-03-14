import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useMatch, useLocation } from 'react-router-dom';
import './App.css';
import { CurrentUserContext }from '../../contexts/CurrentUserContext';

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
import * as аuth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { chooseShortMovies, filterMovies } from '../../utils/functions';


function App() {
  const routeMain = useMatch("/");
  const routeMovies = useMatch("/movies");
  const routeSavedMovies = useMatch("/saved-movies");
  const routeProfile = useMatch("/profile");

  // Стейты
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [shortMoviesCheck, setShortMoviesCheck] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();

    if (isLoggedIn) {
      Promise.all([apiMain.getContent(),  apiMain.getSavedMovies()])
      .then(([userData, movies]) => {
        setSavedMovies(movies.data);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      })  
    }
  }, [isLoggedIn])


  // Авторизация
  const handleRegistration = async ({ name, email, password }) => {
    return аuth.register( name, email, password )
    .then(() => {
      handleAuthorization({ email, password });
    })
    .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
    });
  };

  const handleAuthorization = async (data) => {
    return аuth.login(data.email, data.password)
    .then((token) => {
      setIsLoggedIn(true);
      localStorage.setItem('jwt', token);
      navigate("/movies", {replace: true});
      Promise.all([apiMain.getContent(token), apiMain.getSavedMovies(token)])
        .then(([userInfo, userMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(userMovies.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
    })
    .catch(error => {
      setPopupMessage(error);
      setIsPopupOpen(true);
    });
  };

  //Поиск и фильтрация
  const handleSetFilteredMovies = (movies, userSearch, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userSearch, false);
    if (moviesList.length === 0) {
      setPopupMessage('Ничего не найдено.');
      setIsPopupOpen(true);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
       shortMoviesCheckbox ? chooseShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  const handleSearchSubmit = (inputValue) => {
    if (!inputValue || inputValue.trim().length === 0) {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }

    localStorage.setItem('movieToSearch', inputValue);
    localStorage.setItem('shortMovies', shortMoviesCheck);

    if (isAllMovies.length === 0 && localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      setIsAllMovies(movies);
      handleSetFilteredMovies(
        movies,
        inputValue,
        shortMoviesCheck
      );
    } else if (isAllMovies.length === 0) {
      setIsLoading(true);
      api.getMovies()
      .then(movies => {
        localStorage.setItem('allMovies', JSON.stringify(movies));
        setIsAllMovies(movies);
        handleSetFilteredMovies(
          movies,
          inputValue,
          shortMoviesCheck
        );
      })
      .catch((error) => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => setIsLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMoviesCheck);
    }
  }

  const handleShortFilms = () => {
    setShortMoviesCheck(!shortMoviesCheck);
    if (!shortMoviesCheck) {
      setFilteredMovies(chooseShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMoviesCheck);
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMoviesCheck(true);
    } else if (localStorage.getItem('shortMovies') === 'false') {
      setShortMoviesCheck(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(chooseShortMovies(movies));
      } else {
        setFilteredMovies(movies);
    }
  }
  }, [location]);

 //Функции сохранения и удаления
  const handleSaveMovie = (movie) => {
    apiMain.saveMovie(movie)
    .then((newSavedMovie) => {
      setSavedMovies((prev) => [...prev, newSavedMovie.data]);
    })
    .catch((error) => {
      setPopupMessage(error);
      setIsPopupOpen(true);
    })
  }

  const handleDeleteMovie = (movieId) => {
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movieId
    });
    const id = handledMovie ? handledMovie._id : null;
    apiMain.deleteMovie(id)
    .then(() => {
      const updatedSavedMovies = savedMovies.filter(item => id !== item._id);
      setSavedMovies(updatedSavedMovies);
    })
    .catch(error => {
      setPopupMessage(error);
      setIsPopupOpen(true);
    })
  };
  
  //Функция проверки лайка - возвращает статус сохраненности карточки
  const verifyLike = (id) => {
    return savedMovies.some((item) => item.movieId === id);
  }

  //Попап
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  //Функция изменения данных пользователя
  const handleUpdateUser = (data) => {
    apiMain.sendUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      setPopupMessage('Профиль успешно редактирован!');
      setIsPopupOpen(true);
    })
    .catch(error => {
      setPopupMessage('При обновлении профиля произошла ошибка.');
      setIsPopupOpen(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  //Функция разлогинивания
  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      аuth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate(location.pathname, { replace: true });
        }
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
        navigate("/", { replace: true });
      });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className = "аpp">
        {(routeMain || routeMovies || routeSavedMovies || routeProfile) && <Header isLoggedIn={isLoggedIn} />}
         <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Movies
              likedMovies={savedMovies}
              isLoading={isLoading} 
              onSearchMovies={handleSearchSubmit}
              onChooseShortMovies={handleShortFilms}
              moviesArray={filteredMovies}
              shortMoviesCheck={shortMoviesCheck}
              onSave={handleSaveMovie}
              onDelete={handleDeleteMovie}
              verifyLike={verifyLike}
            />
            </ProtectedRoute>
          }/>
          <Route path="/saved-movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies
              likedMovies={savedMovies}
              isLoading={isLoading}
              onDelete={handleDeleteMovie}
              verifyLike={verifyLike}
              setPopupMessage={setPopupMessage}
              setIsPopupOpen={setIsPopupOpen}
            />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile onUpdateUser={handleUpdateUser} onSignOut={handleSignOut} /></ProtectedRoute>
          }/>
          <Route path="/signin" element={
            <Login onLogin={handleAuthorization} isLoggedIn={isLoggedIn} />
          }/>
          <Route path="/signup" element={
            <Register onRegister={handleRegistration} isLoggedIn={isLoggedIn}/>
          }/>
        </Routes>
        {(routeMain || routeMovies ||routeSavedMovies) ? <Footer /> : <></>}
        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider> 
  )
}

export default App;