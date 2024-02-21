function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length} Results</strong>
    </p>
  );
}

export default NumResult;
