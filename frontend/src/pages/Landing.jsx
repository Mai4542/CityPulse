import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AuthRequiredModal from "../components/AuthRequiredModal";
const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCreateReportClick = () => {
    if (user) {
      navigate("/report");
    } else {
      setShowAuthModal(true);
    }
  };
  return (
    <>
      <div dir="rtl" className="min-h-screen font-main bg-white text-slate-900">
        <nav className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-black text-lg">
                CP
              </div>
              <div className="leading-tight">
                <span className="font-black text-primary-dark text-lg block leading-none">
                  CityPulse
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider">
                  محافظة القليوبية
                </span>
              </div>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                المميزات
              </a>
              <a
                href="#"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                كيف يعمل
              </a>
              <a
                href="#"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                آراء المواطنين
              </a>
              <Link
                to="/faq"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                الأسالة الشائعة
              </Link>
              <a
                href="#"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                تواصل معنا
              </a>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                ابدأ الآن
              </Link>
            </div>
            <button className="md:hidden text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu w-6 h-6"
                aria-hidden="true"
              >
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            </button>
          </div>
        </nav>
        <section className="pt-24 pb-20 px-6 bg-gradient-to-br from-slate-900 via-primary-darker to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt=""
              className="w-full h-full object-cover opacity-20"
              src="/images/hero-city.png"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-primary-darker/70 to-slate-900/90"></div>
          </div>
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-info rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-teal-400/10 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-teal-400/30 backdrop-blur mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <line x1="3" x2="21" y1="22" y2="22"></line>
                <line x1="6" x2="6" y1="18" y2="11"></line>
                <line x1="10" x2="10" y1="18" y2="11"></line>
                <line x1="14" x2="14" y1="18" y2="11"></line>
                <line x1="18" x2="18" y1="18" y2="11"></line>
                <polygon points="12 2 20 7 4 7"></polygon>
              </svg>
              منصة القليوبية الرقمية لإدارة البلاغات
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              صوتك يبني<span className="block text-primary mt-1">محافظتك</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              منصة ذكية تمكّن مواطني القليوبية من الإبلاغ عن مشكلات البنية
              التحتية، وتمنح الإدارة أدوات متطورة لمتابعة الحلول وقياس الأداء
              بشفافية كاملة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={handleCreateReportClick}
                className="w-full sm:w-auto cursor-pointer px-8 py-4 text-lg font-black text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                ابدأ الإبلاغ الآن
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-slate-200 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors backdrop-blur">
                شاهد كيف يعمل
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-primary">
                  ١٢,٨٤٠
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  بلاغ منذ الإطلاق
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-emerald-600">
                  ٨٩٪
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  معدل الحل الناجح
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-info">٢.٤</div>
                <div className="text-xs text-slate-400 font-bold">
                  ساعة متوسط الاستجابة
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-warning">٧</div>
                <div className="text-xs text-slate-400 font-bold">
                  مراكز مُغطّاة
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                التأثير الحقيقي
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                من البلاغ إلى الحل
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                آلاف المشاكل تم حلها بفضل مواطنين فاعلين ومنصة ذكية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="طرق نظيفة وآمنة"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/street-clean.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">طرق نظيفة وآمنة</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    بعد كل بلاغ وكل إصلاح
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="فرق متخصصة سريعة الاستجابة"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/workers-team.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">
                    فرق متخصصة سريعة الاستجابة
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">
                    ٤٣ موظف في ٥ أقسام
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="قبل وبعد"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/before-after.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">قبل وبعد</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    التحول الذي يصنعه كل بلاغ
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٨٩٪
                </div>
                <div className="text-xs font-black text-slate-700">
                  معدل الحل الناجح
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  من إجمالي البلاغات
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٢.٤ ساعة
                </div>
                <div className="text-xs font-black text-slate-700">
                  متوسط وقت الاستجابة
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  منذ لحظة البلاغ
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٤٣ موظف
                </div>
                <div className="text-xs font-black text-slate-700">
                  في فرق متخصصة
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ٥ أقسام فنية
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ١٢,٨٤٠
                </div>
                <div className="text-xs font-black text-slate-700">
                  بلاغ مُعالج
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  منذ إطلاق المنصة
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                المميزات
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                كل ما تحتاجه في منصة واحدة
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                نظام متكامل يربط المواطن بالجهة المختصة بسلاسة وشفافية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-teal-50 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-camera w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  إبلاغ لحظي بالصور
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  صوّر المشكلة وأرسل بلاغك في ثوانٍ مع تحديد تلقائي للموقع عبر
                  GPS
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-amber-50 text-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  أولوية ذكية
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  نظام ذكي يحسب درجة الخطورة بناءً على نوع المشكلة وقربها من
                  المدارس والمستشفيات
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-blue-50 text-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  خريطة حرارية حية
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  شاهد توزيع البلاغات على خريطة تفاعلية وتحديد المناطق الأكثر
                  احتياجاً
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-purple-50 text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bell w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  تتبع فوري
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  استقبل إشعارات لحظية عند تحديث حالة بلاغك في كل مرحلة
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-rose-50 text-rose-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chart-column w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="M18 17V9"></path>
                    <path d="M13 17V5"></path>
                    <path d="M8 17v-3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  تحليلات متقدمة
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  لوحة تحكم إدارية شاملة بمؤشرات الأداء وتقارير الاستجابة لكل
                  دائرة
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-emerald-50 text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  مؤشر الخطر العمراني
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  تقييم ديناميكي لمستوى خطورة كل منطقة بناءً على تراكم البلاغات
                  وسرعة الاستجابة
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                كيف يعمل
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                أربع خطوات وبلاغك وصل
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-10 right-[12.5%] left-[12.5%] h-0.5 bg-teal-100 z-0"></div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ١
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  سجّل أو سجّل الدخول
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  أنشئ حسابك بدقيقة واحدة فقط بالاسم والرقم القومي
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٢
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  صوّر وحدد الموقع
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  التقط صورة للمشكلة ويحدد التطبيق موقعك تلقائياً
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٣
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  اختر الفئة وأرسل
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  حدد نوع المشكلة واكتب وصفاً موجزاً ثم أرسل البلاغ
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٤
                </div>
                <h3 className="font-black text-slate-800 mb-2">تابع وقيّم</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  استقبل تحديثات لحظية وقيّم الخدمة بعد الحل
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-[96%] mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                التغطية الجغرافية
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                ٧ مراكز تُغطيها المنصة
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                مراكز محافظة القليوبية كلها داخل شبكة CityPulse
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-red-50 border-danger/30 text-danger transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٣٤٢</div>
                <div className="text-lg font-black leading-tight mb-3">
                  شبرا الخيمة
                </div>
                <div className="text-xs opacity-80 font-bold">
                  92٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "92%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-orange-50 border-orange-300 text-orange-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٩٨</div>
                <div className="text-lg font-black leading-tight mb-3">
                  الخانكة
                </div>
                <div className="text-xs opacity-80 font-bold">
                  71٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "71%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-amber-50 border-warning/30 text-warning transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٥٦</div>
                <div className="text-lg font-black leading-tight mb-3">
                  بنها
                </div>
                <div className="text-xs opacity-80 font-bold">
                  58٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "58%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-yellow-50 border-yellow-300 text-yellow-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٣٤</div>
                <div className="text-lg font-black leading-tight mb-3">
                  قليوب
                </div>
                <div className="text-xs opacity-80 font-bold">
                  45٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "45%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-emerald-50 border-emerald-300 text-emerald-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٨٩</div>
                <div className="text-lg font-black leading-tight mb-3">
                  القناطر
                </div>
                <div className="text-xs opacity-80 font-bold">
                  28٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "28%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-green-50 border-green-300 text-green-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٦٧</div>
                <div className="text-lg font-black leading-tight mb-3">
                  كفر شكر
                </div>
                <div className="text-xs opacity-80 font-bold">
                  22٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "22%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-teal-50 border-primary/30 text-primary transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٤٥</div>
                <div className="text-lg font-black leading-tight mb-3">طوخ</div>
                <div className="text-xs opacity-80 font-bold">
                  15٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "15%", background: "currentColor" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                آراء المواطنين
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                ماذا يقولون عنا؟
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  "بلّغت عن حفرة في شارعنا وتم إصلاحها خلال ٣ أيام فقط! خدمة
                  رائعة."
                </p>
                <div className="flex items-center gap-3">
                  <img
                    alt="سارة عبد الرحمن"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                    src="/images/avatar-sara.png"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm hidden">
                    س
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">
                      سارة عبد الرحمن
                    </p>
                    <p className="text-xs text-slate-400">قليوب</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-slate-200 fill-slate-200"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  "التطبيق سهل جداً في الاستخدام، وأفضل ميزة هي تتبع حالة البلاغ
                  أولاً بأول."
                </p>
                <div className="flex items-center gap-3">
                  <img
                    alt="أحمد مصطفى"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                    src="/images/avatar-ahmed.png"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm hidden">
                    أ
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">
                      أحمد مصطفى
                    </p>
                    <p className="text-xs text-slate-400">بنها</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star w-4 h-4 text-warning fill-warning"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  "فخور بوجود منصة بهذا التطور في محافظتنا. الاستجابة سريعة
                  والفرق محترفة."
                </p>
                <div className="flex items-center gap-3">
                  <img
                    alt="محمود السيد"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                    src="/images/avatar-ahmed.png"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm hidden">
                    م
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">
                      محمود السيد
                    </p>
                    <p className="text-xs text-slate-400">شبرا الخيمة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative overflow-hidden py-24 px-6 text-center">
          <div className="absolute inset-0">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="/images/gov-building.png"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/95 via-primary-darker/85 to-primary/40"></div>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 bg-teal-400/10 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-teal-400/30 backdrop-blur mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <line x1="3" x2="21" y1="22" y2="22"></line>
                <line x1="6" x2="6" y1="18" y2="11"></line>
                <line x1="10" x2="10" y1="18" y2="11"></line>
                <line x1="14" x2="14" y1="18" y2="11"></line>
                <line x1="18" x2="18" y1="18" y2="11"></line>
                <polygon points="12 2 20 7 4 7"></polygon>
              </svg>
              محافظة القليوبية — مشروع التحول الرقمي
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              <span className="block text-white">ابدأ في تحسين</span>
              <span className="block text-primary">محيطك اليوم</span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
              انضم لآلاف مواطني القليوبية الذين يساهمون في بناء محافظة أفضل.
              صوتك يُحدث فرقاً حقيقياً.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur text-center"
              >
                ابدأ الان
              </Link>
              <a
                href="/about"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur text-center"
              >
                تعرّف على المشروع
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <div
        role="region"
        aria-label="Notifications (F8)"
        tabIndex="-1"
        style={{ pointerEvents: "none" }}
      >
        <ol
          tabIndex="-1"
          className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
        ></ol>
      </div>
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() =>
          navigate("/login", { state: { from: { pathname: "/report" } } })
        }
      />
    </>
  );
};

export default Landing;
