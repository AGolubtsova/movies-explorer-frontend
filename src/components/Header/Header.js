import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from './Navigation/Navigation';
import headerLogo from '../../images/header-logo.svg';

function Header({ isLoggedIn }) {
  const location = useLocation();
  return (
    <header className={`${location.pathname === '/' ? "header" : "header-movies"}`}>
      <NavLink to="/" className={`${location.pathname === '/' ? "header__content" : "header-movies__content"}`}>
        <img className={`${location.pathname === '/' ? "header__logo" : "header-movies__logo"}`} src={headerLogo} alt="Логотип" />
      </NavLink>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
