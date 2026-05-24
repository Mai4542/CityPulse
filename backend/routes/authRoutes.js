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

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes
router.use(protect); // All routes below this will use protect middleware

router.get('/me', getMe);
router.patch('/update-me', updateMe);
router.patch('/update-password', updatePassword);
router.post('/logout', logout);

module.exports = router;