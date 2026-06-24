import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

const stats = [
  { title: 'إجمالي البلاغات', value: '١٬٢٨٤', change: '+١٢٪', positive: true, sub: 'مقارنة بالشهر الماضي' },
  { title: 'بلاغات معلقة', value: '١٥٦', change: '+٣٠٪', positive: false, sub: 'تتطلب تدخل سريع' },
  { title: 'تم الحل (هذا الأسبوع)', value: '٣٤٢', change: '٨٩٪', positive: true, sub: 'معدل إنجاز المهام' },
  { title: 'متوسط وقت الاستجابة', value: '٢.٤ ساعة', change: '-١٥٪', positive: true, sub: 'أسرع من المعدل المستهدف' },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((card) => (
        <div key={card.title} className="bg-white rounded-xl p-7 shadow-sm">

          <div className="text-sm text-gray-500 mb-2">
            {card.title}
          </div>

          <div className="text-4xl font-bold text-gray-800 my-3">
            {card.value}
          </div>

          <div
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: card.positive ? 'var(--color-primary)' : 'var(--color-danger)' }}
          >
            {card.positive
              ? <TrendingUpIcon fontSize="small" />
              : <TrendingDownIcon fontSize="small" />
            }
            {card.change}
          </div>

          <div className="text-xs text-gray-400 mt-1">
            {card.sub}
          </div>

        </div>
      ))}
    </div>
  )
}