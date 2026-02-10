import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

// --- 1. HOTSPOT COMPONENT (Handles Both Views) ---
const FarmHotspot = ({ label, top, left, right, videoSrc, isForcedOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const isOpen = isHovered || isForcedOpen;

  useEffect(() => {
    if (videoRef.current) {
      if (isOpen) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((e) => console.log("Autoplay blocked:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  return (
    <div
      className="absolute z-20 flex flex-col items-center cursor-pointer group"
      style={{ top, left, right }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* VIDEO POPUP SIZE:
         Mobile: w-32 h-20
         Desktop: md:w-48 md:h-32 
      */}
      <div
        className={`absolute bottom-full mb-2 md:mb-4 w-32 h-20 md:w-48 md:h-32 bg-[#FDF8E8] border-2 md:border-4 border-white shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-out origin-bottom z-30 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
      </div>

      {/* LABEL STYLE:
         Mobile: Smaller font (text-[8px]), thinner padding
         Desktop: Larger font (md:text-[10px]), more padding
      */}
      <div
        className={`bg-[#FDF8E8] border border-[#5C4D3C] px-2 py-0.5 md:px-3 md:py-1 rounded-md shadow-md mb-1 md:mb-2 transition-transform duration-300 ${
          isOpen
            ? "-translate-y-1 md:-translate-y-2 scale-105"
            : "group-hover:-translate-y-1"
        }`}
      >
        <span className="font-montserrat text-[8px] md:text-[10px] font-bold text-[#3E2F20] whitespace-nowrap uppercase tracking-wider flex items-center gap-1">
          {label}
        </span>
      </div>

      {/* PIN BUTTON SIZE:
         Mobile: w-6 h-6
         Desktop: md:w-8 md:h-8
      */}
      <div className="relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 md:h-8 md:w-8 bg-white border-2 border-[#D98829] shadow-md items-center justify-center transition-colors group-hover:bg-[#FDF8E8]">
          <Play
            size={10}
            fill="#3E2F20"
            className="text-[#3E2F20] ml-0.5 md:w-3 md:h-3"
          />
        </span>
      </div>
    </div>
  );
};

// --- 2. MAIN HERO COMPONENT ---
const FarmMapHero = () => {
  const [activeDemo, setActiveDemo] = useState(null);

  // Auto-play the demo for 5 seconds on load
  useEffect(() => {
    const startTimer = setTimeout(() => setActiveDemo("apiary"), 1500);
    const endTimer = setTimeout(() => setActiveDemo(null), 5000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="bg-[#FDFCF8] pb-6">
      {/* TITLE SECTION */}
      <div className="text-center pt-6 pb-4 px-4">
        {/* TITLE SIZE:
           Mobile: text-2xl
           Tablet: sm:text-3xl
           Desktop: md:text-4xl
        */}
        <h1 className="font-merriweather text-2xl sm:text-3xl md:text-4xl font-black text-[#3E2F20] tracking-tight mb-3">
          DR. HONEY BEE FARM
        </h1>

        {/* SUBTITLE LAYOUT:
           Mobile: flex-col (Stacked vertically)
           Desktop: sm:flex-row (Side by side)
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <p className="font-montserrat text-[10px] md:text-xs font-bold text-[#8C7A63] uppercase tracking-[0.2em]">
            EST. 2024 • PALANI
          </p>

          {/* Divider Dot (Hidden on Mobile) */}
          <div className="hidden sm:block w-1 h-1 bg-[#EAD2AC] rounded-full"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EAD2AC]/30 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold text-[#5C4D3C] uppercase tracking-wider">
              Interactive Map
            </span>
          </div>
        </div>
      </div>

      {/* MAP IMAGE CONTAINER */}
      <main className="relative w-full z-0 px-2 md:px-4">
        <div className="w-full max-w-[1400px] mx-auto relative rounded-xl md:rounded-3xl overflow-hidden shadow-xl border-2 md:border-4 border-white group">
          <img
            src="/hero1.png"
            alt="Farm Landscape"
            className="w-full h-auto object-cover"
          />

          {/* HOTSPOTS (Positioned by %) */}
          <FarmHotspot
            label="APIARY"
            top="30%"
            left="20%"
            videoSrc="/beeflower.mp4"
            isForcedOpen={activeDemo === "apiary"}
          />
          <FarmHotspot
            label="WORKSHOP"
            top="45%"
            right="20%"
            videoSrc="/honeyextractor.mp4"
            isForcedOpen={false}
          />
        </div>
      </main>
    </div>
  );
};

export default FarmMapHero;
