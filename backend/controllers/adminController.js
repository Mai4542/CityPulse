const Report = require('../models/Report');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalReports = await Report.countDocuments();
    const openReports = await Report.countDocuments({ 
      status: { $in: ['Open', 'Assigned', 'In Progress'] } 
    });
    const closedReports = await Report.countDocuments({ 
      status: { $in: ['Fixed', 'Closed'] } 
    });
    
    const recentReports = await Report.find()
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    const categoryStats = await Report.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalReports,
        openReports,
        closedReports,
        recentReports,
        categoryStats,
        completionRate: totalReports > 0 ? Math.round((closedReports / totalReports) * 100) : 0,
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getReportDetails = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('statusHistory.changedBy', 'firstName lastName');

    if (!report) return next(new AppError('البلاغ غير موجود', 404));

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.assignReport = async (req, res, next) => {
  try {
    const { assignedTo, note } = req.body;
    if (!assignedTo) return next(new AppError('الجهة مطلوبة', 400));

    const report = await Report.findById(req.params.id);
    if (!report) return next(new AppError('البلاغ غير موجود', 404));

    if (report.status === 'Closed' || report.status === 'Fixed') {
      return next(new AppError('لا يمكن تعيين بلاغ مغلق', 400));
    }

    report.assignedTo = assignedTo;
    report.status = 'Assigned';
    report.updatedAt = Date.now();

    report.statusHistory.push({
      status: 'Assigned',
      changedBy: req.user.id,
      note: note || `تم التعيين إلى ${assignedTo}`,
    });

    await report.save();

    res.status(200).json({ success: true, message: `تم التعيين إلى ${assignedTo}`, data: report });
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const reportsOverTime = await Report.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);

    const statusDistribution = await Report.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.status(200).json({ success: true, data: { reportsOverTime, statusDistribution } });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError('المستخدم غير موجود', 404));
    if (user.role === 'admin') return next(new AppError('لا يمكن تعطيل الأدمن', 403));

    user.isActive = isActive;
    await user.save();

    res.status(200).json({ success: true, message: `تم ${isActive ? 'تفعيل' : 'تعطيل'} المستخدم` });
  } catch (error) {
    next(error);
  }
};