const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const userController = require('../controllers/user.controller');
const upload = require('../middleware/multer');

// Authentication routes
router.get('/login', userController.getlogin);
router.post('/login', userController.postlogin);
router.get('/register', userController.getregister);
router.post('/register', userController.postregister);
router.get('/logout', userController.logout);
router.get('/home', userController.gethome);
router.get('/index', userController.IndexPage);

// Admin routes
router.get('/dashboard', userController.getdashboard);
router.get('/movies', movieController.listMovies);
router.post('/movies', upload.single('poster'), movieController.createMovie);
router.get('/movies/:id', movieController.showMovie);
router.get('/movies/:id/edit', movieController.showEditForm);
router.post('/movies/:id', upload.single('poster'), movieController.updateMovie);
router.post('/movies/:id/delete', movieController.deleteMovie);

// User routes
router.get('/user/dashboard', userController.getUserDashboard);

module.exports = router;