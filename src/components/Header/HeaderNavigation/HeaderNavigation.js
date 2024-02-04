import {NavLink} from 'react-router-dom';
import React from "react";
import "./HeaderNavigation.css";
import profileIcon from '../../../images/profileicon.svg';

function HeaderNavigation() {
    return (
        <div className="header-navigation">
            <ul className="header-navigation__container">
                <li>
                    <NavLink
                        to="/movies"
                        className={({isActive}) => isActive
                            ? "header-navigation__link header-navigation__link_active"
                            : "header-navigation__link"}>
                        Фильмы
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/saved-movies"
                        className={({isActive}) => isActive
                            ? "header-navigation__link header-navigation__link_active"
                            : "header-navigation__link"}>
                        Сохранённые фильмы
                    </NavLink>
                </li>
            </ul>
            <div className="header-navigation__profile">
              <NavLink to='/profile' className='header-navigation__account-btn'>Аккаунт </NavLink>
              <img className="header-navigation__image-btn" src={profileIcon} alt="Иконка аккаунта"/>
             </div>
            
        </div>
    );
}

export default HeaderNavigation;