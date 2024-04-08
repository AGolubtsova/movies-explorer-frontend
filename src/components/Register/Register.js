import React from 'react';
import { useNavigate } from "react-router-dom";
import SignPage from '../SignPage/SignPage';
import './Register.css';
import useValidationForm from '../../hooks/useValidationForm';

export default function Register({ onRegister, isLoggedIn }) {
  const navigate = useNavigate();
  isLoggedIn && navigate("/", { replace: true });

  const { values, handleChange, errors, isFormValid } = useValidationForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <div className = "register">
      <SignPage
        formName="register"
        onSubmit={handleSubmit}
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        isFormValid={isFormValid}
        aria-label="кнопка зарегистрироваться"
      >
        <p className="sign-page__label">Имя</p>
        <input
          className="sign-page__input"
          id="name-input" 
          type="text" 
          onChange={handleChange} 
          value={values.name || ''}
          name="name" 
          placeholder="Виталий" 
          minLength="2" 
          maxLength="20" 
          required
        />
        <span className="sign-page__input-error">{errors.name}</span>
        <p className="sign-page__label">E-mail</p>
        <input
          className="sign-page__input"
          id="email-input" 
          type="email" 
          onChange={handleChange} 
          value={values.email || ''}
          name="email" 
          placeholder="pochta@yandex.ru|" 
          minLength="2" 
          maxLength="20" 
          required/>
        <span className="sign-page__input-error">{errors.email}</span>
        <p className="sign-page__label">Пароль</p>
        <input
          className="sign-page__input"
          id="passwd-input" 
          type="password" 
          onChange={handleChange} 
          value={values.password || ''}
          name="password"
          placeholder="••••••••••••••"
          minLength="2"
          maxLength="20"
          required/>
         <span className="sign-page__input-error">{errors.password}</span>
      </SignPage>
    </div>
  )
}