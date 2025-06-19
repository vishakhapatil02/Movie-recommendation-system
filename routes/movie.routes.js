 const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const upload = require('../middleware/multer'); // ✅ Use the existing multer config

// Main movie routes
router.get('/movies', movieController.listMovies);
router.get('/admin/movies/create', movieController.showCreateForm);
router.post('/admin/movies', upload.single('poster'), movieController.createMovie);
router.get('/admin/movies', movieController.listMovies); // should exist
router.get('/admin/movies/:id', movieController.showMovie);
router.get('/admin/movies/:id/edit', movieController.showEditForm);
router.post('/admin/movies/:id', upload.single('poster'), movieController.updateMovie);
router.post('/admin/movies/:id/delete', movieController.deleteMovie);

// Route to show add form
router.get('/add', (req, res) => {
  res.render('movies/add');
});

router.get('/admin/movies', (req, res) => {
  const success = req.query.success;
  Movie.findAll((err, results) => {
    if (err) return res.status(500).send("Error loading movies");
    res.render('admin_dashboard/dashboard', { movies: results, success });
  });
});

// Route to show a single movie
router.get('/admin/movies/:id', movieController.showMovie);

// Route to handle form submission (for test/demo)
router.post('/add', upload.single('poster'), (req, res) => {
  console.log(req.file);  // ✅ Uploaded file info
  res.send("Movie uploaded!");
});

module.exports = router;
