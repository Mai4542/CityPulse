import React, { useState } from 'react';
import { FaGoogle, FaApple, FaFacebook, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaUser, FaPhone } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import loginImg from './assets/login-img.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // أضفنا الحالة دي عشان نعرف إحنا في دخول ولا إنشاء حساب
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white" dir="rtl">
      
      
      <div className="hidden md:block md:w-1/2 h-full">
        <img 
          src={loginImg} 
          alt="Login Illustration" 
          className="w-full h-full object-cover" 
        />
      </div>

      
      <div className="w-full md:w-1/2 h-full p-8 md:p-16 pt-20 mt-4 flex flex-col justify-center bg-white overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {isSignup ? "إنشاء حساب جديد" : "أهلاً بك مجدداً"}
          </h2>

          
          <div className="flex bg-[#e8f5e9] rounded-full p-1 mb-10 w-full">
            <button 
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-3 rounded-full font-bold transition-all ${!isSignup ? 'bg-[#28a745] text-white shadow-md' : 'text-[#28a745]'}`}
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-3 rounded-full font-bold transition-all ${isSignup ? 'bg-[#28a745] text-white shadow-md' : 'text-[#28a745]'}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form className="space-y-4">
            
            
            {isSignup && (
              <>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2 text-right">
                    <label className="block text-gray-700 font-semibold text-sm mr-2">الاسم الأول</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-4 flex items-center text-gray-400"><FaUser size={14}/></span>
                      <input type="text" placeholder="الاسم الأول" className="w-full pr-10 pl-4 py-3 bg-[#f1f8f1] border-none rounded-2xl focus:ring-2 focus:ring-[#28a745] outline-none text-right" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-right">
                    <label className="block text-gray-700 font-semibold text-sm mr-2">الاسم الثاني</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-4 flex items-center text-gray-400"><FaUser size={14}/></span>
                      <input type="text" placeholder="الاسم الثاني" className="w-full pr-10 pl-4 py-3 bg-[#f1f8f1] border-none rounded-2xl focus:ring-2 focus:ring-[#28a745] outline-none text-right" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="block text-gray-700 font-semibold text-sm mr-2">رقم الهاتف</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-4 flex items-center text-gray-400"><FaPhone size={14}/></span>
                    <input type="tel" placeholder="رقم الهاتف" className="w-full pr-11 pl-4 py-3 bg-[#f1f8f1] border-none rounded-2xl focus:ring-2 focus:ring-[#28a745] outline-none text-right" />
                  </div>
                </div>
              </>
            )}

            
            <div className="space-y-2 text-right">
              <label className="block text-gray-700 font-semibold text-sm mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <FaEnvelope />
                </span>
                <input 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full pr-12 pl-4 py-3 bg-[#f1f8f1] border-none rounded-2xl focus:ring-2 focus:ring-[#28a745] outline-none text-right"
                />
              </div>
            </div>

            
            <div className="space-y-2 text-right">
              <label className="block text-gray-700 font-semibold text-sm mr-2">كلمة المرور</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="أدخل كلمة المرور"
                  className="w-full pr-12 pl-12 py-3 bg-[#f1f8f1] border-none rounded-2xl focus:ring-2 focus:ring-[#28a745] outline-none text-right"
                />
                <span 
                  className="absolute inset-y-0 left-4 flex items-center text-gray-400 cursor-pointer p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            
            <button className="w-full bg-[#28a745] text-white py-4 rounded-full font-bold text-xl shadow-lg hover:bg-[#218838] transition-all transform hover:scale-[1.01] mt-4">
              {isSignup ? "إنشاء حساب" : "تسجيل الدخول"}
            </button>
          </form>

          
          <div className="mt-10 text-center">
            <p className="text-gray-400 relative">
              <span className="bg-white px-4 relative z-10 text-sm">أو تابع باستخدام</span>
              <span className="absolute left-0 right-0 top-1/2 border-t border-gray-100"></span>
            </p>
            
            <div className="flex justify-center gap-10 mt-6">
                <div className="cursor-pointer hover:scale-110 transition-transform"><FcGoogle className="text-3xl" /></div>
                <div className="cursor-pointer hover:scale-110 transition-transform"><FaApple className="text-black text-3xl" /></div>
                <div className="cursor-pointer hover:scale-110 transition-transform"><FaFacebook className="text-[#1877F2] text-3xl" /></div>
            </div>
          </div>

          
          <p className="mt-8 text-center text-gray-600">
            {isSignup ? "لديك حساب بالفعل؟ " : "ليس لديك حساب؟ "}
            <button 
              type="button"
              onClick={() => setIsSignup(!isSignup)} 
              className="text-[#28a745] font-bold hover:underline"
            >
              {isSignup ? "سجل دخولك" : "أنشئ حساباً الآن"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;