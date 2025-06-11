let express = reqiure('express');
let router = express.router();
let authController = require('../controllers/auth.controller');

router.get('/', auth.Controller.getdashboard);
router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);

router.post('/login', authController.postlogin);
router.post('/register',  authController.postregister);

module.exports = router;