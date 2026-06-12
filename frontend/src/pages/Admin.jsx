import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiMenu, FiX, FiBell } from 'react-icons/fi';

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-theme-text mb-6">نظرة عامة على لوحتي</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'إجمالي البلاغات', value: '150', color: 'text-primary' },
          { label: 'بلاغات قيد المعالجة', value: '45', color: 'text-warning' },
          { label: 'بلاغات مكتملة', value: '105', color: 'text-primary-dark' },
          { label: 'تنبيهات جديدة', value: '3', color: 'text-danger' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-theme-card p-6 rounded-2xl border border-theme-border flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-theme-muted text-sm font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-theme-card rounded-2xl border border-theme-border p-6 min-h-[300px] flex items-center justify-center shadow-sm">
        <p className="text-theme-muted">مساحة لعرض الإحصائيات أو الرسوم البيانية هنا</p>
      </div>
    </div>
  );
};

const ReportsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-theme-text">قائمة البلاغات</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          + بلاغ جديد
        </button>
      </div>
      
      <div className="bg-theme-card rounded-2xl border border-theme-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-theme-border">
                <th className="p-4 text-sm font-medium text-theme-muted">رقم البلاغ</th>
                <th className="p-4 text-sm font-medium text-theme-muted">العنوان</th>
                <th className="p-4 text-sm font-medium text-theme-muted">التاريخ</th>
                <th className="p-4 text-sm font-medium text-theme-muted">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(item => (
                <tr key={item} className="border-b border-theme-border last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-theme-text">#BLG-{1000 + item}</td>
                  <td className="p-4 text-sm text-theme-muted">مشكلة في الإنارة بالشارع الرئيسي</td>
                  <td className="p-4 text-sm text-theme-muted">12 يونيو 2026</td>
                  <td className="p-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      مكتمل
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // معلومات المستخدم (تستخدم كواجهة أمامية فقط حالياً)
  const user = {
    name: 'أحمد محمد',
    initial: 'أ', // أول حرف من اسم المستخدم
  };

  const links = [
    { to: '/', label: 'لوحتي', icon: <FiHome /> },
    { to: '/reports', label: 'بلاغاتي', icon: <FiFileText /> },
  ];

  const SidebarContent = () => (
    <div className="p-6 h-full flex flex-col bg-theme-card">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-primary">CityPulse</h1>
        <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-theme-muted hover:text-theme-text">
          <FiX className="text-xl" />
        </button>
      </div>
      
      <nav className="space-y-2 flex-1">
        {links.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-theme-muted hover:bg-gray-50 hover:text-theme-text'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-theme-bg" dir="rtl">
      {/* خلفية القائمة الجانبية للموبايل */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* الشريط الجانبي */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 border-l border-theme-border transform transition-transform duration-300 md:relative md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <SidebarContent />
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        {/* الشريط العلوي */}
        <header className="bg-theme-card border-b border-theme-border p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 md:hidden text-theme-muted hover:text-theme-text">
              <FiMenu className="text-2xl" />
            </button>
            <h2 className="text-lg font-bold text-theme-text hidden sm:block">لوحة التحكم</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* جرس التنبيهات */}
            <button className="p-2 text-theme-muted hover:text-primary transition-colors relative">
              <FiBell className="text-xl" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
            </button>

            {/* الملف الشخصي للمستخدم (أول حرف + الاسم) */}
            <div className="flex items-center gap-3 border-r border-theme-border pr-4 mr-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-theme-text">{user.name}</p>
                <p className="text-xs text-theme-muted">مدير النظام</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                {user.initial}
              </div>
            </div>
          </div>
        </header>
        
        {/* محتوى الصفحة */}
        <div className="p-4 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/reports" element={<ReportsView />} />
            <Route path="*" element={<DashboardView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
