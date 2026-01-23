import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
// 1. IMPORT THE HOOK
import { useCart } from "../context/CartContext";

const ProductShowcase = () => {
  // 2. GET THE FUNCTION FROM THE BRAIN
  const { addToCart } = useCart();

  // --- DATA: ALL YOUR PRODUCTS ---
  const products = [
    // 1. HONEY & EDIBLES
    {
      id: 1,
      name: "Moringa Honey",
      category: "honey",
      price: "₹450",
      img: "/images/pantry/Moringahoney.jpeg",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "Sunflower Honey",
      category: "honey",
      price: "₹350",
      img: "/images/pantry/Sunflowerhoney.jpeg",
    },
    {
      id: 3,
      name: "Multiflower Honey",
      category: "honey",
      price: "₹400",
      img: "/images/pantry/Multiflowerhoney.jpeg",
    },
    {
      id: 4,
      name: "Leaf Honey",
      category: "honey",
      price: "₹600",
      img: "/images/pantry/Leafhoney.jpeg",
      tag: "Rare",
    },
    {
      id: 5,
      name: "Pure Bee Pollen",
      category: "honey",
      price: "₹800",
      img: "/images/pantry/beepollen.jpeg",
    },
    {
      id: 6,
      name: "Organic Beeswax",
      category: "honey",
      price: "₹300",
      img: "/images/pantry/Beewax.jpeg",
    },

    // 2. BEEKEEPING EQUIPMENT
    {
      id: 7,
      name: "Honey Extractor",
      category: "equipment",
      price: "₹8,500",
      img: "/images/apiary/Honey extractor.jpeg",
    },
    {
      id: 8,
      name: "Bee Smoker",
      category: "equipment",
      price: "₹650",
      img: "/images/apiary/Bee smoker.jpeg",
    },
    {
      id: 9,
      name: "Uncapping Knife",
      category: "equipment",
      price: "₹450",
      img: "/images/apiary/Bee Knife.jpeg",
    },
    {
      id: 10,
      name: "Protective Gloves",
      category: "equipment",
      price: "₹350",
      img: "/images/apiary/Gloves.jpeg",
    },
    {
      id: 11,
      name: "Bee Veil (Mesh)",
      category: "equipment",
      price: "₹250",
      img: "/images/apiary/Bee vail.jpeg",
    },
    {
      id: 12,
      name: "Full Bee Suit",
      category: "equipment",
      price: "₹1,800",
      img: "/images/apiary/Full suite.jpeg",
    },
    {
      id: 13,
      name: "Half Jacket Suit",
      category: "equipment",
      price: "₹1,200",
      img: "/images/apiary/Half suite.jpeg",
    },
    {
      id: 14,
      name: "Bee Hive Box",
      category: "equipment",
      price: "₹2,500",
      img: "/images/colony/wooden-beehive.jpeg",
      desc: "Available in Italian, Indian, Stingless",
    },

    // 3. LIVE BEES
    {
      id: 15,
      name: "Italian Bee Colony",
      category: "bees",
      price: "₹3,500",
      img: "/images/colony/Italian bee.jpg",
      tag: "High Yield",
    },
    {
      id: 16,
      name: "Indian Bee Colony",
      category: "bees",
      price: "₹2,000",
      img: "/images/colony/indianbees.jpg",
    },
    {
      id: 17,
      name: "Stingless Bee Colony",
      category: "bees",
      price: "₹1,500",
      img: "/images/colony/stinglessbee.jpg",
      tag: "Medicinal Honey",
    },
  ];

  // State to filter visible category
  const [activeTab, setActiveTab] = useState("all");

  // Filter logic
  const displayedProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-16 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION TITLE */}
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-3xl md:text-4xl text-[#3E2F20] font-bold">
            Our Farm Shop
          </h2>
          <p className="text-[#8C7A63] mt-2 font-montserrat uppercase tracking-widest text-sm">
            From the hive to your home
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["all", "honey", "equipment", "bees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-[#D98829] text-white shadow-md"
                  : "bg-white text-[#5C4D3C] border border-[#EAD2AC] hover:bg-[#FDF8E8]"
              }`}
            >
              {tab === "all"
                ? "All Products"
                : tab === "bees"
                ? "Live Bees"
                : tab}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2] overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="relative h-64 bg-[#F9F5F0] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[#D6C0A0] font-bold text-xl uppercase opacity-30">
                  {product.name}
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-[#D98829] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow text-center">
                <h3 className="font-merriweather text-lg font-bold text-[#3E2F20] mb-1">
                  {product.name}
                </h3>
                {product.desc && (
                  <p className="text-xs text-gray-500 mb-2">{product.desc}</p>
                )}
                <div className="mt-auto pt-3">
                  <p className="font-montserrat text-[#D98829] font-bold text-lg mb-3">
                    {product.price}
                  </p>

                  {/* 3. ATTACH THE CLICK HANDLER HERE */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 border-2 border-[#3E2F20] text-[#3E2F20] font-bold text-xs uppercase hover:bg-[#3E2F20] hover:text-white transition-colors rounded active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
