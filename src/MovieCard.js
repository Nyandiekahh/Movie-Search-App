import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="card h-100">
      <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">{movie.Year}</p>
        <p className="card-text">{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
