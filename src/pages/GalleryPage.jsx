import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Camera } from "lucide-react";

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState("All");

  // Mapped based on your real files in public/Gallery
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

  // Updated categories to match your new real data
  const categories = ["All", "Bees", "Process", "Training"];

  const filteredMedia =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <div className="bg-[#FDFCF8] min-h-screen pt-12 pb-24 px-6 font-sans">
      {/* --- HEADER --- */}
      <header className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="bg-amber-100 p-3 rounded-full mb-4 text-amber-700 shadow-sm">
            <Camera size={30} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#3E2F20] tracking-tight uppercase">
            Our Farm Story
          </h1>
          <p className="text-[#8C7A63] mt-4 max-w-xl font-medium italic">
            "Direct from Palani—see our bees, our training programs, and our
            100% natural honey."
          </p>
        </motion.div>
      </header>

      {/* --- CATEGORY FILTERS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
              filter === cat
                ? "bg-[#3E2F20] text-white shadow-xl scale-105"
                : "bg-white text-[#5C4D3C] border border-amber-100 hover:border-amber-400"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- MASONRY GRID --- */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedMedia(item)}
              className="relative break-inside-avoid rounded-3xl overflow-hidden cursor-zoom-in group shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-amber-50"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F20]/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  {item.category}
                </span>
                <p className="text-white font-bold tracking-wider text-sm">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#3E2F20]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-amber-400 p-2 transition-transform hover:rotate-90">
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMedia.url}
                className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl border-4 border-white/10"
                alt={selectedMedia.title}
              />
              <div className="mt-6 text-center">
                <span className="text-amber-400 text-xs font-bold tracking-[0.4em] uppercase">
                  {selectedMedia.category}
                </span>
                <h2 className="text-white text-2xl font-black mt-2 tracking-tight">
                  {selectedMedia.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
