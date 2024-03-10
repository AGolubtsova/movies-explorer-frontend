export function chooseShortMovies(movies) {
    return movies.filter(movie => movie.duration <= 40);
}
  
  export function filterMovies(movies, userSearch, shortMoviesCheckbox) {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userSearch.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });
  
    if (shortMoviesCheckbox) {
      return chooseShortMovies(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }