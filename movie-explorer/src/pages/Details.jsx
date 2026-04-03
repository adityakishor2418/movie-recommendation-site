import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
  const { id } = useParams(); // Grabs the dynamic ID from the URL
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error("Error fetching details:", err));
  }, [id]);

  if (!movie) return <h2 style={{ padding: '20px' }}>Loading... ⏳</h2>;

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
      {imageUrl && <img src={imageUrl} alt={movie.title} style={{ width: '300px', borderRadius: '12px' }} />}
      <div>
        <h1 style={{ margin: '0 0 10px 0' }}>{movie.title}</h1>
        <p style={{ color: 'gray' }}><em>{movie.tagline}</em></p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
        <h3>Overview</h3>
        <p style={{ lineHeight: '1.6' }}>{movie.overview}</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: '#1a1a1a', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Details;