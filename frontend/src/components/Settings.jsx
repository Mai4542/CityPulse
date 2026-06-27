import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiTrash2, FiSave } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState({
    personal: false,
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex gap-4 border-b border-slate-200 pb-0">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-2 pb-3 px-4 transition-colors relative ${
            activeTab === 'personal'
              ? 'text-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <FiUser />
          البيانات الشخصية
          {activeTab === 'personal' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 pb-3 px-4 transition-colors relative ${
            activeTab === 'security'
              ? 'text-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <FiLock />
          الأمان وكلمة المرور
          {activeTab === 'security' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
          )}
        </button>
      </div>

      {activeTab === 'personal' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-black text-slate-800 mb-6">البيانات الأساسية</h3>
          
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">الاسم الأول</label>
                <input
                  type="text"
                  placeholder="محمد"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">الاسم الثاني</label>
                <input
                  type="text"
                  placeholder="أحمد"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">رقم الهاتف</label>
                <input
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium text-right placeholder:text-slate-400"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium text-right placeholder:text-slate-400"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-black text-slate-700">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword.personal ? 'text' : 'password'}
                    placeholder="........"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword('personal')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword.personal ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors font-bold shadow-sm"
              >
                <FiSave />
                حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FiLock className="text-slate-400" />
              <h3 className="font-black text-slate-800">تغيير كلمة المرور</h3>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">كلمة المرور الحالية</label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    placeholder="........"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword('current')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword.current ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      placeholder="........"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword('new')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      placeholder="........"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium placeholder:text-slate-400"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword('confirm')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-bold flex items-center gap-2"
                >
                  <FiLock />
                  تحديث كلمة المرور
                </button>
              </div>
            </form>
          </div>

          <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-red-600">
              <FiTrash2 />
              <h3 className="font-black">حذف الحساب</h3>
            </div>
            <p className="text-sm text-red-600/80 mb-6 font-medium">
              حذف الحساب يزيل جميع بياناتك الشخصية بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-6 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-bold"
              >
                طلب حذف الحساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
