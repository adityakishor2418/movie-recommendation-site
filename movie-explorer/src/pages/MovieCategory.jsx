import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const MovieCategory = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  // ⚠️ Remember to add your API key here!
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    // Dynamically inject the endpoint into the fetch URL
    fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(`Error fetching ${title}:`, err));
  }, [endpoint]); // The effect re-runs if the endpoint changes

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#FFD700', textAlign: 'center', margin: '30px 0', fontSize: '2rem' }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCategory;