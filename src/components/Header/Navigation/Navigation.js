import React, { useState } from 'react';
import './Navigation.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation ({ isLoggedIn }) {
  const [BurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!BurgerMenuOpen);
  }
  return (
    <nav className="nav">
      {isLoggedIn ? <HeaderNavigation/> : <HeaderAuth/>}
      {isLoggedIn && (<button className="nav__burger-btn" onClick={toggleBurgerMenu}/>)}
      {BurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </nav>
  )
}

export default Navigation;