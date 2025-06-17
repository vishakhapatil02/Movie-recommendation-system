const db = require('../config/db.config');

const Movie = {
  findAll: (callback) => {
    db.query('SELECT * FROM movies', callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM movies WHERE movie_id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO movies SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE movies SET ? WHERE movie_id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM movies WHERE movie_id = ?', [id], callback);
  }
};

module.exports = Movie;