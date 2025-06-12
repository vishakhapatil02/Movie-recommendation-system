const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// r 'index.ejs'
router.get('/', authController.getdashboard);

// Auth pages
router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);
router.get('/home', authController.gethome);

// Form submissions
router.post('/login', authController.postlogin);
router.post('/register', authController.postregister);
router.post('/home', authController.posthome);

module.exports = router;
