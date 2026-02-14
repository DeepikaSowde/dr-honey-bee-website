import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, ChevronRight } from "lucide-react";

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState("All");

  const galleryData = [
    {
      id: 1,
      type: "image",
      category: "Process",
      url: "/Gallery/bottle.jpeg",
      title: "Pure Bottled Honey",
    },
    {
      id: 2,
      type: "image",
      category: "Process",
      url: "/Gallery/comb.jpeg",
      title: "Raw Honeycomb",
    },
    {
      id: 3,
      type: "image",
      category: "Process",
      url: "/Gallery/bottle jar.jpeg",
      title: "Our Honey Varieties",
    },
    {
      id: 4,
      type: "image",
      category: "Training",
      url: "/Gallery/training.jpeg",
      title: "Beekeeping Session",
    },
    {
      id: 5,
      type: "image",
      category: "Training",
      url: "/Gallery/Training Certificate.jpeg",
      title: "Mission Accomplished",
    },
    {
      id: 6,
      type: "image",
      category: "Bees",
      url: "/Gallery/beehive.jpeg",
      title: "Healthy Bee Colonies",
    },
    {
      id: 7,
      type: "image",
      category: "Training",
      url: "/Gallery/Training Pic.jpeg",
      title: "Hands-on Learning",
    },
    {
      id: 8,
      type: "image",
      category: "Training",
      url: "/Gallery/Training student pic.jpeg",
      title: "Future Beekeepers",
    },
    {
      id: 9,
      type: "image",
      category: "Process",
      url: "/Gallery/honeycomb.jpeg",
      title: "Nature's Sweetness",
    },
    {
      id: 10,
      type: "image",
      category: "Process",
      url: "/Gallery/honeycomb2.jpeg",
      title: "Fresh Harvest",
    },
  ];

  const categories = ["All", "Bees", "Process", "Training"];

  const filteredMedia =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <div className="bg-[#FDFCF8] min-h-screen pt-8 pb-20 px-4 md:px-6 font-sans">
      {/* --- MOBILE HEADER --- */}
      <header className="max-w-7xl mx-auto text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-amber-100 p-2.5 rounded-full mb-3 text-amber-700 shadow-sm">
            <Camera size={24} />
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-[#3E2F20] tracking-tight uppercase">
            Our Farm Story
          </h1>
          <p className="text-[#8C7A63] mt-2 text-sm md:text-lg max-w-xl font-medium italic px-4">
            "Direct from Palani—see our bees, training, and 100% natural honey."
          </p>
        </motion.div>
      </header>

      {/* --- TOUCH-OPTIMIZED FILTERS (Horizontal Scroll on Mobile) --- */}
      <div className="flex overflow-x-auto no-scrollbar md:justify-center gap-3 mb-8 pb-2 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all shrink-0 ${
              filter === cat
                ? "bg-[#3E2F20] text-white shadow-md"
                : "bg-white text-[#5C4D3C] border border-amber-100"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- MASONRY GRID (1 Column Mobile, 2 Tablet, 3 Desktop) --- */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(item)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden active:scale-95 transition-transform bg-white border border-amber-50 shadow-sm"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover"
              />

              {/* Mobile Info Tag (Visible without hover for accessibility) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                <span className="text-amber-400 text-[9px] font-bold tracking-widest uppercase">
                  {item.category}
                </span>
                <p className="text-white font-bold text-xs">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- MOBILE-FIRST LIGHTBOX --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#3E2F20] flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            {/* Close Button Top Right */}
            <button className="absolute top-6 right-6 text-white p-2">
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMedia.url}
                className="max-w-full max-h-[70vh] rounded-lg shadow-xl"
                alt={selectedMedia.title}
              />
              <div className="mt-6 text-center px-6">
                <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                  {selectedMedia.category}
                </span>
                <h2 className="text-white text-xl font-bold mt-1">
                  {selectedMedia.title}
                </h2>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="mt-8 text-white/50 text-[10px] uppercase tracking-widest flex items-center gap-1 mx-auto"
                >
                  Swipe or Tap to close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
