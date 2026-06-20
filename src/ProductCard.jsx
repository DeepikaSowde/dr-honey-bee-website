import React from "react";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ title, price, image, description }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e6d5b8] group flex flex-col h-full">
      {/* Image Container */}
      <div className="h-64 overflow-hidden relative bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-[#5C4033] text-white px-6 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg hover:bg-[#8C7A63]">
            <ShoppingBag size={18} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center flex flex-col flex-grow">
        <h3 className="font-serif text-xl text-[#3d2b1f] mb-2 font-bold">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="text-[#d97706] font-bold text-lg">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
