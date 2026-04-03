import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery(''); 
    }
  };

  return (
    // Updated padding and background color
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 4%', /* Uses percentages to adapt to screen size */
      background: '#1f1f1f', /* Slightly lighter dark grey for contrast */
      borderBottom: '2px solid #FFD700', /* Yellow accent border at the bottom */
      color: 'white' 
    }}>
      
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ 
          color: '#FFD700', 
          textDecoration: 'none', 
          fontFamily: 'Courier New, monospace', 
          fontWeight: 'bold',
          fontSize: '1.3rem' 
        }}>
          🎬 Movie Explorer
        </Link>
      </h2>

      <div style={{ display: 'flex', gap: '40px', fontWeight: 'bold' }}>
        <Link to="/popular" style={{ color: 'white', textDecoration: 'none' }}>Popular</Link>
        <Link to="/top-rated" style={{ color: 'white', textDecoration: 'none' }}>Top Rated</Link>
        <Link to="/upcoming" style={{ color: 'white', textDecoration: 'none' }}>Upcoming</Link>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex' }}>
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', outline: 'none' }}
        />
        <button type="submit" style={{ 
          padding: '0.5rem', 
          marginLeft: '0.5rem', 
          cursor: 'pointer', 
          borderRadius: '4px', 
          border: 'none', 
          background: '#FFD700', 
          color: '#1a1a1a', 
          fontWeight: 'bold' 
        }}>Search</button>
      </form>
    </nav>
  );
}

export default Navbar;