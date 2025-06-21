const db = require('../config/db.config');

const Movie = {
    listMovies: (req, res) => {
        db.query('SELECT * FROM movies', (err, results) => {
            if (err) {
                console.error('Error fetching movies:', err);
                return res.status(500).render('admin_dashboard/dashboard', { movies: [], error: 'Failed to load movies' });
            }
            res.render('admin_dashboard/dashboard', { movies: results, error: null, success: null });
        });
    },
    showMovie: (req, res) => {
        // Implement as needed
    },
    showEditForm: (req, res) => {
        // Implement as needed
    },
    createMovie: (req, res) => {
        const { title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url } = req.body;
        console.log('Received data:', req.body); // Debug: Log received data
        const query = 'INSERT INTO movies (title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [title, description, release_date, genre, director || null, language || null, country || null, budget || null, revenue || null, runtime || null, poster_url, trailer_url || null], (err, result) => {
            if (err) {
                console.error('Error inserting movie:', err);
                return res.status(500).json({ error: 'Failed to add movie' });
            }
            console.log('Movie inserted successfully:', result.insertId);
            res.status(200).json({ message: 'Movie added successfully' });
        });
    },
    updateMovie: (req, res) => {
        // Implement as needed
    },
    deleteMovie: (req, res) => {
        // Implement as needed
    }
};

module.exports = Movie;