const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getlogin);
router.post('/login', authController.postlogin);

router.get('/register', authController.getregister);
router.post('/register', authController.postregister);

router.get('/logout', authController.logout);

router.get('/indexpage', authController.gethome);
router.get('/home', authController.IndexPage);

// Route for the protected dashboard
router.get('/admin/dashboard', authController.getdashboard);

router.get('/', (req, res) => res.redirect('/indexpage'));

module.exports = router;
