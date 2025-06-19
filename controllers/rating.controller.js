// controllers/ratings.controller.js
const db = require('../config/db.config');

exports.listRatings = (req, res) => {
  const sql = `
    SELECT r.rating, r.review, u.username, m.title
    FROM ratings r
    JOIN users u ON r.user_id = u.user_id
    JOIN movies m ON r.movie_id = m.movie_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send('DB error');
    res.render('ratings/view', { ratings: results });
  });
};
exports.addRating = (req, res) => {
  const { movie_id, rating, review } = req.body;
  const user_id = req.user.user_id; // Assuming user ID is stored in req.user

  const sql = 'INSERT INTO ratings (movie_id, user_id, rating, review) VALUES (?, ?, ?, ?)';
  db.query(sql, [movie_id, user_id, rating, review], (err) => {
    if (err) return res.status(500).send('DB error');
    res.redirect('/ratings');
  });
};