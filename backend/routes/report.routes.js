const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload.middleware');


router.use(protect);

router.post('/', upload.array('images', 5), reportController.createReport);
router.get('/my-reports', reportController.getMyReports);
router.get('/:id', reportController.getReportById);
router.patch('/:id/rate', reportController.rateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;