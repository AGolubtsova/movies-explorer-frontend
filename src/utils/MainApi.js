import { BASE_URL } from './constants';

class MainApi {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    };

    // Метод обработки ответа сервера
    _sendRequest(url, options) {
        return fetch(url, options)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
          throw new Error(`Ошибка: ${res.status}`)
        })
    }

    // Метод инициализации данных с сервера
    getContent() {
        return this._sendRequest(`${this._url}/users/me`, {
          method: 'GET', 
          headers : {authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers}
        });
    }

    // Метод отправки данных пользователя на сервер
    sendUserInfo({name, email}) {
        return this._sendRequest(`${this._url}/users/me`, {
            headers: {authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers},
            method: 'PATCH',
            body: JSON.stringify({ 
              name: name, 
              email: email, 
            })
        });
    }
    
    // Метод добавления сохраненных фильмов
    saveMovie(data) {
        return this._sendRequest(`${this._url}/movies`, {
          method: "POST",
          headers: {authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers},
          body: JSON.stringify({
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
            director: data.director,
            country: data.country,
            year: data.year,
            duration: data.duration,
            description: data.description,
            trailerLink: data.trailerLink,
            image:  `https://api.nomoreparties.co${data.image.url}`,
            thumbnail:  `https://api.nomoreparties.co${data.image.url}`,
          })
        })
    }
    
    // Метод получения сохраненных фильмов
    getSavedMovies() {
      return this._sendRequest(`${this._url}/movies`, {
        method: "GET",
        headers: {authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers},
      })
    }

    // Метод удаления фильмов
    deleteMovie(movieId) {
      return this._sendRequest(`${this._url}/movies/${movieId}`, {
        method: "DELETE",
        headers: {authorization: 'Bearer ' + localStorage.getItem("jwt"), ...this._headers},
      })
    }
}

// Объявление экземпляра API
const optionsApi = {
    url: BASE_URL,
    headers: {
          'Content-Type': "application/json"
    }
  }
const apiMain = new MainApi(optionsApi);
export default apiMain;