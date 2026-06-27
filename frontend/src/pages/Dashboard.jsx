import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  FiGrid, FiFileText, FiMenu, FiX, FiPlus,
  FiMapPin, FiChevronLeft, FiClock, FiCheckCircle,
  FiSearch, FiFilter, FiUpload, FiLogOut, FiMap, FiBell, FiUser,
  FiCheck, FiAlertTriangle, FiImage, FiVideo, FiMap as FiMapIcon, FiCamera
} from 'react-icons/fi';
import Settings from '../components/Settings';

 
const REPORTS_DATA = [
  {
    id: '#C-٩٠١',
    title: 'حفرة في طريق المدرسة',
    address: 'شارع السيوف، قليوب',
    status: 'قيد التنفيذ',
    statusType: 'processing',
    progress: 65,
    date: '١٢ يونيو ٢٠٢٦',
    image: null,
  },
  {
    id: '#C-٨٨٩',
    title: 'كسر في ماسورة مياه',
    address: 'شارع الجيش، بنها',
    status: 'مفتوح',
    statusType: 'open',
    progress: 15,
    date: '١١ يونيو ٢٠٢٦',
    image: null,
  },
  {
    id: '#C-٨٤٢',
    title: 'تراكم قمامة أمام العمارة',
    address: 'ميدان القناطر الخيرية',
    status: 'تم الحل',
    statusType: 'resolved',
    progress: 100,
    date: '١٠ يونيو ٢٠٢٦',
    image: null,
  },
  {
    id: '#C-٨١٧',
    title: 'إضاءة طريق معطلة',
    address: 'شارع التحرير، طوخ',
    status: 'تم التعيين',
    statusType: 'assigned',
    progress: 30,
    date: '٩ يونيو ٢٠٢٦',
    image: null,
  },
];

 
const STATUS_STYLES = {
  processing: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', bar: 'bg-amber-500' },
  open: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', bar: 'bg-slate-300' },
  resolved: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', bar: 'bg-emerald-500' },
  assigned: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', bar: 'bg-blue-500' },
};

 
const ReportRow = ({ report }) => {
  const style = STATUS_STYLES[report.statusType] || STATUS_STYLES.open;

  return (
    <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        { }
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <FiImage className="w-5 h-5 text-slate-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="min-w-0">
              <span className="text-xs text-slate-400 font-black ml-1">{report.id}</span>
              <p className="font-black text-base text-slate-800 truncate">{report.title}</p>
            </div>
            <span className={`shrink-0 flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
              {report.status}
            </span>
          </div>

          <p className="text-sm text-slate-400 flex items-center gap-1 mb-2">
            <FiMapPin className="w-3 h-3" />
            {report.address}
          </p>

          {}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${report.progress}%` }}></div>
            </div>
            <span className="text-xs font-black text-slate-500 shrink-0">{report.progress}٪</span>
          </div>
        </div>
      </div>
    </div>
  );
};

 
const DashboardView = ({ setActiveView }) => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-black text-slate-900">أهلاً، أحمد</h1>
        <p className="text-sm text-slate-500 mt-1">الاثنين، ١٢ مايو ٢٠٢٥</p>
      </div>
      <button onClick={() => setActiveView('new-report')} className="flex items-center gap-2 px-4 py-2 text-sm font-black text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm">
        <FiPlus className="w-4 h-4" />
        بلاغ جديد
      </button>
    </div>

    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
        <p className="text-3xl font-black text-slate-900 mb-1">١١</p>
        <p className="text-sm font-bold text-slate-500">إجمالي بلاغاتي</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
        <p className="text-3xl font-black text-slate-900 mb-1">٨</p>
        <p className="text-sm font-bold text-slate-500">تم حلها</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
        <p className="text-3xl font-black text-slate-900 mb-1">٢</p>
        <p className="text-sm font-bold text-slate-500">قيد المعالجة</p>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between">
        <h2 className="font-black text-slate-800 text-base">بلاغاتي الأخيرة</h2>
        <button
          onClick={() => setActiveView('reports')}
          className="text-xs font-black text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          عرض الكل
          <FiChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {REPORTS_DATA.map((report, i) => (
          <ReportRow key={i} report={report} />
        ))}
      </div>
    </div>


    {}
    <div className="mt-4">
      <button onClick={() => setActiveView('new-report')} className="block bg-teal-600 hover:bg-teal-700 text-white rounded-2xl p-5 text-right transition-colors shadow-sm w-full">
        <FiPlus className="w-6 h-6 mb-2" />
        <p className="font-black text-base">بلاغ جديد</p>
        <p className="text-teal-200 text-xs mt-0.5">سجّل مشكلة في منطقتك</p>
      </button>
    </div>
  </div>
);

 
const ReportsView = ({ setActiveView }) => {
  const [search, setSearch] = useState('');
  const filtered = REPORTS_DATA.filter(r => r.title.includes(search) || r.address.includes(search) || r.id.includes(search));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">سجل البلاغات</h2>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <FiSearch className="text-slate-400" />
        <input
          type="text"
          placeholder="ابحث في البلاغات..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-800 text-sm w-full font-semibold"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.length > 0 ? (
            filtered.map((report, i) => <ReportRow key={i} report={report} />)
          ) : (
            <div className="text-center py-10 text-slate-500 font-bold">لا توجد بلاغات مطابقة</div>
          )}
        </div>
      </div>
    </div>
  );
};

 
const NewReportView = ({ setActiveView }) => {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCat, setSelectedCat] = useState('roads');

  const STEPS = ["الموقع والفئة", "التفاصيل والصور", "المراجعة والإرسال"];

  const CATS = [
    { id: 'roads', label: 'طرق وأرصفة', color: 'text-orange-600 bg-orange-50 border-orange-200', sel: 'bg-orange-600 text-white border-orange-600' },
    { id: 'water', label: 'مياه وصرف', color: 'text-blue-600 bg-blue-50 border-blue-200', sel: 'bg-blue-600 text-white border-blue-600' },
    { id: 'electric', label: 'كهرباء وإنارة', color: 'text-amber-600 bg-amber-50 border-amber-200', sel: 'bg-amber-500 text-white border-amber-500' },
    { id: 'clean', label: 'نظافة وتجميل', color: 'text-green-600 bg-green-50 border-green-200', sel: 'bg-green-600 text-white border-green-600' },
    { id: 'danger', label: 'مخاطر أخرى', color: 'text-red-600 bg-red-50 border-red-200', sel: 'bg-red-600 text-white border-red-600' },
    { id: 'infra', label: 'بنية تحتية', color: 'text-purple-600 bg-purple-50 border-purple-200', sel: 'bg-purple-600 text-white border-purple-600' },
  ];

  const CITIES = ['قليوب', 'بنها', 'شبرا الخيمة', 'القناطر', 'كفر شكر', 'طوخ'];

  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-6 -m-4 md:-m-8">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">تم إرسال بلاغك بنجاح!</h2>
          <p className="text-slate-500 mb-6">رقم البلاغ: <span className="font-black text-teal-700 text-lg">#C-٩٠١</span></p>
          <div className="bg-slate-50 rounded-2xl p-5 text-right mb-6 space-y-3">
            {[
              { label: 'الفئة', value: 'طرق وأرصفة' },
              { label: 'الموقع', value: 'شارع السيوف، قليوب' },
              { label: 'الأولوية المتوقعة', value: 'هام', cls: 'text-amber-600' },
              { label: 'وقت الاستجابة المتوقع', value: '١–٣ أيام عمل', cls: 'text-teal-700' },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{r.label}</span>
                <span className={`font-bold text-slate-800 ${r.cls || ''}`}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl p-3 text-right mb-6">
            <FiCheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <p className="text-xs text-teal-700">ستصلك رسالة نصية عند تحديث حالة البلاغ</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setIsSuccess(false); setStep(0); }} className="w-full py-3 text-sm font-black text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors">
              تقديم بلاغ آخر
            </button>
            <button onClick={() => setActiveView('dashboard')} className="w-full py-3 text-sm font-black text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              العودة للوحة التحكم
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 animate-in fade-in duration-300 -m-4 md:-m-8">
      { }
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : setActiveView('dashboard')} className="text-slate-500 hover:text-slate-800 transition-colors">
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-black text-slate-900">تقديم بلاغ جديد</h1>
            <p className="text-xs text-slate-400">محافظة القليوبية — CityPulse</p>
          </div>
        </div>
        { }
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center gap-1.5 flex-1">
                <div className={`flex items-center gap-1.5 text-xs font-black transition-colors ${i <= step ? 'text-teal-700' : 'text-slate-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all shrink-0 ${i < step ? 'bg-teal-600 border-teal-600 text-white' : i === step ? 'border-teal-600 text-teal-600 bg-white' : 'border-slate-300 text-slate-400'}`}>
                    {i < step ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded transition-all ${i < step ? 'bg-teal-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 space-y-6">

        { }
        {step === 0 && (
          <div className="space-y-6">
            { }
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative h-56 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-800">
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 320 224">
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="224" stroke="white" strokeWidth="0.5" />)}
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map(y => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="white" strokeWidth="0.5" />)}
                  <circle cx="160" cy="112" r="40" fill="none" stroke="#2dd4bf" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="160" cy="112" r="70" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.3" />
                  <rect x="60" y="40" width="60" height="30" fill="#134e4a" rx="2" />
                  <rect x="150" y="20" width="80" height="20" fill="#134e4a" rx="2" />
                  <rect x="80" y="100" width="40" height="50" fill="#134e4a" rx="2" />
                  <rect x="200" y="80" width="70" height="40" fill="#134e4a" rx="2" />
                  <rect x="180" y="140" width="50" height="60" fill="#134e4a" rx="2" />
                </svg>
                 
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-red-500 mx-auto" />
                </div>
              
                <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1">
                  <FiMapPin className="w-3 h-3 text-teal-600" />
                  شارع السيوف، قليوب
                </div>
                
                <div className="absolute top-3 left-3">
                  <button className="bg-white shadow-sm rounded-lg px-3 py-1.5 text-xs font-black text-teal-700 flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5" />
                    موقعي الحالي
                  </button>
                </div>
              </div>
             
              <div className="p-4">
                <label className="block text-sm font-black text-slate-700 mb-2">أو اكتب العنوان يدوياً</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="مثال: ميدان محطة القناطر الخيرية" className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500" />
                  <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-teal-500 bg-white">
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-black text-slate-800 mb-4">نوع المشكلة</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATS.map(c => (
                  <button key={c.id} onClick={() => setSelectedCat(c.id)}
                    className={`p-4 rounded-xl border-2 text-right transition-all ${selectedCat === c.id ? c.sel : `bg-white border-slate-100 ${c.color}`}`}>
                    <p className="font-bold text-sm">{c.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep(1)} className="w-full py-4 text-base font-black text-white bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors shadow-md">
              التالي — إضافة التفاصيل والصور
            </button>
          </div>
        )}

        
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h2 className="font-black text-slate-800">وصف المشكلة</h2>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">اشرح المشكلة بالتفصيل</label>
                <textarea rows={4} placeholder="مثال: توجد حفرة كبيرة في منتصف الطريق أمام المدرسة تُشكّل خطراً على المارة والسيارات، خاصةً في الليل..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 resize-none" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-400">وصف تفصيلي يسرّع المعالجة</p>
                  <p className="text-xs text-slate-400">٠ / ٥٠٠</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">هل تتكرر هذه المشكلة؟</label>
                <div className="flex gap-3">
                  {['نعم، متكررة', 'لأول مرة', 'غير متأكد'].map(opt => (
                    <button key={opt} className="flex-1 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-teal-400 hover:text-teal-700 transition-colors">{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-black text-slate-800">الصور والمرفقات</h2>
                <span className="text-xs text-slate-400 font-bold">اختياري (يُنصح به)</span>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-teal-400 transition-colors cursor-pointer mb-4 group">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-100 transition-colors">
                  <FiImage className="w-7 h-7 text-teal-600" />
                </div>
                <p className="text-sm font-black text-slate-700 mb-1">التقط صورة أو ارفع من الاستوديو</p>
                <p className="text-xs text-slate-400">PNG, JPG, HEIC — حتى ١٠ ميجابايت</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ g: 'from-slate-700 to-slate-900' }, { g: 'from-teal-800 to-slate-800' }].map((p, i) => (
                  <div key={i} className={`relative h-20 rounded-xl bg-gradient-to-br ${p.g} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiImage className="w-6 h-6 text-white/40" />
                    </div>
                  </div>
                ))}
                <div className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-teal-400 transition-colors">
                  <span className="text-2xl text-slate-300">+</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">رجوع</button>
              <button onClick={() => setStep(2)} className="flex-1 py-4 text-base font-black text-white bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors shadow-md">التالي — مراجعة البلاغ</button>
            </div>
          </div>
        )}

     
        {step === 2 && (
          <div className="space-y-5">
           
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-teal-700 p-5 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-teal-200 text-xs font-bold mb-1">رقم البلاغ المتوقع</p>
                    <h3 className="text-2xl font-black">#C-٩٠١</h3>
                  </div>
                  <span className="bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full">أولوية هامة</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: 'الفئة', value: 'طرق وأرصفة' },
                  { label: 'الموقع', value: 'شارع السيوف، قليوب' },
                  { label: 'المركز', value: 'قليوب' },
                  { label: 'درجة الخطورة', value: 'متوسطة' },
                  { label: 'الصور المرفقة', value: '٢ صورة' },
                  { label: 'الجهة المختصة', value: 'أعمال عامة — القليوبية' },
                  { label: 'وقت المعالجة المتوقع', value: '١–٣ أيام عمل' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-bold">{r.label}</span>
                    <span className="text-sm font-black text-slate-800">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="font-black text-slate-700 mb-1">تنبيه قبل الإرسال</p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">ستتلقى رسالة نصية على رقمك عند قبول البلاغ وعند كل تحديث. البلاغات الكاذبة تعرض صاحبها للمساءلة القانونية وفقاً للتشريعات المصرية.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">رجوع</button>
              <button onClick={() => setIsSuccess(true)} className="flex-1 py-4 text-base font-black text-white bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors shadow-md shadow-teal-100">
                إرسال البلاغ نهائياً
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};



 
export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: 'dashboard', label: 'لوحتي', icon: FiGrid },
    { key: 'reports', label: 'بلاغاتي', icon: FiFileText, badge: '٤' },
    { key: 'settings', label: 'ملفي', icon: FiUser },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc]" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
    
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

 
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-100 flex flex-col transition-transform duration-300 shadow-2xl lg:shadow-none
        lg:relative lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-sm">
              CP
            </div>
            <div>
              <h2 className="text-slate-900 font-black text-base leading-none">CityPulse</h2>
              <p className="text-teal-600 text-[10px] font-bold mt-1">محافظة القليوبية</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400">
            <FiX className="text-xl" />
          </button>
        </div>

        
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-2 border-teal-100 flex items-center justify-center text-slate-500 font-black text-lg">
                أ
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm">أحمد محمد السيد</p>
              <p className="text-xs text-teal-600 font-bold">مواطن نشط</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-3">
          {navLinks.map(link => {
            const active = activeView === link.key;
            return (
              <button
                key={link.key}
                onClick={() => { setActiveView(link.key); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-right ${active
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {link.label}
                {link.badge && (
                  <span className={`mr-auto text-[10px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
 
        <div className="p-4 border-t border-slate-100">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={() => alert("تم تسجيل الخروج")}
          >
            <FiLogOut className="text-lg" />
            تسجيل الخروج
          </button>
        </div>
      </aside>
 
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="lg:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-slate-600 p-1">
            <FiMenu className="text-xl" />
          </button>
          <span className="text-slate-900 font-black text-sm">CityPulse</span>
          <div className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-black text-xs">أحمد</div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f8fafc]">
          <div className={activeView === 'new-report' ? "max-w-3xl mx-auto" : "w-full"}>
            {activeView === 'dashboard' && <DashboardView setActiveView={setActiveView} />}
            {activeView === 'reports' && <ReportsView setActiveView={setActiveView} />}
            {activeView === 'new-report' && <NewReportView setActiveView={setActiveView} />}
            {activeView === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}
