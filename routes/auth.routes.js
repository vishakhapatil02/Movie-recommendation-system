const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Login & Register Routes
router.get('/login', authController.getlogin);
router.post('/login', authController.postlogin);

router.get('/register', authController.getregister);
router.post('/register', authController.postregister);

// Logout Route
router.get('/logout', authController.logout);

// Pages
router.get('/indexpage', authController.gethome);
router.get('/home', authController.IndexPage);

// Admin Dashboard (Protected)
router.get('/admin/dashboard', authController.getdashboard);

// Redirect root to /indexpage
router.get('/', (req, res) => res.redirect('/indexpage'));

// Redirect /admin to /admin/dashboard
router.get('/admin', (req, res) => res.redirect('/admin/dashboard'));

// View Snippets (Movies)
router.get('/snippets/view', (req, res) => {
  res.render('snippets/view', { title: 'View Movies' });
});

module.exports = router;
