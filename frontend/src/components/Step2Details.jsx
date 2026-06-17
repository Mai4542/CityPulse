const Step2Details = ({
  formData,
  updateForm,
  onPhotoUpload,
  onRemovePhoto,
  onNext,
  onBack,
}) => {
  return (
    <>
    
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5 mb-6">
        <h2 className="font-black text-slate-800">وصف المشكلة</h2>
        <div>
          <label className="block text-sm font-black text-slate-700 mb-2">
            اشرح المشكلة بالتفصيل
          </label>
          <textarea
            rows="4"
            placeholder="مثال: توجد حفرة كبيرة في منتصف الطريق أمام المدرسة تُشكّل خطراً على المارة والسيارات، خاصةً في الليل..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary resize-none transition-colors"
            value={formData.description}
            onChange={(e) => updateForm("description", e.target.value)}
          ></textarea>
          <div className="flex justify-between mt-1">
            <p className="text-xs font-bold text-slate-400">وصف تفصيلي يسرّع المعالجة</p>
            <p className="text-xs font-bold text-slate-400">
              {formData.description.length} / ٥٠٠
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-slate-700 mb-2">
            هل تتكرر هذه المشكلة؟
          </label>
          <div className="flex gap-3">
            {["نعم، متكررة", "لأول مرة", "غير متأكد"].map((opt) => (
              <button
                key={opt}
                onClick={() => updateForm("isRecurring", opt)}
                className={`flex-1 py-2 border rounded-xl text-xs font-black transition-colors ${
                  formData.isRecurring === opt
                    ? "border-primary text-primary-dark bg-primary/5"
                    : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary-dark"
                }`}
              >
                {opt}
              </button>
            ))}
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
              className="w-7 h-7 text-primary"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
          </div>
          <p className="text-sm font-black text-slate-700 mb-1">التقط صورة أو ارفع من الاستوديو</p>
          <p className="text-xs font-bold text-slate-400">PNG, JPG, HEIC — حتى ١٠ ميجابايت</p>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={onPhotoUpload}
          />
        </label>

       
        <div className="grid grid-cols-3 gap-2">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative h-20 rounded-xl overflow-hidden group">
              <img
                src={URL.createObjectURL(photo)}
                alt={`صورة ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemovePhoto(index)}
                className="absolute top-1.5 left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
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
                  className="w-3 h-3 text-white"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          ))}

          {formData.photos.length < 5 && (
            <label className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors">
              <span className="text-2xl text-slate-300 font-bold">+</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onPhotoUpload}
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
        >
          رجوع
        </button>
        <button
          onClick={onNext}
          disabled={!formData.description.trim()}
          className="flex-1 py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي — مراجعة البلاغ
        </button>
      </div>
    </>
  );
};

export default Step2Details;