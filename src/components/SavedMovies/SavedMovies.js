import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(
  onChooseShortMovies,
  savedShortMovieCheck,
  saveMoviesArray,
  deleteMovie,
  onSearchMovie,) {
  return (
    <main className="saved-movies">
      <SearchForm 
      shortMovieCheck={savedShortMovieCheck}
      onChooseShortMovies={onChooseShortMovies}
      onSearchMovie={onSearchMovie}
      />
      <MoviesCardList deleteMovie={deleteMovie}
        
        saveMoviesArray={saveMoviesArray}/>
      <div className="saved-movies__devider"></div>
    </main>
  );
}

export default SavedMovies;