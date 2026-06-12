const reports = [
  { id: 'C-892', category: 'كسر ماسورة مياه', location: 'شارع الجيش، بنها', priority: 'عاجل', dept: 'مياه القليوبية', status: 'قيد المعالجة' },
  { id: 'C-891', category: 'تراكم قمامة', location: 'شارع السيوف، قليوب', priority: 'عادي', dept: 'النظافة', status: 'مفتوح' },
  { id: 'C-889', category: 'انقطاع تيار كهربائي', location: 'حي الزهور، شبرا', priority: 'عاجل', dept: 'كهرباء القليوبية', status: 'تم الحل' },
  { id: 'C-888', category: 'حفرة في الطريق', location: 'طريق مصر الإسكندرية', priority: 'هام', dept: 'أعمال عامة', status: 'مفتوح' },
]

const statusStyle = {
  'مفتوح':        { color: 'var(--color-info)' },
  'قيد المعالجة': { color: 'var(--color-warning)' },
  'تم الحل':      { color: 'var(--color-primary)' },
}

const priorityStyle = {
  'عاجل': { bg: '#FEE2E2', color: 'var(--color-danger)' },
  'هام':  { bg: '#FEF3C7', color: 'var(--color-warning)' },
  'عادي': { bg: '#F3F4F6', color: '#4B5563' },
}

export default function ReportsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex-1 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-bold text-gray-800 text-xl">أحدث البلاغات</h2>
          <p className="text-sm text-gray-400 mt-0.5">البلاغات الواردة التي تتطلب إجراء</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            تصفية
          </button>
          <button
            className="text-sm px-4 py-2 rounded-lg transition font-semibold"
            style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f766e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0d9488'}
          >
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-right">
        <thead>
          <tr className="text-gray-400 border-b">
            {['رقم', 'الفئة', 'الموقع', 'الأولوية', 'الجهة المسؤولة', 'الحالة'].map((h) => (
              <th key={h} className="pb-3 font-medium text-base">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-3 text-gray-400 text-base">{r.id}</td>
              <td className="py-3 font-semibold text-gray-800 text-base">{r.category}</td>
              <td className="py-3 text-gray-500 text-base">{r.location}</td>
              <td className="py-3">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: priorityStyle[r.priority].bg,
                    color: priorityStyle[r.priority].color,
                  }}
                >
                  {r.priority}
                </span>
              </td>
              <td className="py-3 text-gray-500 text-base">{r.dept}</td>
              <td
                className="py-3 font-semibold text-base"
                style={{ color: statusStyle[r.status].color }}
              >
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}