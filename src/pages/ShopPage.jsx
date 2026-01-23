import React, { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ShopPage = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // --- YOUR PRODUCT DATA ---
  const products = [
    // 1. HONEY
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

    // 2. EQUIPMENT
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
      desc: "Standard Size",
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
      tag: "Medicinal",
    },
  ];

  // --- FILTER LOGIC (Category + Search) ---
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeTab === "all" || product.category === activeTab;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans">
      {/* --- PAGE HEADER --- */}
      <div className="bg-[#FDF8E8] py-12 px-6 text-center border-b border-[#EAD2AC]/30">
        <h1 className="font-merriweather text-4xl font-black text-[#3E2F20] mb-2">
          Our Farm Shop
        </h1>
        <p className="font-montserrat text-xs text-[#8C7A63] uppercase tracking-widest mb-8">
          Fresh from the hive to your home
        </p>

        {/* --- SEARCH BAR --- */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search honey, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#EAD2AC] bg-white text-[#3E2F20] focus:outline-none focus:ring-2 focus:ring-[#D98829] transition-all shadow-sm"
          />
          <Search
            className="absolute left-4 top-3.5 text-stone-400"
            size={18}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* --- CATEGORY TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "honey", "equipment", "bees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-[#3E2F20] text-white shadow-md"
                  : "bg-white text-[#5C4D3C] border border-[#EAD2AC] hover:bg-[#FDF8E8]"
              }`}
            >
              {tab === "all" ? "All Products" : tab}
            </button>
          ))}
        </div>

        {/* --- PRODUCT GRID --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2]"
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden rounded-xl bg-[#F9F5F0]">
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-[#D98829] text-white text-[9px] font-bold px-2 py-1 rounded-full z-10 uppercase tracking-wide">
                      {product.tag}
                    </span>
                  )}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* Quick Add Button (Hover) */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-3 right-3 bg-white text-[#3E2F20] p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#3E2F20] hover:text-white"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4 text-center pb-2">
                  <h3 className="font-merriweather font-bold text-[#3E2F20] text-sm md:text-base leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="font-montserrat text-[#D98829] font-bold text-sm">
                      {product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full py-2 border border-[#3E2F20] rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#3E2F20] hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- EMPTY STATE ---
          <div className="text-center py-20">
            <p className="text-stone-400 italic">
              No products found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-4 text-[#D98829] font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
