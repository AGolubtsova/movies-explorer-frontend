import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './SignPage.css';

export default function SignPage ({formName, onSubmit, title, children, buttonText }) {

  return (
    <div className="sign-page">
      <Link to="/" className="sign-page__logo"></Link>
      <h1 className="sign-page__title">{title}</h1>
      <form className="sign-page__form" name={formName} onSubmit={onSubmit}>
        <div className="sign-page__inputs">
          {children}
        </div>
        <button className="sign-page__submit-btn" type="submit">{buttonText}</button>
      </form>
      <div className="sign-page__links">
      {formName === "register" && 
          <>
            <p className="sign-page__text">Уже зарегистрированы?</p>
            <Link className="sign-page__link" to="/signin">Войти</Link>
          </> 
      }
      {formName === "login" &&
          <>
            <p className="sign-page__text">Еще не зарегистрированы?</p>
            <Link className="sign-page__link" to="/signup">Регистрация</Link>
          </> 
      }
      </div>
    </div>
  )
}