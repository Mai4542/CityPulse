const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateMe,
  updatePassword,
  logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../utils/validation');


router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);


router.use(protect); 

router.get('/me', getMe);
router.patch('/update-me', updateMe);
router.patch('/update-password', updatePassword);
router.post('/logout', logout);

module.exports = router;