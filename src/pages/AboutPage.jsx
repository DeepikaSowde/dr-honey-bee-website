import React from "react";
import {
  Heart,
  Shield,
  Sun,
  Users,
  Play,
  Newspaper,
  Globe,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-[#3E2F20]">
      {/* --- 1. HERO SECTION (Unchanged) --- */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop"
          alt="Farm Landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-[#FDF8E8] px-4">
          <span className="font-montserrat text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 block animate-fadeIn">
            Est. 2024 • Coimbatore
          </span>
          <h1 className="font-merriweather text-4xl md:text-6xl font-black mb-6 leading-tight">
            Guardians of the <br /> Golden Nectar
          </h1>
          <p className="max-w-2xl mx-auto font-montserrat text-sm md:text-base leading-relaxed opacity-90">
            We are not just beekeepers; we are scientists, farmers, and nature
            lovers dedicated to bringing you the purest honey while saving the
            bee population.
          </p>
        </div>
      </div>

      {/* --- 2. THE STORY SECTION (Unchanged) --- */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/about.jpeg"
              className="rounded-2xl shadow-xl w-full h-64 object-cover -mt-8"
              alt="Beekeeper"
            />
            <img
              src="/images/pantry/Sunflowerhoney.jpeg"
              className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8"
              alt="Honey Jar"
              onError={(e) =>
                (e.target.src =
                  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800")
              }
            />
          </div>

          <div>
            <span className="text-[#D98829] font-bold uppercase tracking-widest text-xs mb-2 block">
              Our Origin Story
            </span>
            <h2 className="font-merriweather text-3xl md:text-4xl font-bold mb-6">
              From Passion to Profession
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed font-light text-sm md:text-base">
              <p>
                It started with a single hive in a backyard in Coimbatore. What
                began as a scientific curiosity about the intricate lives of
                bees quickly turned into a lifelong obsession.
              </p>
              <p>
                At <strong>Dr. Honey Bee Farm</strong>, we believe that honey is
                nature's most perfect food. But in today's market, it's hard to
                find honey that hasn't been heated, processed, or adulterated.
              </p>
              <p>
                We set out to change that. We use scientific methods to monitor
                hive health, ensuring our bees are happy and strong, producing
                honey that is raw, unfiltered, and packed with natural enzymes.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#EAD2AC]/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#3E2F20] rounded-full flex items-center justify-center text-[#EAD2AC] font-serif font-black text-xl">
                Dr
              </div>
              <div>
                <p className="font-bold text-[#3E2F20]"> A. Esak</p>
                <p className="text-xs text-[#D98829] uppercase tracking-wider">
                  Founder & Chief Apiarist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. GLOBAL MEDIA RECOGNITION (UPDATED!) --- */}
      <div className="bg-[#FDF8E8] py-24 border-y border-[#EAD2AC]/40">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              International Feature
            </div>
            <h2 className="font-merriweather text-3xl md:text-4xl font-black text-[#3E2F20] mb-4">
              Making Headlines Globally
            </h2>
            <p className="max-w-2xl mx-auto text-stone-600 italic font-serif text-lg">
              "From Coimbatore to Russia, the world is watching our sustainable
              farming techniques."
            </p>
          </div>

          {/* Media Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1: RUSSIAN NEWS (Video Style) */}
            <div className="relative group cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-stone-100 transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                <Play size={10} fill="currentColor" /> WATCH VIDEO
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-black">
                {/* Placeholder for Video Thumbnail */}
                <img
                  src="https://images.unsplash.com/photo-1560343776-97e7d202ff88?q=80&w=1000&auto=format&fit=crop"
                  alt="Russian News Coverage"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                    <Play size={20} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  International News
                </span>
              </div>
              <h3 className="font-merriweather font-bold text-lg text-[#3E2F20] leading-tight">
                Featured in Russian Media
              </h3>
              <p className="text-xs text-stone-500 mt-2">
                A special report on our advanced queen rearing techniques aired
                on Russian national television.
              </p>
            </div>

            {/* CARD 2: DINA THANTHI (Newspaper Style) */}
            <div className="relative group cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-stone-100 transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-20">
                FRONT PAGE
              </div>
              <div className="h-48 rounded-xl overflow-hidden mb-4 bg-stone-100 border border-stone-200">
                {/* Placeholder for Newspaper Clipping */}
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
                  alt="Dina Thanthi Article"
                  className="w-full h-full object-cover sepia-[.3] group-hover:sepia-0 transition-all duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Newspaper size={14} className="text-stone-600" />
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Dina Thanthi
                </span>
              </div>
              <h3 className="font-serif font-black text-2xl text-[#3E2F20] leading-tight">
                தினத்தந்தி
              </h3>
              <p className="text-xs text-stone-500 mt-2">
                "Dr. Honey Bee Farm sets a new benchmark in organic apiculture
                in Tamil Nadu."
              </p>
            </div>

            {/* CARD 3: LOCAL DAILIES (Collage Style) */}
            <div className="relative group cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-stone-100 transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-stone-900/10 z-10 group-hover:bg-transparent transition-colors"></div>
                {/* Collage Image */}
                <img
                  src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=2070&auto=format&fit=crop"
                  alt="Various Newspapers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-stone-600" />
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Local Press
                </span>
              </div>
              <h3 className="font-merriweather font-bold text-lg text-[#3E2F20] leading-tight">
                Various Local Dailies
              </h3>
              <p className="text-xs text-stone-500 mt-2">
                Regularly featured in The Hindu Tamil, Dinamalar, and
                agricultural magazines for our training programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. VALUES SECTION (Unchanged) --- */}
      <div className="bg-[#3E2F20] text-[#FDF8E8] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-merriweather text-3xl font-bold mb-4">
              Our Core Philosophy
            </h2>
            <p className="text-[#EAD2AC] opacity-80 max-w-xl mx-auto">
              We follow the rhythm of nature, not the demands of the market.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Cruelty Free",
                desc: "We leave enough honey for the bees to survive winter comfortably.",
              },
              {
                icon: Shield,
                title: "100% Raw",
                desc: "Never heated above hive temperature to preserve enzymes.",
              },
              {
                icon: Sun,
                title: "Sustainable",
                desc: "We plant bee-friendly flora to support the local ecosystem.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "We train local farmers to become beekeepers for extra income.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#4A3B2C] p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-12 h-12 mx-auto bg-[#EAD2AC] rounded-full flex items-center justify-center text-[#3E2F20] mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
