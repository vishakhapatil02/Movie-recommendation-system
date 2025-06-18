 const express = require('express');
const router = express.Router();

router.get('/partials/movies', (req, res) => {
  res.render('snippets/movies');
});

router.get('/partials/watchlist', (req, res) => {
  res.render('snippets/watchlist');
});

router.get('/partials/ratings', (req, res) => {
  res.render('snippets/ratings');
});

router.get('/partials/profile', (req, res) => {
  res.render('snippets/profile');
});

router.get('/partials/movies', (req, res) => res.render('snippets/movies'));
router.get('/partials/watchlist', (req, res) => res.render('snippets/watchlist'));
router.get('/partials/ratings', (req, res) => res.render('snippets/ratings'));              
router.get('/partials/profile', (req, res) => res.render('snippets/profile'));


module.exports = router;
