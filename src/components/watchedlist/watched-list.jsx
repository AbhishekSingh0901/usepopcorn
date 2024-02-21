import WatchedMovie from "../watchedMovie/watched-movie.component";

function WatchedMoviesList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onRemoveWatched={onRemoveWatched}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
