 const Movie = require('../models/movie.model');
const db = require('../config/db.config');

// View all movies
exports.listMovies = (req, res) => {
  Movie.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('admin/movie/index', { movies: results });
  });
};

// Show form to create a new movie
exports.showCreateForm = (req, res) => {
  res.render('admin/movie/create');
};

// Handle movie creation
exports.createMovie = (req, res) => {
  const data = req.body;
  const poster = req.file ? `/uploads/${req.file.filename}` : null;
  const movieData = { ...data, poster_url: poster };

  

  console.log("Prepared Movie Data:", movieData); // ✅ Debugging
  if (!movieData.title || !movieData.description || !movieData.release_date) {      
    return res.status(400).send("Title, description, and release date are required.");
  }

  Movie.create(movieData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/admin/movies');
  });
};
exports.listMovies = (req, res) => {
  Movie.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.render('admin_dashboard/dashboard', {
      activeTab: 'view-movies',
      movies: results
    });
  });
};

// Show a single movie by ID
exports.showMovie = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.render('admin/movie/show', { movie: result[0] });
  });
};

// Show form to edit a movie
exports.showEditForm = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.render('admin/movie/edit', { movie: result[0] });
  });
};

// Update an existing movie
exports.updateMovie = (req, res) => {
  const data = req.body;
  const poster = req.file ? `/uploads/${req.file.filename}` : null;

  if (poster) {
    data.poster_url = poster;
  }

  Movie.update(req.params.id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
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
