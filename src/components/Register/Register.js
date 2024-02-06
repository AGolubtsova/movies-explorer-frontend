import React, { useState, useEffect }  from 'react';
import SignPage from '../SignPage/SignPage';
import './Register.css';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleName (e) { setName(e.target.value) };
  function handleEmail (e) { setEmail(e.target.value) };
  function handlePassword (e) { setPassword(e.target.value) };

  function handleSubmit (e) {
    e.preventDefault();
    onRegister(password, email);
  }

  useEffect(() => {
    setPassword('');
    setEmail('');
  }, []);

  return (
    <div className = "register">
      <SignPage
        formName="register"
        onSubmit={handleSubmit}
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        aria-label="кнопка зарегистрироваться"
      >
        <span className="sign-page__label">Имя</span>
        <input
          className="sign-page__input"
          id="email-input" 
          type="text" 
          onChange={handleName} 
          value={name || ''}
          name="name" 
          placeholder="Виталий" 
          minLength="3" 
          maxLength="20" 
          required
        />
        <span className="sign-page__label">E-mail</span>
        <input
          className="sign-page__input"
          id="email-input" 
          type="email" 
          onChange={handleEmail} 
          value={email || ''}
          name="email" 
          placeholder="pochta@yandex.ru|" 
          minLength="3" 
          maxLength="20" 
          required/>
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
          required/>
        <span className="sign-page__input-error">Что-то пошло не так...</span>
      </SignPage>
    </div>
  )
}