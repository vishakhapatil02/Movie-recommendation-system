 const db = require('../config/db.config');

const Movie = {
    findAll: (callback) => {
        db.query('SELECT * FROM movies ORDER BY created_at DESC', callback);
    },

    create: (movieData, callback) => {
        const {
            movie_id,
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
            poster_url,
            trailer_url
        } = movieData;
        db.query(
            `INSERT INTO movies (movie_id, title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                movie_id,
                title,
                description,
                release_date,
                genre,
                director || null,
                language || null,
                country || null,
                budget || null,
                revenue || null,
                runtime || null,
                poster_url,
                trailer_url || null
            ],
            callback
        );
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM movies WHERE movie_id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    },

    update: (id, movieData, callback) => {
        const {
            movie_id,
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
            poster_url,
            trailer_url
        } = movieData;
        db.query(
            `UPDATE movies SET movie_id = ?, title = ?, description = ?, release_date = ?, genre = ?, director = ?, language = ?, country = ?, budget = ?, revenue = ?, runtime = ?, poster_url = ?, trailer_url = ? WHERE movie_id = ?`,
            [
                movie_id,
                title,
                description,
                release_date,
                genre,
                director || null,
                language || null,
                country || null,
                budget || null,
                revenue || null,
                runtime || null,
                poster_url,
                trailer_url || null,
                movie_id
            ],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM movies WHERE movie_id = ?', [id], callback);
    }
};

module.exports = Movie;