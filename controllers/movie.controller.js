 const Movie = require('../models/movie.model');
const db = require('../config/db.config');

exports.listMovies = (req, res) => {
    Movie.findAll((err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).render('movies', { movies: [], error: 'Error fetching movies.', activeTab: 'view-movies' });
        }
        res.render('movies', { movies: results, success: req.query.success, activeTab: 'view-movies' });
    });
};

exports.showCreateForm = (req, res) => {
    res.render('dashboard', { success: req.query.success, activeTab: 'add-movie' });
};

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

    if (!poster || !title || !description || !release_date || !genre) {
        return res.status(400).render('dashboard', { error: 'All required fields must be filled.', activeTab: 'add-movie' });
    }

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

    Movie.create(movieData, (err, result) => {
        if (err) {
            console.error('Error adding movie:', err);
            return res.status(500).render('dashboard', { error: 'Failed to save movie.', activeTab: 'add-movie' });
        }
        res.redirect('/admin/movies?success=true');
    });
};

exports.showMovie = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (err || !movie) {
            console.error('Error fetching movie:', err);
            return res.status(404).render('movies', { movies: [], error: 'Movie not found.', activeTab: 'view-movies' });
        }
        res.render('movie', { movie, activeTab: 'view-movies' });
    });
};

exports.showEditForm = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (err || !movie) {
            console.error('Error fetching movie:', err);
            return res.status(404).render('dashboard', { error: 'Movie not found.', activeTab: 'add-movie' });
        }
        res.render('dashboard', { movie, activeTab: 'add-movie' });
    });
};

exports.updateMovie = (req, res) => {
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

    const poster = req.file ? `/uploads/${req.file.filename}` : req.body.poster_url;

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

    Movie.update(req.params.id, movieData, (err, result) => {
        if (err) {
            console.error('Error updating movie:', err);
            return res.status(500).render('dashboard', { error: 'Failed to update movie.', activeTab: 'add-movie' });
        }
        res.redirect('/admin/movies?success=true');
    });
};

exports.deleteMovie = (req, res) => {
    Movie.delete(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting movie:', err);
            return res.status(500).render('movies', { movies: [], error: 'Error deleting movie.', activeTab: 'details' });
        }
        res.redirect('/admin/movies?success=true');
    });
};

module.exports = exports;