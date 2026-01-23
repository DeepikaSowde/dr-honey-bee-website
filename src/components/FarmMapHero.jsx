import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

// --- 1. HOTSPOT COMPONENT (Unchanged) ---
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
      <div
        className={`absolute bottom-full mb-4 w-48 h-32 bg-[#FDF8E8] border-4 border-white shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-out origin-bottom z-30 ${
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

      <div
        className={`bg-[#FDF8E8] border-2 border-[#5C4D3C] px-3 py-1 rounded-md shadow-md mb-2 transition-transform duration-300 ${
          isOpen ? "-translate-y-2 scale-105" : "group-hover:-translate-y-1"
        }`}
      >
        <span className="font-montserrat text-[10px] font-bold text-[#3E2F20] whitespace-nowrap uppercase tracking-wider flex items-center gap-1">
          {label}
        </span>
      </div>

      <div className="relative flex items-center justify-center w-8 h-8">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-white border-2 border-[#D98829] shadow-md items-center justify-center transition-colors group-hover:bg-[#FDF8E8]">
          <Play size={12} fill="#3E2F20" className="text-[#3E2F20] ml-0.5" />
        </span>
      </div>
    </div>
  );
};

// --- 2. MAIN HERO COMPONENT (SUPER COMPACT) ---
const FarmMapHero = () => {
  const [activeDemo, setActiveDemo] = useState(null);

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
      {/* --- SUPER COMPACT TITLE SECTION --- */}
      {/* pt-4 gives just enough breathing room from the logo */}
      <div className="text-center pt-4 pb-4 px-4">
        {/* Title: Reduced to text-4xl (was 5xl or 6xl) */}
        <h1 className="font-merriweather text-3xl md:text-4xl font-black text-[#3E2F20] tracking-tight mb-2">
          DR. HONEY BEE FARM
        </h1>

        {/* Subtitle: FLEX ROW (Side-by-Side) instead of Column */}
        <div className="flex flex-row items-center justify-center gap-4">
          <p className="font-montserrat text-[10px] md:text-xs font-bold text-[#8C7A63] uppercase tracking-[0.2em]">
            EST. 2024(TELL THE YEAR) • PALANI
          </p>
          <div className="hidden md:block w-1 h-1 bg-[#EAD2AC] rounded-full"></div>{" "}
          {/* Little Dot Separator */}
          {/* Badge: Tighter padding, smaller text */}
          <div className="inline-flex items-center gap-2 bg-[#EAD2AC]/30 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold text-[#5C4D3C] uppercase tracking-wider">
              Watch map Demo
            </span>
          </div>
        </div>
      </div>

      {/* --- MAP AREA --- */}
      <main className="relative w-full z-0 px-4">
        <div className="w-full max-w-[1400px] mx-auto relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
          <img
            src="/hero1.png"
            alt="Farm Landscape"
            className="w-full h-auto object-cover"
          />

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
