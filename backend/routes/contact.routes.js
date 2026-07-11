const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', contactController.submitContact);

router.use(protect);
router.use(restrictTo('admin'));
router.get('/', contactController.getAllContacts);
router.patch('/:id/read', contactController.markAsRead);
router.patch('/:id/replied', contactController.toggleReplied);

module.exports = router;