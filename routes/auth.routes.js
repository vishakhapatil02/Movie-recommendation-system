 const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

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
router.get('/admin/dashboard', authController.getAdminDashboard);
router.get('/user/dashboard', authController.getUserDashboard);


// Redirect root to /indexpage
router.get('/', (req, res) => res.redirect('/indexpage'));

 

// user_dashboard
router.get('/user/dashboard', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/user');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role === 'USER') {
      res.render('user_dashboard/dashboard', { username: decoded.username });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
});
// Admin dashboard route
router.get('/admin/dashboard', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/admin');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role === 'ADMIN') {
      res.render('admin_dashboard/dashboard', { username: decoded.username });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
});

module.exports = router;
