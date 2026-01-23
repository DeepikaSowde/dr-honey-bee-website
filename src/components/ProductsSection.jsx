import React from "react";
import ProductCard from "./ProductCard"; // Ensure you have ProductCard.jsx in the same folder

// 1. Data Array (Defined here so it is not undefined)
const products = [
  {
    id: 1,
    title: "Raw Wildflower Honey",
    price: "$12.00",
    description:
      "Unprocessed, pure honey harvested straight from our wildflower meadows.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Organic Honeycomb",
    price: "$18.50",
    description: "The purest form of honey, cut directly from the hive frame.",
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e8913d179?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Spiced Honey Blend",
    price: "$14.00",
    description: "Infused with cinnamon and star anise for a warming treat.",
    image:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=400",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 bg-[#faf7f2] relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#3d2b1f] mb-4 uppercase tracking-wider font-serif">
            Featured from the Farm
          </h2>
          <div className="w-24 h-1.5 bg-[#d97706] mx-auto rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="border-2 border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white px-10 py-3 rounded-full font-bold transition-colors uppercase tracking-widest text-sm">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
