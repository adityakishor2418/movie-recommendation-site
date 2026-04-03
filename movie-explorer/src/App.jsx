import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import MovieCategory from './pages/MovieCategory';
import AIHelp from './components/AIHelp'; // <-- 1. Import the AI Help Component

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      
      {/* 2. Place it outside the Routes so it floats on every page! */}
      <AIHelp /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<MovieCategory title="Popular Movies" endpoint="/movie/popular" />} />
        <Route path="/top-rated" element={<MovieCategory title="Top Rated Movies" endpoint="/movie/top_rated" />} />
        <Route path="/upcoming" element={<MovieCategory title="Upcoming Movies" endpoint="/movie/upcoming" />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;