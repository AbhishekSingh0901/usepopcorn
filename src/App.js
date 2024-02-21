import { useState } from "react";
import NavBar from "./components/navbar/navbar.component";
import Box from "./components/ui/box.component";
import SearchBar from "./components/searchbar/searchbar.component";
import Main from "./components/ui/main.component";
import NumResult from "./components/numresult/num-result.component";
import Loader from "./components/ui/loader.component";
import MovieList from "./components/movielist/movie-list.component";
import ErrorMessage from "./components/error/error-message.component";
import SelctedMovie from "./components/selectedMovie/selected-movie.component";
import WatchedSummary from "./components/watchedSummary/watched-summary.component";
import WatchedMoviesList from "./components/watchedlist/watched-list";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

// import { useState } from "react";

const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(
    query,
    KEY,
    handleCloseSelectedMovie
  );
  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }
  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelctedMovie
              KEY={KEY}
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
  // return (
  //   <TextExpander
  //     expandButtonText="show text"
  //     collapseButtonText="hide text"
  //     expanded={false}
  //     buttonColor="yellow"
  //     collapsedNumWords={1}
  //   >
  //     Space travel is the ultimate adventure! Imagine soaring past the stars and
  //     exploring new worlds. It's the stuff of dreams and science fiction, but
  //     believe it or not, space travel is a real thing. Humans and robots are
  //     constantly venturing out into the cosmos to uncover its secrets and push
  //     the boundaries of what's possible.
  //   </TextExpander>
  // );
}

// function TextExpander({
//   children,
//   collapsedNumWords,
//   expandButtonText,
//   collapseButtonText,
//   buttonColor,
//   expanded,
//   className,
// }) {
//   const [isExpanded, setIsExpanded] = useState(expanded);
//   const para = isExpanded
//     ? children
//     : children.split(" ").splice(0, collapsedNumWords).join() + "...";

//   const style = {
//     background: "none",
//     border: "none",
//     font: "inherit",
//     cursor: "pointer",
//     marginLeft: "6px",
//     color: buttonColor,
//   };

//   return (
//     <h2 className={className}>
//       {para}
//       <span
//         role="button"
//         style={style}
//         onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
//       >
//         {!isExpanded ? expandButtonText : collapseButtonText}
//       </span>
//     </h2>
//   );
// }
