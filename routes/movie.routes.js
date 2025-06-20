 const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const upload = require('../middleware/multer');

// Safe routes only
router.get('/admin/movies', movieController.listMovies);
router.get('/admin/movies/create', movieController.showCreateForm);
router.post('/admin/movies', upload.single('poster'), movieController.createMovie);
router.post('/admin/movies/:id/delete', movieController.deleteMovie);

// Optional: only if showMovie & showEditForm are implemented
// router.get('/admin/movies/:id', movieController.showMovie);
// router.get('/admin/movies/:id/edit', movieController.showEditForm);

module.exports = router;
