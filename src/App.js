import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './App.css';

const App = () => {
  console.log('API Key:', process.env.REACT_APP_OMDB_API_KEY); // Log the environment variable
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY; // Use environment variable
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    console.log('Request URL:', url); // Log the URL being requested

    try {
      const response = await axios.get(url);
      console.log('Response:', response.data); // Log the response

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <form className="form-inline justify-content-center mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {movies && movies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.imdbID}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
