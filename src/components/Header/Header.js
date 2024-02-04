import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from './Navigation/Navigation';
import headerLogo from '../../images/header-logo.svg';

function Header({ isLoggedIn }) {
  const location = useLocation();
  return (
    <header className={`${location.pathname === '/' ? "header" : "header__movies"}`}>
      <NavLink to="/" className="header__content">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </NavLink>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
