// src/pages/ShopPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products"; // 👇 Import data from the external file

const ShopPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // 👇 Initialize hook
  const { category } = useParams();

  const [activeTab, setActiveTab] = useState(category || "all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (category) {
      setActiveTab(category);
    } else {
      setActiveTab("all");
    }
  }, [category]);

  // --- FILTER LOGIC ---
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
      {/* Header */}
      <div className="bg-[#FDF8E8] py-12 px-6 text-center border-b border-[#EAD2AC]/30">
        <h1 className="font-merriweather text-4xl font-black text-[#3E2F20] mb-2">
          Our Farm Shop
        </h1>
        <p className="font-montserrat text-xs text-[#8C7A63] uppercase tracking-widest mb-8">
          Fresh from the hive to your home
        </p>

        {/* Search */}
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
        {/* Tabs */}
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

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2]"
              >
                {/* Image Container */}
                <div
                  className="h-48 relative overflow-hidden rounded-xl bg-[#F9F5F0] cursor-pointer"
                  // 👇 CLICKING IMAGE GOES TO DETAILS PAGE
                  onClick={() => navigate(`/product/${product.id}`)}
                >
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents clicking the image
                      addToCart(product);
                    }}
                    className="absolute bottom-3 right-3 bg-white text-[#3E2F20] p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#3E2F20] hover:text-white"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4 text-center pb-2">
                  <h3
                    className="font-merriweather font-bold text-[#3E2F20] text-sm md:text-base leading-tight cursor-pointer hover:text-[#D98829] transition-colors"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
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
          <div className="text-center py-20">
            <p className="text-stone-400 italic">No products found.</p>
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
