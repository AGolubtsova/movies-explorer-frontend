import React  from 'react';
import SignPage from '../SignPage/SignPage';
import './Login.css';
import useValidationForm from '../../hooks/useValidationForm';

export default function Login ({ onLogin }) {
  const { values, errors, handleChange, isFormValid, resetForm, isChange } = useValidationForm();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  return (
    <div className = "login">
      <SignPage
        formName="login"
        onSubmit={handleSubmit}
        title="Рады видеть!"
        buttonText='Войти'
        isFormValid={isFormValid}
        aria-label="кнопка войти"
      >
        <p className="sign-page__label">E-mail</p>
        <input
          className="sign-page__input"
          id="email-input" 
          type="email" 
          onChange={handleChange} 
          value={values.email || ''}
          name="email" 
          placeholder="pochta@yandex.ru" 
          minLength="2" 
          maxLength="20" 
          required
        />
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
          required 
        />
        <span className="sign-page__input-error">{errors.password}</span>
        <div className="login__devider"></div>
      </SignPage>
    </div>
  )
}