const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const upload = require('../middleware/multer');

router.get('/movies', movieController.listMovies);
router.get('/admin/movies/create', movieController.showCreateForm);
router.post('/admin/movies', upload.single('poster'), movieController.createMovie);
router.get('/admin/movies/:id', movieController.showMovie);
router.get('/admin/movies/:id/edit', movieController.showEditForm);
router.post('/admin/movies/:id', upload.single('poster'), movieController.updateMovie);
router.post('/admin/movies/:id/delete', movieController.deleteMovie);

module.exports = router;

