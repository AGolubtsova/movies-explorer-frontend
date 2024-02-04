import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';

//import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  // Стейты
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 // const [savedMovies, setSavedMovies] = useState([]);
 // const [isPopupOpen, setIsPopupOpen] = useState(false);
 // const [popupMessage, setPopupMessage] = useState('');
 
  const navigate = useNavigate();
  function signOut() {
    setIsLoggedIn(false);
    navigate("/");
  }

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
              <Movies isLoading={isLoading}/>
              <Footer />
            </>
          }/>
          <Route path="/saved-movies" element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <SavedMovies />
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
      </div>
   
  )
}

export default App;