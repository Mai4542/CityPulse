const Report = require('../models/Report');
const calculatePriority = require('../utils/priorityScore');


const updateReportPriority = async (reportId) => {
  const report = await Report.findById(reportId);
  
  if (!report) throw new Error('البلاغ غير موجود');
  
  report.priorityScore = calculatePriority(report);
  await report.save();
  
  return report;
};


const updateAllPriorityScores = async () => {
  const reports = await Report.find({ 
    status: { $ne: 'Closed' } 
 
  });
  
  let updated = 0;
  
  for (const report of reports) {
    report.priorityScore = calculatePriority(report);
    await report.save();
    updated++;
  }
  
  return { message: `تم تحديث ${updated} بلاغ` };
};


const getReportsByPriority = async () => {
  const reports = await Report.find({ 
    status: { $ne: 'Closed' } 
  })
  .sort({ priorityScore: -1 }) 
  .populate('userId', 'firstName lastName');
  
  return reports;
};

module.exports = {
  updateReportPriority,
  updateAllPriorityScores,
  getReportsByPriority,
};