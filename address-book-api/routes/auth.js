const { Router } = require('express');

const router = Router();

const authController = require('../controllers/auth');

router.put('/login',authController.login);


router.post('/signup',authController.signup);



module.exports = router;