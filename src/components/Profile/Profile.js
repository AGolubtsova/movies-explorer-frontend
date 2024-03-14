import React, { useContext, useEffect, useState } from 'react';
import "./Profile.css";
import useValidationForm from '../../hooks/useValidationForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut }) {
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { values, errors, handleChange, isFormValid, resetForm, isChange } = useValidationForm();

  useEffect(() => {
    setName(currentUser.data.name);
    setEmail(currentUser.data.email);
  },[currentUser]); 

  useEffect(() => {
    if (isChange) {
      if (values.name) {
        if (isFormValid && errors.name === '') {
          setIsEdited(true);
        } else {
          setIsEdited(false);
        }
      }
      if (values.email) {
        if (isFormValid && errors.email === '') {
          setIsEdited(true);
        } else {
          setIsEdited(false);
        }
      }
    }
  }, [isChange, isFormValid, errors])

  function handleClick() {
    setIsButtonClick(true);
    setDisabled(false);
  }

  function handleSubmit(evt) {
    let i=0
      evt.preventDefault();
      if (values.name) {
        if (isFormValid) {
          if (values.name !== currentUser.data.name) {
            onUpdateUser({
              name: values.name || name,
              email: values.email || email
            })
            currentUser.data.name = values.name
            setName(currentUser.data.name);
          } else {
            setIsButtonClick(false);
            setDisabled(true);
            setIsEdited(true);
            resetForm();
            return i=i++
          }
        } 
        setIsButtonClick(false);
        setDisabled(true);
        setIsEdited(true);
        resetForm();
        return i=0
      }
      if (values.email) {
        if (isFormValid) {
          if (values.email !== currentUser.data.email) {
            onUpdateUser({ 
              name: values.name || name,
              email: values.email || email
            })
            currentUser.data.email = values.email
            setEmail(currentUser.data.email);
          } else {
            setIsButtonClick(false);
            setDisabled(true);
            setIsEdited(true);
            resetForm();
          }
        } 
        setIsButtonClick(false);
        setDisabled(true);
        setIsEdited(true);
        resetForm();
       return i=0
      }
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${name}!`}</h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <label className="profile__label">
          <span className="profile__text">Имя</span>
          <input className="profile__input" type="text" name="name" placeholder="Виталий" minLength="2" maxLength="30" value={values.name || name} disabled={isDisabled} onChange={handleChange} required/>
        </label>
        <label className="profile__label">
          <span className="profile__text">E-mail</span>
          <input className="profile__input" type="email" name="email" placeholder="pochta@yandex.ru" value={values.email || email} disabled={isDisabled} onChange={handleChange} required/>
        </label>
    
      {!isButtonClick ? (
        <>
          <button className="profile__button" onClick={handleClick} type="button">
            Редактировать
          </button>
          <button className="profile__button-signout" onClick={onSignOut}>
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <>
          <span className={`profile__error`}>{errors.name || errors.email}</span>
          <button className={`${isEdited && ((values.name && values.name !== currentUser.data.name) || (values.email && values.email !== currentUser.data.email)) ? "profile__button_edit" : "profile__button_error"}`}
                  type="submit"
                  disabled={(!isEdited || ((!values.name || values.name === currentUser.data.name) && (!values.email || values.email === currentUser.data.email)))  && "disabled"}>
            Сохранить
          </button>
        </>
      )}
      </form>
    </section>
  );
}

export default Profile;