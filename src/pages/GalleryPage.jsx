import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Play, Camera, Filter } from "lucide-react";

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState("All");

  // Real media data structure for Dr. Honey Bee Farm
  const galleryData = [
    {
      id: 1,
      type: "image",
      category: "Farm",
      url: "/farm1.jpg",
      title: "Palani Apiary View",
    },
    {
      id: 2,
      type: "video",
      category: "Bees",
      url: "/beeflower.mp4",
      title: "Bees at Work",
    },
    {
      id: 3,
      type: "image",
      category: "Process",
      url: "/honey-pour.jpg",
      title: "Natural Texture",
    },
    {
      id: 4,
      type: "image",
      category: "Farm",
      url: "/boxes.jpg",
      title: "Our Bee Boxes",
    },
    {
      id: 5,
      type: "image",
      category: "Process",
      url: "/extraction.jpg",
      title: "Cold Extraction",
    },
    {
      id: 6,
      type: "video",
      category: "Process",
      url: "/farm-fields.mp4",
      title: "Harvesting Day",
    },
  ];

  const categories = ["All", "Farm", "Bees", "Process"];

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
          <div className="bg-amber-100 p-3 rounded-full mb-4 text-amber-700">
            <Camera size={30} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#3E2F20] tracking-tight uppercase">
            Farm to Bottle
          </h1>
          <p className="text-[#8C7A63] mt-4 max-w-xl font-medium italic">
            "Authentic glimpses of our sustainable beekeeping process in
            Palani."
          </p>
        </motion.div>
      </header>

      {/* --- CATEGORY FILTERS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
              filter === cat
                ? "bg-[#3E2F20] text-white shadow-lg"
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
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="relative">
                  <video
                    src={item.url}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full">
                    <Play size={14} className="text-white fill-white" />
                  </div>
                </div>
              )}

              {/* OVERLAY ON HOVER */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F20]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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
            <button className="absolute top-6 right-6 text-white hover:text-amber-400 p-2">
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.url}
                  className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl border-4 border-white/5"
                  alt={selectedMedia.title}
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl"
                />
              )}
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
