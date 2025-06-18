 const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getlogin);
router.post('/login', authController.postlogin);

router.get('/register', authController.getregister);
router.post('/register', authController.postregister);

router.get('/logout', authController.logout);

router.get('/indexpage', authController.gethome);

router.get('/home',authController.IndexPage);


router.get('/dashboard', (req, res) => {
  res.redirect('/admin/dashboard',{title: 'Dashboard', username : req.user?.name});
});
 
router.get('/snippets/view', (req, res) => {
  res.render('snippets/view', { title: 'View Movies' });

  
});

//       return res.status(500).send("Database error.");')
router.get('/admin/dashboard', authController.getdashboard);

router.get('/',(req,res)=> res.redirect('/indexpage'));

router.get('/admin', (req, res) => {
  res.redirect('/admin/dashboard');
});

module.exports = router;
