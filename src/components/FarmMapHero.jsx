import React, { useState, useRef, useEffect } from "react";
import { Play, Map as MapIcon, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** * NOTE: Ensure these files exist in your 'src/assets' folder.
 * If they are in your 'public' folder, you can keep the string paths
 * like "/beeflower.mp4", but imports are safer for builds.
 */
// import introVid from "./assets/Video_Creation_From_Images.mp4";
// import beeFlowerVid from "./assets/beeflower.mp4";
// import extractorVid from "./assets/honeyextractor.mp4";
// import fieldsVid from "./assets/farm-fields.mp4";

// --- 1. HOTSPOT COMPONENT ---
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
      style={{ top, left: left || "auto", right: right || "auto" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // Better mobile support
    >
      {/* VIDEO POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full mb-4 w-40 h-28 md:w-64 md:h-40 bg-[#FDF8E8] border-2 md:border-4 border-white shadow-2xl rounded-xl overflow-hidden z-30 -translate-x-1/2 left-1/2"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LABEL */}
      <div
        className={`bg-[#FDF8E8] border border-[#5C4D3C] px-3 py-1 rounded-md shadow-md mb-2 transition-all ${
          isOpen ? "-translate-y-2 bg-amber-50" : ""
        }`}
      >
        <span className="font-sans text-[10px] md:text-xs font-bold text-[#3E2F20] uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* PIN PULSE */}
      <div className="relative flex items-center justify-center w-8 h-8">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-white border-2 border-[#D98829] shadow-md items-center justify-center">
          <Play size={12} fill="#3E2F20" className="text-[#3E2F20] ml-0.5" />
        </span>
      </div>
    </div>
  );
};

// --- 2. MAIN HERO COMPONENT ---
const FarmMapHero = () => {
  const [view, setView] = useState("video"); // 'video' or 'map'

  // Auto-switch from Video to Map after 50 seconds
  useEffect(() => {
    if (view === "video") {
      const timer = setTimeout(() => setView("map"), 50000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-serif pb-20">
      {/* HEADER SECTION */}
      <div className="text-center pt-10 pb-6 px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-black text-[#3E2F20] tracking-tight mb-4"
        >
          DR. HONEY BEE FARM
        </motion.h1>

        <div className="flex items-center justify-center gap-4 text-[#8C7A63] font-sans text-xs font-bold tracking-[0.2em] uppercase">
          <p>Est. 2024</p>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          <p>Palani, Tamil Nadu</p>
        </div>
      </div>

      {/* CONTENT TOGGLE CONTAINER */}
      <div className="max-w-[1200px] mx-auto px-4 relative">
        <AnimatePresence mode="wait">
          {view === "video" ? (
            /* --- FULL SCREEN INTRO VIDEO --- */
            <motion.div
              key="intro-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={() => setView("map")}
                className="w-full h-full object-cover opacity-80"
              >
                {/* Ensure this path is exactly correct in your public folder */}
                <source
                  src="/Video_Creation_From_Images.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-black/20">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  A Glimpse of Our Pure World
                </h2>
                <button
                  onClick={() => setView("map")}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 transition-all uppercase text-sm font-bold tracking-widest"
                >
                  Explore Interactive Map <MapIcon size={16} />
                </button>
              </div>

              {/* Countdown Progress Bar */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 50, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1.5 bg-amber-500"
              />
            </motion.div>
          ) : (
            /* --- INTERACTIVE FARM MAP --- */
            <motion.div
              key="interactive-map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="/hero1.png"
                alt="Illustrated Farm Map"
                className="w-full h-auto object-cover"
              />

              {/* The Hotspots */}
              <FarmHotspot
                label="The Apiary"
                top="25%"
                left="15%"
                videoSrc="/beeflower.mp4"
              />

              <FarmHotspot
                label="Extraction Unit"
                top="55%"
                right="18%"
                videoSrc="/honeyextractor.mp4"
              />

              <FarmHotspot
                label="Organic Fields"
                top="40%"
                left="45%"
                videoSrc="/farm-fields.mp4"
              />

              {/* View Control Switcher */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <button
                  onClick={() => setView("video")}
                  className="bg-white/90 p-3 rounded-full shadow-lg text-[#3E2F20] hover:bg-amber-50 transition-colors"
                  title="Watch Video Again"
                >
                  <Video size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER LEGEND */}
      <div className="text-center mt-10">
        <p className="text-[#8C7A63] text-sm italic">
          "Hover over the hotspots to see the magic of Dr. Honey Bee Farm in
          action"
        </p>
      </div>
    </div>
  );
};

export default FarmMapHero;
