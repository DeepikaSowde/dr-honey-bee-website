import React, { useRef } from "react";
import { MapPin, ArrowRight, ArrowLeft, Users } from "lucide-react";

const camps = [
  {
    id: 1,
    place: "Madurai",
    village: "Melur Village",
    date: "Jan 10, 2026",
    attendees: 45,
    // Using a placeholder image of a crowd/farm
    image:
      "https://images.unsplash.com/photo-1625246333195-5840507c8879?auto=format&fit=crop&q=80",
    status: "Completed",
    highlight: "45 Farmers trained in Queen Rearing techniques.",
  },
  {
    id: 2,
    place: "Coimbatore",
    village: "Pollachi North",
    date: "Jan 25, 2026",
    attendees: 100,
    // Using a placeholder of a workshop
    image:
      "https://images.unsplash.com/photo-1595248547432-8df7d9d69042?auto=format&fit=crop&q=80",
    status: "Upcoming",
    highlight: "Open Registration for Basic Beekeeping.",
  },
  {
    id: 3,
    place: "Theni",
    village: "Cumbum Valley",
    date: "Feb 02, 2026",
    attendees: 30,
    // Using a placeholder of a field
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80",
    status: "Filling Fast",
    highlight: "Advanced Commercial Honey Extraction.",
  },
  {
    id: 4,
    place: "Salem",
    village: "Yercaud Foothills",
    date: "Feb 15, 2026",
    attendees: 0,
    // Using a placeholder of nature
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80",
    status: "Open",
    highlight: "Coffee Estate Bee Integration Workshop.",
  },
];

const TrainingGallery = () => {
  const scrollRef = useRef(null);

  // Function to handle manual scrolling via buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Roughly the width of one card
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 bg-[#3E2F20] text-[#EAD2AC] px-6 font-sans border-t border-[#EAD2AC]/20">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-amber-500 font-bold tracking-widest text-xs uppercase">
              Across Tamil Nadu
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-white mt-2">
              Our Training Journey
            </h2>
            <p className="text-white/60 mt-4 max-w-lg leading-relaxed">
              We don't just stay in the classroom. From Pollachi to Theni, we
              travel to share knowledge directly in the field.
            </p>
          </div>

          {/* Scroll Buttons (Arrows) */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#EAD2AC]/30 flex items-center justify-center hover:bg-[#EAD2AC] hover:text-[#3E2F20] transition-colors active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#EAD2AC] text-[#3E2F20] flex items-center justify-center hover:bg-white transition-colors active:scale-95 shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL CAROUSEL --- */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides scrollbar in Firefox/IE
        >
          {/* Loop through camps */}
          {camps.map((camp) => (
            <div
              key={camp.id}
              className="min-w-[300px] md:min-w-[360px] bg-[#2C2117] rounded-2xl overflow-hidden border border-white/10 snap-start group hover:border-[#EAD2AC]/50 transition-all duration-300 shadow-xl"
            >
              {/* Image Header */}
              <div className="h-56 relative overflow-hidden">
                <img
                  src={camp.image}
                  alt={camp.place}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 backdrop-blur-md shadow-sm
                  ${
                    camp.status === "Completed"
                      ? "bg-stone-800/80"
                      : "bg-amber-600/90"
                  }`}
                >
                  {camp.status}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {camp.place}
                    </h3>
                    <p className="text-white/50 text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-amber-500" />{" "}
                      {camp.village}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#EAD2AC] font-bold text-xl">
                      {camp.date.split(" ")[0]}{" "}
                      {camp.date.split(" ")[1].replace(",", "")}
                    </p>
                    <p className="text-white/40 text-xs uppercase font-bold tracking-wider">
                      {camp.date.split(" ")[2]}
                    </p>
                  </div>
                </div>

                {/* Highlight Box */}
                <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5 group-hover:bg-white/10 transition-colors">
                  <p className="text-sm text-white/90 italic leading-relaxed">
                    "{camp.highlight}"
                  </p>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
                    <Users size={14} className="text-amber-500" />
                    {camp.attendees > 0
                      ? `${camp.attendees} Farmers`
                      : "Registration Open"}
                  </div>

                  {camp.status !== "Completed" ? (
                    <button className="text-[#EAD2AC] text-sm font-bold hover:text-white flex items-center gap-1 transition-colors group/btn">
                      Join Now{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  ) : (
                    <span className="text-stone-500 text-sm font-bold cursor-default">
                      View Report
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* --- "INVITE US" CARD (The Last Card) --- */}
          <div className="min-w-[300px] md:min-w-[360px] bg-[#EAD2AC] rounded-2xl flex flex-col items-center justify-center p-8 text-center snap-start border-4 border-[#3E2F20] shadow-xl">
            <div className="w-20 h-20 bg-[#3E2F20] rounded-full flex items-center justify-center mb-6 text-[#EAD2AC] shadow-lg">
              <MapPin size={40} />
            </div>
            <h3 className="text-2xl font-serif font-black text-[#3E2F20] mb-3">
              Your Village Next?
            </h3>
            <p className="text-[#3E2F20]/80 mb-8 text-sm leading-relaxed font-medium">
              We travel anywhere in Tamil Nadu with 20+ interested farmers.
            </p>
            <button className="bg-[#3E2F20] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all transform hover:-translate-y-1 shadow-md">
              Invite Dr. Honey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingGallery;
