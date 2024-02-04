import React from "react";
import "./Profile.css";

function Profile({ isEdited, isError, onClick, onSignOut }) {

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label className="profile__label">
          <span className="profile__text">Имя</span>
          <input className="profile__input" type="text" name="name" placeholder="Виталий" minLength="2" maxLength="30" value="" required/>
        </label>
        <label className="profile__label">
          <span className="profile__text">E-mail</span>
          <input className="profile__input" type="email" name="email" placeholder="pochta@yandex.ru" value="" required/>
        </label>
      </form>
      {!isError ? (
        <>
          <button className="profile__button" onClick={onClick}>
            Редактировать
          </button>
          <button className="profile__button_signout" onClick={onSignOut}>
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <>
          <span className={`profile__error ${isEdited && "profile__error_hidden"}`}>При обновлении профиля произошла ошибка.</span>
          <button className={`${isEdited ? "profile__button_edit" : "profile__button_error"}`} type="button" onClick={onClick}>
            Сохранить
          </button>
        </>
      )}
    </section>
  );
}

export default Profile;