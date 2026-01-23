import React from "react";
import { Calendar, Users, Award, CheckCircle } from "lucide-react";

const programs = [
  {
    title: "1-Day Basic Beekeeping",
    level: "Beginner",
    duration: "1 Day (Sunday)",
    price: "₹1,500",
    description:
      "Perfect for hobbyists. Learn the basics of bee handling, box maintenance, and safety.",
    features: [
      "Intro to Apis Cerana",
      "Handling Equipment",
      "Lunch Provided",
      "Participation Certificate",
    ],
    bgClass: "bg-amber-100",
  },
  {
    title: "Commercial Apiculture",
    level: "Professional",
    duration: "3 Days",
    price: "₹5,500",
    description:
      "For farmers wanting to start a business. Covers colony division, queen rearing, and marketing.",
    features: [
      "Queen Rearing Techniques",
      "Disease Management",
      "Honey Extraction",
      "Govt Scheme Guidance",
    ],
    bgClass: "bg-[#EAD2AC]",
  },
  {
    title: "Stingless Bee Farming",
    level: "Specialist",
    duration: "2 Days",
    price: "₹3,000",
    description:
      "Master the art of rearing Dammer bees (Meliponculture) for medicinal honey production.",
    features: [
      "Log Hive Transfer",
      "Pollen Collection",
      "Medicinal Properties",
      "Post-Harvest Handling",
    ],
    bgClass: "bg-stone-200",
  },
];

const TrainingSection = () => {
  return (
    // --- CHANGE IS HERE ---
    // Changed "py-20" (80px top/bottom) to "pt-8 pb-20" (32px top, 80px bottom)
    // This pulls "Empowering Farmers" much higher up.
    <section className="pt-8 pb-20 bg-white px-6 font-sans border-t border-[#EAD2AC]/30">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-10">
          <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">
            Empowering Farmers
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#3E2F20] mt-2 mb-6">
            Hands-On Training Academy
          </h2>
          <p className="max-w-2xl mx-auto text-stone-600 leading-relaxed">
            Join 5,000+ farmers who have learned sustainable beekeeping from Dr.
            Honey Bee Farm. We turn enthusiasts into experts through practical,
            field-based learning.
          </p>
        </div>

        {/* --- Stats Row --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-[#EAD2AC]/30 py-10 bg-[#FDFCF8]">
          <div className="text-center">
            <div className="flex justify-center text-amber-600 mb-3">
              <Users size={32} />
            </div>
            <div className="text-3xl font-black text-[#3E2F20]">5,000+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">
              Farmers Trained
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center text-amber-600 mb-3">
              <Calendar size={32} />
            </div>
            <div className="text-3xl font-black text-[#3E2F20]">Monthly</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">
              Workshops
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center text-amber-600 mb-3">
              <Award size={32} />
            </div>
            <div className="text-3xl font-black text-[#3E2F20]">Govt</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">
              Recognized
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center text-amber-600 mb-3">
              <CheckCircle size={32} />
            </div>
            <div className="text-3xl font-black text-[#3E2F20]">100%</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">
              Practical
            </div>
          </div>
        </div>

        {/* --- Program Cards --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="relative group hover:-translate-y-2 transition-transform duration-300 h-full"
            >
              <div
                className={`h-full rounded-2xl p-8 ${program.bgClass} border border-transparent group-hover:border-[#3E2F20]/20 shadow-sm hover:shadow-xl transition-all`}
              >
                <div className="bg-[#3E2F20] text-white text-[10px] uppercase font-bold px-3 py-1 inline-block rounded-full mb-6 tracking-wide">
                  {program.level}
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#3E2F20] mb-3 leading-tight">
                  {program.title}
                </h3>

                <div className="flex items-center gap-3 text-stone-700 font-bold text-sm mb-6 border-b border-black/5 pb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {program.duration}
                  </span>
                  <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
                  <span>{program.price}</span>
                </div>

                <p className="text-stone-700 mb-8 min-h-[60px] text-sm leading-relaxed">
                  {program.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-800"
                    >
                      <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-amber-600"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-white text-[#3E2F20] font-bold py-4 rounded-xl border border-[#3E2F20]/10 hover:bg-[#3E2F20] hover:text-[#EAD2AC] transition-colors shadow-sm uppercase text-xs tracking-widest">
                  Book Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
