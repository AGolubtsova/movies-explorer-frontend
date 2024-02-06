import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import profileIconBlack from '../../../images/profileIconBlack.svg';

function BurgerMenu({ onClose }) {
  return (
    <div className="burger">
      <div className="burger__background">
        <div className="burger__container">
          <button className="burger__close-btn" type="button" onClick={() => onClose()} />
          <ul className="burger__links">
            <li>
              <NavLink exact to='/' className={({isActive}) => `burger-link ${isActive ? "burger-link_active" : ""}`}>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to='/movies' className={({isActive}) => `burger-link ${isActive ? "burger-link_active" : ""}`}>
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to='/saved-movies' className={({isActive}) => `burger-link ${isActive ? "burger-link_active" : ""}`}>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="burger__profile">
            <NavLink to='/profile' className="burger__account-btn">Аккаунт</NavLink>
            <img className="burger__image-btn" src={profileIconBlack} alt="Иконка аккаунта"/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;