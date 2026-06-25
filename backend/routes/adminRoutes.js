const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const reportController = require('../controllers/report.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect, restrictTo('admin'));

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/analytics', adminController.getAnalytics);
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/status', adminController.toggleUserStatus);
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', adminController.getReportDetails);
router.patch('/reports/:id/status', reportController.updateReportStatus);
router.patch('/reports/:id/assign', adminController.assignReport);
router.delete('/reports/:id', reportController.deleteReport);

module.exports = router;