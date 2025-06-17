const Movie = require('../models/movie.model');

exports.listMovies = (req, res) => {
  Movie.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('admin/movie/index', { movies: results });
  });
};

exports.showCreateForm = (req, res) => {
  res.render('admin/movie/create');
};

exports.createMovie = (req, res) => {
  const data = req.body;
  const poster = req.file ? `/uploads/${req.file.filename}` : null;
  const movieData = { ...data, poster_url: poster };

  Movie.create(movieData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/admin/movies');
  });
};

exports.showMovie = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.render('admin/movie/show', { movie: result[0] });
  });
};

exports.showEditForm = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.render('admin/movie/edit', { movie: result[0] });
  });
};

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

exports.deleteMovie = (req, res) => {
  Movie.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/admin/movies');
  });
};
