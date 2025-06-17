const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); 


// routes

router.get('/home', authController.gethome);
router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);
router.get('/', authController.getdashboard);

// POST routes
router.post('/login', authController.postlogin);
router.post('/register', authController.postregister);
router.post('/home', authController.posthome);

module.exports = router;
