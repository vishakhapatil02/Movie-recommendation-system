 const Movie = require('../models/movie.model');
const db = require('../config/db.config');

// View all movies
exports.listMovies = (req, res) => {
  Movie.findAll((err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send("Failed to load movies.");
    }
    res.render('admin_dashboard/dashboard', {
      movies: results,
      success: req.query.success || null,
      activeTab: 'view-movies'
    });
  });
};

// Show form to create a new movie
exports.showCreateForm = (req, res) => {
  res.render('admin/movie/create');
};

// Handle movie creation
exports.createMovie = (req, res) => {
  const {
    title,
    description,
    release_date,
    genre,
    director,
    language,
    country,
    budget,
    revenue,
    runtime,
    trailer_url
  } = req.body;

  const poster = req.file ? `/uploads/${req.file.filename}` : null;

  const movieData = {
    title,
    description,
    release_date,
    genre,
    director,
    language,
    country,
    budget,
    revenue,
    runtime,
    poster_url: poster,
    trailer_url
  };
  console.log("Received Form Data:", movieData);

  // Insert into DB
  Movie.create(movieData, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Failed to save movie.");
    }
    res.redirect('/admin/movies');
  });
};


// Delete a movie by ID
exports.deleteMovie = (req, res) => {
  Movie.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/admin/movies');
  });
};
