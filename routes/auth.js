const { Router } = require('express');
const { check } = require('express-validator');

const { loginController } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(), 
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],loginController);

module.exports = router;