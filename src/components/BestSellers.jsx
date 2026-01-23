import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const BestSellers = () => {
  const { addToCart } = useCart();

  // ONLY SHOW YOUR TOP 4 PRODUCTS HERE
  const topProducts = [
    {
      id: 1,
      name: "Moringa Honey",
      price: "₹450",
      image: "/images/pantry/Moringahoney.jpeg",
      tag: "Top Rated",
    },
    {
      id: 15, // Make sure IDs match your main data
      name: "Italian Bee Colony",
      price: "₹3,500",
      image: "/images/colony/Italian bee.jpg",
      tag: "Best Seller",
    },
    {
      id: 7,
      name: "Honey Extractor",
      price: "₹8,500",
      image: "/images/apiary/Honey extractor.jpeg",
    },
    {
      id: 5,
      name: "Pure Bee Pollen",
      price: "₹800",
      image: "/images/pantry/beepollen.jpeg",
      tag: "Superfood",
    },
  ];

  return (
    <section className="py-20 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">
              Fresh Harvest
            </span>
            <h2 className="text-4xl font-serif font-black text-[#3E2F20] mt-2">
              Farm Favorites
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 text-[#5C4D3C] font-bold uppercase tracking-wider hover:text-amber-600 transition-colors"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        {/* GRID (Limit to 4 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAD2AC]/30"
            >
              {/* IMAGE */}
              <div className="h-56 relative overflow-hidden rounded-xl bg-[#F9F5F0]">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#D98829] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                />

                {/* QUICK ADD BUTTON (Appears on Hover) */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-white text-[#3E2F20] p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#3E2F20] hover:text-white"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>

              {/* INFO */}
              <div className="mt-4">
                <h3 className="font-merriweather font-bold text-[#3E2F20] text-lg leading-tight">
                  {product.name}
                </h3>
                <p className="font-montserrat text-[#D98829] font-bold mt-1 text-lg">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#3E2F20] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs"
          >
            Shop All <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
