import React from "react";
import { Check } from "lucide-react";

const PuritySection = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#FFFCF0]">
      {/* 1. Background Texture (Subtle Honey Glow) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1587049352847-81a45d05c3d9?auto=format&fit=crop&q=80&w=2000"
          alt="Honey Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/90 via-amber-100/40 to-[#FDFCF8]/90"></div>
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-black text-[#3E2F20] mb-16 font-serif tracking-tight drop-shadow-sm">
          THE PURITY PROMISE: LAB-TESTED & RAW
        </h2>

        {/* 3. The Three Circular Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* --- Metric 1: Pollen Count --- */}
          <div className="flex flex-col items-center group">
            <h3 className="text-[#3E2F20] font-bold text-sm uppercase tracking-widest mb-6">
              Microscopic Pollen Count
            </h3>
            {/* Microscope Circle */}
            <div className="w-48 h-48 rounded-full border-[6px] border-[#EAD2AC] bg-white overflow-hidden shadow-xl relative transform transition-transform duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400"
                alt="Microscopic Pollen"
                className="w-full h-full object-cover scale-150 opacity-90"
              />
              {/* Vignette Overlay to look like a microscope lens */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none"></div>
            </div>
            <div className="mt-6 space-y-1">
              <p className="text-2xl font-black text-[#3E2F20]">HIGH</p>
              <p className="text-sm font-medium text-[#8C7A63]">
                (Floral Source Confirmed)
              </p>
            </div>
          </div>

          {/* --- Metric 2: HMF Level (Freshness) --- */}
          <div className="flex flex-col items-center group">
            <h3 className="text-[#3E2F20] font-bold text-sm uppercase tracking-widest mb-6">
              HMF Level (Freshness)
            </h3>
            {/* Custom SVG Gauge to match the reference image */}
            <div className="w-48 h-48 rounded-full border-[6px] border-[#EAD2AC] bg-[#FDF8E8] shadow-xl flex items-center justify-center relative transform transition-transform duration-500 hover:scale-105">
              <svg
                width="140"
                height="140"
                viewBox="0 0 100 60"
                className="overflow-visible mt-4"
              >
                {/* Green Zone */}
                <path
                  d="M 10 50 A 40 40 0 0 1 35 18"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Yellow Zone */}
                <path
                  d="M 38 16 A 40 40 0 0 1 62 16"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Red Zone */}
                <path
                  d="M 65 18 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Needle pointing to Green (Low HMF) */}
                <line
                  x1="50"
                  y1="50"
                  x2="25"
                  y2="25"
                  stroke="#3E2F20"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="4" fill="#3E2F20" />
              </svg>
            </div>
            <div className="mt-6 space-y-1">
              <p className="text-2xl font-black text-[#3E2F20]">&lt;10 mg/kg</p>
              <p className="text-sm font-medium text-[#8C7A63]">
                (Unheated/Raw)
              </p>
            </div>
          </div>

          {/* --- Metric 3: C4 Sugar Test --- */}
          <div className="flex flex-col items-center group">
            <h3 className="text-[#3E2F20] font-bold text-sm uppercase tracking-widest mb-6">
              C4 Sugar Test
            </h3>
            {/* Checkmark Circle */}
            <div className="w-48 h-48 rounded-full border-[6px] border-[#EAD2AC] bg-[#FDF8E8] shadow-xl flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
              {/* Inner Green Circle */}
              <div className="w-28 h-28 rounded-full border-[5px] border-[#4ade80] flex items-center justify-center">
                <Check size={64} className="text-[#4ade80]" strokeWidth={4} />
              </div>
            </div>
            <div className="mt-6 space-y-1">
              <p className="text-2xl font-black text-[#3E2F20]">0% DETECTED</p>
              <p className="text-sm font-medium text-[#8C7A63]">
                (No Syrup Added)
              </p>
            </div>
          </div>
        </div>

        {/* 4. Button */}
        <button className="bg-[#FDF8E8] border-2 border-[#5C4D3C] text-[#3E2F20] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-md hover:bg-[#5C4D3C] hover:text-white hover:shadow-lg transition-all duration-300 rounded-sm">
          View Latest Lab Certificate
        </button>
      </div>
    </section>
  );
};

export default PuritySection;
