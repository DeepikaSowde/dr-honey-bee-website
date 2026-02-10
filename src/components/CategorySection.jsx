import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "pantry",
      link: "honey",
      title: "THE PANTRY",
      subtitle: "(For Eaters)",
      buttonText: "Shop Raw Honey & Goods",
      image: "/images/Pantry.jpeg",
      textColor: "text-white",
    },
    {
      id: "apiary",
      link: "equipment",
      title: "THE APIARY",
      subtitle: "(For Farmers)",
      buttonText: "Shop Equipment & Gear",
      image: "/images/Apiary.jpeg",
      textColor: "text-white",
    },
    {
      id: "colony",
      link: "bees", // Updated link for soap category if needed
      title: "COSMETICS",
      subtitle: "(Soaps, Balms & More)",
      buttonText: "Buy Now",
      image: "/images/soap.png",
      textColor: "text-white",
    },
  ];

  const handleCardClick = (categoryLink) => {
    navigate(`/shop/${categoryLink}`);
  };

  return (
    // Responsive Padding: Less vertical padding on mobile (py-10) vs desktop (py-16)
    <section className="w-full bg-[#FDFBF7] py-10 px-4 md:py-16">
      {/* Grid Layout:
          - grid-cols-1: Mobile (Stacks vertically)
          - md:grid-cols-3: Tablet/Desktop (Side-by-side)
          - gap-6: Smaller gap on mobile
          - md:gap-8: Larger gap on desktop
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCardClick(cat.link)}
            // Responsive Height: 400px on mobile, 500px on desktop
            className="group cursor-pointer relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            </div>

            {/* Content */}
            {/* Responsive Padding inside card: py-8 on mobile, py-12 on desktop */}
            <div className="relative z-10 h-full flex flex-col justify-between items-center py-8 px-4 md:py-12 md:px-6 text-center">
              <div>
                {/* Title Size: text-2xl on mobile, text-3xl on desktop */}
                <h2
                  className={`text-2xl md:text-3xl font-serif tracking-wider ${cat.textColor}`}
                >
                  {cat.title}
                </h2>
                {/* Subtitle Size: text-base on mobile, text-lg on desktop */}
                <p
                  className={`mt-1 md:mt-2 text-base md:text-lg font-serif italic opacity-90 ${cat.textColor}`}
                >
                  {cat.subtitle}
                </p>
              </div>

              {/* Button Size: Smaller padding/text on mobile */}
              <button className="bg-[#FDFBF7] hover:bg-white text-gray-900 text-[10px] md:text-xs font-bold py-3 px-5 md:py-4 md:px-6 uppercase tracking-widest border border-gray-200 rounded-sm transition-colors">
                {cat.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
