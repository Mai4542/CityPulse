

const calculatePriority = require('./priorityScore');


const testReport1 = {
  severity: 'عالية / طارئ',
  reportsCount: 5,
  createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  nearHospital: true,
  nearSchool: true,
  isRecurring: 'نعم، متكررة',
};

const testReport2 = {
  severity: 'منخفضة',
  reportsCount: 20,
  createdAt: new Date(), 
  nearHospital: true,
  nearSchool: true,
  isRecurring: 'لأول مرة',
};

console.log(' بلاغ خطير:', calculatePriority(testReport1), '/ 100');
console.log('بلاغ عادي:', calculatePriority(testReport2), '/ 100');