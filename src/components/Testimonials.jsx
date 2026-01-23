import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    text: "I haven't tasted honey like this since I was a child. The raw wildflower honey is absolutely incredible on toast.",
    stars: 5,
  },
  {
    id: 2,
    name: "Chef Marco D.",
    role: "Restaurant Owner",
    text: "The spiced blend has become a secret ingredient in my autumn dessert menu. The consistency is perfect.",
    stars: 5,
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Health Enthusiast",
    text: "Finally, a farm that actually publishes their lab reports. I use the raw honey daily for immunity support.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FDFCF8] relative overflow-hidden">
      {/* Optional: Subtle Background Texture (If you want it) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#3E2F20] mb-4 font-serif tracking-tight">
            SWEET WORDS FROM THE HIVE
          </h2>
          <div className="w-24 h-1 bg-[#EAD2AC] mx-auto rounded-full"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FDF8E8] p-8 rounded-xl border border-[#EAD2AC] shadow-sm relative group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Giant Quote Icon Decoration */}
              <div className="absolute top-4 right-6 opacity-10 text-[#5C4D3C]">
                <Quote size={60} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#5C4D3C] font-medium leading-relaxed mb-8 italic relative z-10">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-[#EAD2AC]/50 pt-4 mt-auto flex items-center gap-3">
                {/* Avatar Placeholder (Optional) */}
                <div className="w-10 h-10 rounded-full bg-[#EAD2AC] flex items-center justify-center text-[#3E2F20] font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#3E2F20] text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#8C7A63] uppercase tracking-wider">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
