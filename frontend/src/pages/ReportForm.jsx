import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    locationType: 'موقعي الحالي',
    locationText: '',
    category: '',
    severity: '',
    description: '',
    isRecurring: '',
    photos: []
  });

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div dir="rtl" className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">تم الإرسال بنجاح</h2>
          <p className="text-slate-500 mb-8 font-medium">شكراً لك! تم استلام بلاغك وسيقوم الفريق المختص بمراجعته في أقرب وقت.</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3.5 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  // The Header with steps indicator
  const StepIndicator = () => (
    <div className="max-w-3xl mx-auto px-4 pb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`flex items-center gap-1.5 text-xs font-black transition-colors ${step >= 1 ? 'text-primary-dark' : 'text-slate-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${step >= 1 ? 'border-primary text-primary bg-white' : 'border-slate-300 text-slate-400'}`}>
            1
          </div>
          <span className="hidden sm:inline">الموقع والفئة</span>
        </div>
        <div className={`flex-1 h-0.5 rounded transition-all ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center gap-1.5 text-xs font-black transition-colors ${step >= 2 ? 'text-primary-dark' : 'text-slate-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${step >= 2 ? 'border-primary text-primary bg-white' : 'border-slate-300 text-slate-400'}`}>
            2
          </div>
          <span className="hidden sm:inline">التفاصيل والصور</span>
        </div>
        <div className={`flex-1 h-0.5 rounded transition-all ${step >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center gap-1.5 text-xs font-black transition-colors ${step >= 3 ? 'text-primary-dark' : 'text-slate-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${step >= 3 ? 'border-primary text-primary bg-white' : 'border-slate-300 text-slate-400'}`}>
            3
          </div>
          <span className="hidden sm:inline">المراجعة والإرسال</span>
        </div>
      </div>
    </div>
  );

  const categories = [
    { 
      id: 'roads', label: 'طرق وأرصفة',
      icon: <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></>,
      activeClass: 'bg-warning text-white border-warning',
      inactiveClass: 'text-warning bg-warning/10 border-warning/30'
    },
    { 
      id: 'water', label: 'مياه وصرف',
      icon: <><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></>,
      activeClass: 'bg-info text-white border-info',
      inactiveClass: 'text-info bg-info/10 border-info/30'
    },
    { 
      id: 'electricity', label: 'كهرباء وإنارة',
      icon: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>,
      activeClass: 'bg-warning text-white border-warning',
      inactiveClass: 'text-warning bg-warning/10 border-warning/30'
    },
    { 
      id: 'trash', label: 'نظافة وتجميل',
      icon: <><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></>,
      activeClass: 'bg-primary text-white border-primary',
      inactiveClass: 'text-primary bg-primary/10 border-primary/30'
    },
    { 
      id: 'danger', label: 'مخاطر أخرى',
      icon: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></>,
      activeClass: 'bg-danger text-white border-danger',
      inactiveClass: 'text-danger bg-danger/10 border-danger/30'
    },
    { 
      id: 'infrastructure', label: 'بنية تحتية',
      icon: <><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></>,
      activeClass: 'bg-purple-600 text-white border-purple-600',
      inactiveClass: 'text-purple-600 bg-purple-50 border-purple-200'
    }
  ];

  const severities = [
    { label: 'منخفضة', activeClass: 'bg-primary text-white border-primary', inactiveClass: 'text-primary border-primary/20 bg-primary/5' },
    { label: 'متوسطة', activeClass: 'bg-warning text-white border-warning', inactiveClass: 'text-warning border-warning/20 bg-warning/5' },
    { label: 'عالية / طارئ', activeClass: 'bg-danger text-white border-danger', inactiveClass: 'text-danger border-danger/20 bg-danger/5' }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => {
              if(step > 1) {
                // Confirm before going back if there's data, or just go back
                handleBack();
              } else {
                navigate(-1);
              }
            }}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-5 h-5">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
          <div>
            <h1 className="font-black text-slate-900">تقديم بلاغ جديد</h1>
            <p className="text-xs text-slate-400">محافظة القليوبية — CityPulse</p>
          </div>
        </div>
        <StepIndicator />
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        <div className="space-y-6">
          
          {step === 1 && (
            <>
              {/* --- STEP 1 --- */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="relative h-56 bg-gradient-to-br from-primary-darker via-primary-dark to-slate-800">
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 320 224">
                    <line x1="20" y1="0" x2="20" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="40" y1="0" x2="40" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="60" y1="0" x2="60" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="80" y1="0" x2="80" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="100" y1="0" x2="100" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="120" y1="0" x2="120" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="140" y1="0" x2="140" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="160" y1="0" x2="160" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="180" y1="0" x2="180" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="200" y1="0" x2="200" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="220" y1="0" x2="220" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="240" y1="0" x2="240" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="260" y1="0" x2="260" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="280" y1="0" x2="280" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="300" y1="0" x2="300" y2="224" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="20" x2="320" y2="20" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="40" x2="320" y2="40" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="60" x2="320" y2="60" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="80" x2="320" y2="80" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="100" x2="320" y2="100" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="120" x2="320" y2="120" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="140" x2="320" y2="140" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="160" x2="320" y2="160" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="180" x2="320" y2="180" stroke="white" strokeWidth="0.5"></line><line x1="0" y1="200" x2="320" y2="200" stroke="white" strokeWidth="0.5"></line><circle cx="160" cy="112" r="40" fill="none" stroke="#0d9488" strokeWidth="1.5" opacity="0.6"></circle><circle cx="160" cy="112" r="70" fill="none" stroke="#0d9488" strokeWidth="0.5" opacity="0.3"></circle><rect x="60" y="40" width="60" height="30" fill="#134e4a" rx="2"></rect><rect x="150" y="20" width="80" height="20" fill="#134e4a" rx="2"></rect><rect x="80" y="100" width="40" height="50" fill="#134e4a" rx="2"></rect><rect x="200" y="80" width="70" height="40" fill="#134e4a" rx="2"></rect><rect x="180" y="140" width="50" height="60" fill="#134e4a" rx="2"></rect>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="w-8 h-8 bg-danger rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-danger mx-auto"></div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                    شارع السيوف، قليوب
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <button 
                      onClick={() => updateForm('locationType', 'موقعي الحالي')}
                      className={`shadow-sm rounded-lg px-3 py-1.5 text-xs font-black flex items-center gap-1 transition-colors ${formData.locationType === 'موقعي الحالي' ? 'bg-primary text-white' : 'bg-white text-primary-dark'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      موقعي الحالي
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <label className="block text-sm font-black text-slate-700 mb-2">
                    أو اكتب العنوان يدوياً
                  </label>
                  <div className="flex gap-2">
                    <input
                      placeholder="مثال: ميدان محطة القناطر الخيرية"
                      className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary"
                      type="text"
                      value={formData.locationText}
                      onChange={(e) => {
                        updateForm('locationText', e.target.value);
                        updateForm('locationType', 'مكتوب يدوياً');
                      }}
                    />
                    <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary bg-white">
                      <option>قليوب</option>
                      <option>بنها</option>
                      <option>شبرا الخيمة</option>
                      <option>القناطر</option>
                      <option>كفر شكر</option>
                      <option>طوخ</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-black text-slate-800 mb-4">نوع المشكلة</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => updateForm('category', cat.label)}
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all font-bold text-sm ${
                        formData.category === cat.label 
                        ? cat.activeClass 
                        : cat.inactiveClass
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        {cat.icon}
                      </svg>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-black text-slate-800 mb-4">درجة الخطورة</h2>
                <div className="flex gap-3">
                  {severities.map(sev => (
                    <button 
                      key={sev.label}
                      onClick={() => updateForm('severity', sev.label)}
                      className={`flex-1 py-3 border-2 rounded-xl text-sm font-black transition-all ${
                        formData.severity === sev.label 
                        ? sev.activeClass 
                        : sev.inactiveClass
                      }`}
                    >
                      {sev.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.category || !formData.severity}
                className="w-full py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي — إضافة التفاصيل والصور
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* --- STEP 2 --- */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5 mb-6">
                <h2 className="font-black text-slate-800">وصف المشكلة</h2>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">اشرح المشكلة بالتفصيل</label>
                  <textarea 
                    rows="4" 
                    placeholder="مثال: توجد حفرة كبيرة في منتصف الطريق أمام المدرسة تُشكّل خطراً على المارة والسيارات، خاصةً في الليل..." 
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary resize-none transition-colors"
                    value={formData.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                  ></textarea>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs font-bold text-slate-400">وصف تفصيلي يسرّع المعالجة</p>
                    <p className="text-xs font-bold text-slate-400">{formData.description.length} / ٥٠٠</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">هل تتكرر هذه المشكلة؟</label>
                  <div className="flex gap-3">
                    <button onClick={() => updateForm('isRecurring', 'نعم، متكررة')} className={`flex-1 py-2 border rounded-xl text-xs font-black transition-colors ${formData.isRecurring === 'نعم، متكررة' ? 'border-primary text-primary-dark bg-primary/5' : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary-dark'}`}>نعم، متكررة</button>
                    <button onClick={() => updateForm('isRecurring', 'لأول مرة')} className={`flex-1 py-2 border rounded-xl text-xs font-black transition-colors ${formData.isRecurring === 'لأول مرة' ? 'border-primary text-primary-dark bg-primary/5' : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary-dark'}`}>لأول مرة</button>
                    <button onClick={() => updateForm('isRecurring', 'غير متأكد')} className={`flex-1 py-2 border rounded-xl text-xs font-black transition-colors ${formData.isRecurring === 'غير متأكد' ? 'border-primary text-primary-dark bg-primary/5' : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary-dark'}`}>غير متأكد</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-black text-slate-800">الصور والمرفقات</h2>
                  <span className="text-xs text-slate-400 font-bold">اختياري (يُنصح به)</span>
                </div>
                <label className="block border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer mb-4 group">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera w-7 h-7 text-primary" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                  </div>
                  <p className="text-sm font-black text-slate-700 mb-1">التقط صورة أو ارفع من الاستوديو</p>
                  <p className="text-xs font-bold text-slate-400">PNG, JPG, HEIC — حتى ١٠ ميجابايت</p>
                  <input type="file" className="hidden" multiple />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative h-20 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image w-6 h-6 text-white/40" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div>
                    <button className="absolute top-1.5 left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-white" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
                  </div>
                  <div className="relative h-20 rounded-xl bg-gradient-to-br from-primary-dark to-slate-800 overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image w-6 h-6 text-white/40" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div>
                    <button className="absolute top-1.5 left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3 text-white" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
                  </div>
                  <div className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors"><span className="text-2xl text-slate-300 font-bold">+</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="px-6 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">رجوع</button>
                <button onClick={handleNext} disabled={!formData.description.trim()} className="flex-1 py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">التالي — مراجعة البلاغ</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* --- STEP 3 --- */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-1">رقم البلاغ المتوقع</p>
                    <h2 className="font-black text-slate-800 text-lg">#C-٩٠١</h2>
                  </div>
                  <div className="bg-danger/10 text-danger px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                    أولوية هامة
                  </div>
                </div>
                
                <div className="p-0">
                  <div className="flex flex-col divide-y divide-slate-100">
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">الفئة</span>
                      <span className="text-sm font-black text-slate-800">{formData.category || 'طرق وأرصفة'}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">الموقع</span>
                      <span className="text-sm font-black text-slate-800">{formData.locationText || 'شارع السيوف، قليوب'}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">المركز</span>
                      <span className="text-sm font-black text-slate-800">قليوب</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">درجة الخطورة</span>
                      <span className="text-sm font-black text-danger">{formData.severity || 'متوسطة'}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">الصور المرفقة</span>
                      <span className="text-sm font-black text-slate-800">٢ صورة</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">الجهة المختصة</span>
                      <span className="text-sm font-black text-slate-800">أعمال عامة — القليوبية</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-500">وقت المعالجة المتوقع</span>
                      <span className="text-sm font-black text-primary">١–٣ أيام عمل</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-warning shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  <div>
                    <h3 className="text-sm font-black text-warning mb-1">تنبيه قبل الإرسال</h3>
                    <p className="text-xs font-bold text-warning/80 leading-relaxed">ستتلقى رسالة نصية على رقمك عند قبول البلاغ وعند كل تحديث. البلاغات الكاذبة تعرض صاحبها للمساءلة القانونية وفقاً للتشريعات المصرية.</p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors mb-6 group">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${agreeToTerms ? 'bg-primary border-primary' : 'bg-white border-slate-300 group-hover:border-primary'}`}>
                  {agreeToTerms && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white"><path d="M20 6 9 17l-5-5"></path></svg>}
                </div>
                <input type="checkbox" className="hidden" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} />
                <span className="text-sm font-bold text-slate-700 select-none">أقرّ بصحة المعلومات وأوافق على شروط الاستخدام</span>
              </label>

              <div className="flex gap-3">
                <button 
                  onClick={handleBack}
                  className="w-1/3 py-4 text-base font-black text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition-colors shadow-sm"
                >
                  تعديل
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!agreeToTerms}
                  className="w-2/3 py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  إرسال البلاغ
                </button>
              </div>
            </>
          )}

        </div>
      </main>

      {!isSubmitted && (
        <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-slate-100 px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4 text-primary" aria-hidden="true">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>
              </svg>
              <span>البلاغات الدقيقة تُحل أسرع بنسبة <span className="font-black text-primary-dark">٤٠٪</span></span>
            </div>
            <p className="text-xs font-black text-slate-400">الخطوة {step} من ٣</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
