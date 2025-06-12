const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// r 'index.ejs'
router.get('/', authController.getdashboard);

// Auth pages
router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);

// Form submissions
router.post('/login', authController.postlogin);
router.post('/register', authController.postregister);

module.exports = router;
