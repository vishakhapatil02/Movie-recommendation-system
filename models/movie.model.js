 const db = require('../config/db.config');

// Create a new movie record
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

  console.log('🚀 Inserting Movie:', values); // ✅ Helpful debug

  db.query(sql, values, callback);
};

// Get all movies
exports.findAll = (callback) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, callback);
};
