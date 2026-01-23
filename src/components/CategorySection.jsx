import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "pantry", // This ID matches the URL we want to go to
      title: "THE PANTRY",
      subtitle: "(For Eaters)",
      buttonText: "Shop Raw Honey & Goods",
      image: "/images/Pantry.jpg",
      textColor: "text-gray-900", // Dark text for light background images
    },
    {
      id: "apiary",
      title: "THE APIARY",
      subtitle: "(For Farmers)",
      buttonText: "Shop Equipment & Gear",
      image: "/images/Apiary.jpg",
      textColor: "text-white", // Light text for dark background images
    },
    {
      id: "colony",
      title: "THE COLONY",
      subtitle: "(Live Stock)",
      buttonText: "Buy Live Bees & Hives",
      image: "/images/Colony.jpg",
      textColor: "text-white",
    },
  ];

  const handleCardClick = (categoryId) => {
    // Navigate to the product page with the category ID
    navigate(`/shop/${categoryId}`);
  };

  return (
    <section className="w-full bg-[#FDFBF7] py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCardClick(cat.id)}
            className="group cursor-pointer relative h-[500px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between items-center py-12 px-6 text-center">
              <div>
                <h2
                  className={`text-3xl font-serif tracking-wider ${cat.textColor}`}
                >
                  {cat.title}
                </h2>
                <p
                  className={`mt-2 text-lg font-serif italic opacity-90 ${cat.textColor}`}
                >
                  {cat.subtitle}
                </p>
              </div>

              <button className="bg-[#FDFBF7] hover:bg-white text-gray-900 text-xs font-bold py-4 px-6 uppercase tracking-widest border border-gray-200 rounded-sm">
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
