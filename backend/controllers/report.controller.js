const cloudinary = require('cloudinary').v2;
const Report = require('../models/Report');
const calculatePriority = require('../utils/priorityScore');
const AppError = require('../utils/AppError');

exports.createReport = async (req, res, next) => {
  
  try {
    if (req.user.role === 'admin') {
      return next(new AppError('الأدمن لا يمكنه إنشاء بلاغات', 403));
    }
    const {
      description,
      category,
      severity,
      isRecurring,
      location,
      nearHospital,
      nearSchool,
    } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];

    const report = new Report({
      userId: req.user.id,
      description,
      category,
      severity,
      isRecurring,
      location,
      images,
      nearHospital: nearHospital || false,
      nearSchool: nearSchool || false,
    });

    report.priorityScore = calculatePriority(report);

    report.statusHistory.push({
      status: 'Open',
      changedBy: req.user.id,
      note: 'تم إنشاء البلاغ',
    });

    await report.save();

    res.status(201).json({
      success: true,
      message: 'تم إرسال البلاغ بنجاح',
      data: report,
    });

  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        cloudinary.uploader.destroy(file.filename);
      });
    }
    next(error);
  }
};

exports.getMyReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });

  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('userId', 'firstName lastName email');

    if (!report) {
      return next(new AppError('البلاغ غير موجود', 404));
    }

    if (req.user.role !== 'admin' && report.userId._id.toString() !== req.user.id) {
      return next(new AppError('مش مسموحلك تشوف البلاغ ده', 403));
    }

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {
    next(error);
  }
};

exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate('userId', 'firstName lastName email')
      .sort({ priorityScore: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });

  } catch (error) {
    next(error);
  }
};

exports.updateReportStatus = async (req, res, next) => {
  try {
    const { status, note, assignedTo } = req.body;

    const STATUS_FLOW = {
      Open: ['Assigned'],
      Assigned: ['In Progress'],
      'In Progress': ['Fixed'],
      Fixed: ['Closed'],
      Closed: [],
    };

    const validStatuses = Object.keys(STATUS_FLOW);
    if (!validStatuses.includes(status)) {
      return next(new AppError('حالة البلاغ غير صحيحة', 400));
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return next(new AppError('البلاغ غير موجود', 404));
    }

    const allowedNext = STATUS_FLOW[report.status];
    if (!allowedNext.includes(status)) {
      return next(
        new AppError(
          `لا يمكن تغيير الحالة من "${report.status}" إلى "${status}" مباشرة`,
          400
        )
      );
    }

    report.status = status;
    if (assignedTo) report.assignedTo = assignedTo;

    report.statusHistory.push({
      status,
      changedBy: req.user.id,
      note: note || `تم تغيير الحالة إلى ${status}`,
    });

    await report.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث حالة البلاغ بنجاح',
      data: report,
    });

  } catch (error) {
    next(error);
  }
};