let express = require('express');
let router = express.Router();
let authController = require('../controllers/auth.controller');

router.get('/', authController.getdashboard);
router.get('/login', authController.getlogin);
router.get('/register', authController.getregister);

router.post('/login', authController.postlogin); // Lowercase "l"
router.post('/register', authController.postregister); // Lowercase "r"

module.exports = router;