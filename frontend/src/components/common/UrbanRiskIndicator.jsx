const urbanRisk = [
  { name: 'شبرا الخيمة', level: 'عالي جداً', percent: 95 },
  { name: 'بنها', level: 'متوسط', percent: 65 },
  { name: 'قليوب', level: 'متوسط', percent: 55 },
  { name: 'القناطر الخيرية', level: 'منخفض', percent: 30 },
  { name: 'كفر شكر', level: 'آمن', percent: 15 },
]

const levelStyle = {
  'عالي جداً': { color: '#DC2626', bar: '#DC2626' },
  'متوسط':     { color: '#D97706', bar: '#D97706' },
  'منخفض':     { color: '#0d9488', bar: '#0d9488' },
  'آمن':       { color: '#0f766e', bar: '#0f766e' },
}

export default function UrbanRiskIndicator() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex-1">

      <h2 className="font-bold text-gray-800 text-base">مؤشر الخطر العمراني</h2>
      <p className="text-xs text-gray-400 mt-0.5 mb-6">
        تصنيف المراكز حسب تراكم البلاغات والأولوية
      </p>

      <div className="space-y-5">
        {urbanRisk.map((area) => (
          <div key={area.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold" style={{ color: levelStyle[area.level].color }}>
                {area.level}
              </span>
              <span className="text-gray-700">{area.name}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${area.percent}%`,
                  backgroundColor: levelStyle[area.level].bar,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}