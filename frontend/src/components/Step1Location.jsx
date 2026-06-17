import { useState } from "react";
import { categories, severities, districts } from "../pages/data/reportConstants";
import LocationMap, { fetchAddressFromCoords } from "./LocationMap";

const Step1Location = ({ formData, updateForm, onNext }) => {
  const [recenterTrigger, setRecenterTrigger] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

 
  const updateAddressFromCoords = async (lat, lng) => {
    setLoadingAddress(true);
    const address = await fetchAddressFromCoords(lat, lng);
    setLoadingAddress(false);
    if (address) {
      updateForm("resolvedAddress", address);
    }
  };

  const handleUseCurrentLocation = () => {
    updateForm("locationType", "موقعي الحالي");

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateForm("lat", latitude);
        updateForm("lng", longitude);
        setRecenterTrigger(true); 
        updateAddressFromCoords(latitude, longitude);
      },
      (error) => {
        console.error("فشل تحديد الموقع:", error);
      }
    );
  };

  const handleMapLocationChange = (lat, lng) => {
    updateForm("lat", lat);
    updateForm("lng", lng);
    updateForm("locationType", "محدد على الخريطة");
    setRecenterTrigger(false); 
    updateAddressFromCoords(lat, lng);
  };

  return (
    <>
    
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="relative">
          <LocationMap
            lat={formData.lat}
            lng={formData.lng}
            onLocationChange={handleMapLocationChange}
            shouldRecenter={recenterTrigger}
          />

          <div className="absolute top-3 left-3 flex gap-2 z-[1000]">
            <button
              onClick={handleUseCurrentLocation}
              className={`shadow-sm rounded-lg px-3 py-1.5 text-xs font-black flex items-center gap-1 transition-colors ${
                formData.locationType === "موقعي الحالي"
                  ? "bg-primary text-white"
                  : "bg-white text-primary-dark"
              }`}
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
                className="w-3.5 h-3.5"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              موقعي الحالي
            </button>
          </div>

     
          {(formData.resolvedAddress || loadingAddress) && (
            <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1 max-w-[80%] z-[1000]">
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
                className="w-3 h-3 text-primary shrink-0"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              <span className="truncate">
                {loadingAddress ? "جاري تحديد العنوان..." : formData.resolvedAddress}
              </span>
            </div>
          )}
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
                updateForm("locationText", e.target.value);
                updateForm("locationType", "مكتوب يدوياً");
              }}
            />
            <select
              value={formData.district}
              onChange={(e) => updateForm("district", e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary bg-white"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
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
              onClick={() => updateForm("category", cat.label)}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all font-bold text-sm ${
                formData.category === cat.label ? cat.activeClass : cat.inactiveClass
              }`}
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
                className="w-6 h-6"
              >
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
          {severities.map((sev) => (
            <button
              key={sev.label}
              onClick={() => updateForm("severity", sev.label)}
              className={`flex-1 py-3 border-2 rounded-xl text-sm font-black transition-all ${
                formData.severity === sev.label ? sev.activeClass : sev.inactiveClass
              }`}
            >
              {sev.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!formData.category || !formData.severity}
        className="w-full py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي — إضافة التفاصيل والصور
      </button>
    </>
  );
};

export default Step1Location;