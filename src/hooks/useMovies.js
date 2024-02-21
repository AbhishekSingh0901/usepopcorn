import { useState, useEffect } from "react";

export function useMovies(query, KEY, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    const fetchMovies = async () => {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something Went Wrong with fetching moveis!");
        const data = await res.json();
        // console.log(data);
        if (data.Response === "False") throw new Error("No movies found");

        setMovies(data.Search);
      } catch (err) {
        // console.error(err.message);
        if (err.name === "AbortError") setError("");
        else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, KEY]);

  return { movies, isLoading, error };
}
