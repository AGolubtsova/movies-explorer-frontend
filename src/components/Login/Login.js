import React, { useState, useEffect }  from 'react';
import SignPage from '../SignPage/SignPage';
import './Login.css';

export default function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail (e) { setEmail(e.target.value) };
  function handlePassword (e) { setPassword(e.target.value) };

  function handleSubmit (e) {
    e.preventDefault();
    onLogin(password, email);
  }

  useEffect(() => {
    setPassword('');
    setEmail('');
 }, []);

  return (
    <div className = "login">
      <SignPage
        formName="login"
        onSubmit={handleSubmit}
        title="Рады видеть!"
        buttonText='Войти'
        aria-label="кнопка войти"
      >
        <span className="sign-page__label">E-mail</span>
        <input
          className="sign-page__input"
          id="email-input" 
          type="email" 
          onChange={handleEmail} 
          value={email || ''}
          name="email" 
          placeholder="pochta@yandex.ru" 
          minLength="3" 
          maxLength="20" 
          required
        />
        <span className="sign-page__label">Пароль</span>
        <input
          className="sign-page__input"
          id="passwd-input" 
          type="password" 
          onChange={handlePassword} 
          value={password || ''}
          name="password"
          placeholder="••••••••••••••"
          minLength="3"
          maxLength="20"
          required 
        />
        <div className="login__devider"></div>
      </SignPage>
    </div>
  )
}