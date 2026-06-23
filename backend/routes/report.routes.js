const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload.middleware');


router.post('/', protect, upload.array('images', 5), reportController.createReport);
router.get('/my-reports', protect, reportController.getMyReports);
router.get('/:id', protect, reportController.getReportById);
router.delete('/:id', protect, reportController.deleteReport);

router.get('/', protect, restrictTo('admin'), reportController.getAllReports);
router.patch('/:id/status', protect, restrictTo('admin'), reportController.updateReportStatus);
router.patch('/:id/rate', protect, reportController.rateReport); 
module.exports = router;