import React from 'react';

const DeveloperCard = () => {
  const skills = [
    "Hero / Landing Page",
    "Report Form UI",
    "Tracking Page",
    "Rating System UI",
    "Arabic + RTL Support"
  ];

  return (
    <div className="max-w-[360px] w-full mx-auto my-8 font-sans shadow-sm">
      {/* Header Container */}
      <div className="flex w-full">
        {/* Green Sidebar in Header */}
        <div className="w-[30px] bg-brand-green shrink-0"></div>
        
        {/* Main Red Header */}
        <div className="flex-1 bg-brand-red py-[18px] flex flex-col items-center justify-center">
          <h2 className="text-white text-[22px] font-bold tracking-wide leading-tight">
            Noran
          </h2>
          <p className="text-white/80 italic text-[14px] font-light mt-0.5">
            Frontend Developer
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#fcfcfc] border border-brand-red border-t-0 py-6 px-7">
        <ul className="flex flex-col gap-4">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center text-[#374151] text-[15px] leading-none">
              <span className="w-2.5 h-2.5 bg-brand-red mr-3.5 shrink-0 block"></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperCard;
