const db = require('../config/db.config');

exports.create = (movieData, callback) => {
  const sql = `
    INSERT INTO movies 
    (title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    movieData.title,
    movieData.description,
    movieData.release_date,
    movieData.genre,
    movieData.director,
    movieData.language,
    movieData.country,
    movieData.budget,
    movieData.revenue,
    movieData.runtime,
    movieData.poster_url,
    movieData.trailer_url
  ];

  db.query(sql, values, callback);
};

// Find a movie by ID 
exports.findById = (id, callback) => {
  const sql = "SELECT * FROM movies WHERE movie_id = ?";
  db.query(sql, [id], callback);
};

// Update a movie record  
exports.update = (id, movieData, callback) => {
  const sql = `
    UPDATE movies
    SET title = ?, description = ?, release_date = ?, genre = ?, director = ?, language = ?,
        country = ?, budget = ?, revenue = ?, runtime = ?, poster_url = ?, trailer_url = ?
    WHERE movie_id = ?
  `;
  const values = [
    movieData.title,
    movieData.description,
    movieData.release_date,
    movieData.genre,
    movieData.director,
    movieData.language,
    movieData.country,
    movieData.budget,
    movieData.revenue,
    movieData.runtime,
    movieData.poster_url,
    movieData.trailer_url,
    id
  ];
  db.query(sql, values, callback);
};

// Delete a movie record
exports.delete = (id, callback) => {
  const sql = "DELETE FROM movies WHERE movie_id = ?";
  db.query(sql, [id], callback);
};


// Get all movies
exports.findAll = (callback) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, callback);
};
