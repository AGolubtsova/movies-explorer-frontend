import { MOVIE_API_URL} from './constants';

class MoviesApi {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers
    };
    
  // Метод обработки ответа сервера
  _sendRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._sendRequest(res));
  }
}

// Объявление экземпляра API
const optionsApi = {
    url: MOVIE_API_URL,
    headers: {
          'Accept': "application/json",
          'Content-Type': "application/json"
    }
}

const api = new MoviesApi(optionsApi);
export default api;