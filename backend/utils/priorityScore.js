const calculatePriority = (report) => {


    const severityMap = {
        'منخفضة': 1,
        'متوسطة': 3,
        'عالية / طارئ': 5,
    };
    const severityValue = severityMap[report.severity] || 1;
    const severityScore = (severityValue / 5) * 40;


    const countScore = Math.min(report.reportsCount * 4, 20);

const daysWaiting = (Date.now() - new Date(report.createdAt)) / (1000 * 60 * 60 * 24);
    let timeScore = 0;
    if (daysWaiting >= 7) timeScore = 20;     
    else if (daysWaiting >= 3) timeScore = 12;
    else if (daysWaiting >= 1) timeScore = 6;  
    else timeScore = 0;                         


    let locationScore = 0;
    if (report.nearHospital) locationScore += 7;
    if (report.nearSchool) locationScore += 5;
    locationScore = Math.min(locationScore, 10);


    const recurringScore = report.isRecurring === 'نعم، متكررة' ? 10 : 0;

    const totalScore = severityScore + countScore + timeScore + locationScore + recurringScore;

    return Math.round(totalScore);
};

module.exports = calculatePriority;