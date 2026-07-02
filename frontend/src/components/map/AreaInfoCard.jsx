export default function AreaInfoCard({ area, onClose }) {
  if (!area) return null

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 absolute top-6 left-6 z-[1000] w-64">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-base">نظرة عامة على المنطقة</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition text-xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Area Name */}
      <div className="text-lg font-bold mb-4" style={{ color: area.color }}>
        {area.name}
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">البلاغات النشطة</span>
          <span className="font-bold text-sm" style={{ color: area.color }}>
            {area.reports}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">معدل الحل</span>
          <span className="font-bold text-sm text-gray-800">
            {area.resolutionRate}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">مستوى الخطر</span>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: area.color + '20', color: area.color }}
          >
            {area.risk}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full mt-4 py-2 rounded-lg text-sm font-semibold text-white transition"
        style={{ backgroundColor: 'var(--color-primary)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
      >
        عرض التقرير الكامل
      </button>

    </div>
  )
}