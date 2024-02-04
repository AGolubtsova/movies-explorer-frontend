import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;