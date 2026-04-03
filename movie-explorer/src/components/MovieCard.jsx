import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // TMDB requires a base URL for images
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';
  
  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      <Link to={`/movie/${movie.id}`} style={{ 
        textDecoration: 'none', 
        color: 'white' // Change this from '#333' to 'white'
      }}>
        <img src={imageUrl} alt={movie.title} style={{ 
          width: '100%', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }} />
        <h4 style={{ margin: '10px 0 5px 0' }}>{movie.title}</h4>
      </Link>
    </div>
  );
};

export default MovieCard;