import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Gets the ?q= value from the URL
  const [results, setResults] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (query) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.results))
        .catch(err => console.error("Error fetching search:", err));
    }
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#FFD700', textAlign: 'center', margin: '30px 0' }}>Search Results for: "{query}"</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {results.length > 0 ? (
          results.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;