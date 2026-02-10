import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ShopPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { category } = useParams();

  // --- LIVE DATA STATES ---
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch live products
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch(
          "https://dr-honey-bee-website.onrender.com/api/products",
        );
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
          console.log("🔥 API DATA RECEIVED:", data);
        }
      } catch (err) {
        console.error("Error fetching from database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);

  // 2. Sync activeTab with URL
  useEffect(() => {
    if (!category) {
      setActiveTab("all");
    } else {
      setActiveTab(category.toLowerCase());
    }
  }, [category]);

  // --- FILTER LOGIC ---
  const filteredProducts = dbProducts.filter((product) => {
    const productCategory = product.category
      ? product.category.toLowerCase().trim()
      : "others";
    const matchesCategory =
      activeTab === "all" || productCategory === activeTab;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCF8]">
        <p className="text-[#3E2F20] font-merriweather italic text-lg">
          Gathering products from the hive...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans">
      {/* Header */}
      {/* Padding: py-8 on mobile, py-12 on desktop */}
      <div className="bg-[#FDF8E8] py-8 md:py-12 px-4 md:px-6 text-center border-b border-[#EAD2AC]/30">
        <h1 className="font-merriweather text-3xl md:text-4xl font-black text-[#3E2F20] mb-2">
          Our Farm Shop
        </h1>
        <p className="font-montserrat text-[10px] md:text-xs text-[#8C7A63] uppercase tracking-widest mb-6 md:mb-8">
          Fresh from the hive to your home
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search honey, equipment, soap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-full border border-[#EAD2AC] bg-white text-[#3E2F20] focus:outline-none focus:ring-2 focus:ring-[#D98829] shadow-sm text-sm md:text-base"
          />
          <Search
            className="absolute left-3.5 md:left-4 top-3 md:top-3.5 text-stone-400"
            size={16}
            md={18}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Category Tabs */}
        {/* Gap: gap-2 on mobile, gap-3 on desktop */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {["all", "honey", "equipment", "soap"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                navigate(tab === "all" ? "/shop" : `/shop/${tab}`);
              }}
              // Button Size: Smaller on mobile
              className={`px-4 py-2 md:px-6 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-[#3E2F20] text-white shadow-md"
                  : "bg-white text-[#5C4D3C] border border-[#EAD2AC] hover:bg-[#FDF8E8]"
              }`}
            >
              {tab === "all"
                ? "All Products"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {/* Grid: 2 columns on mobile (grid-cols-2), 4 on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl md:rounded-2xl p-2 md:p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2]"
              >
                {/* Image */}
                <div
                  className="h-36 md:h-48 relative overflow-hidden rounded-lg md:rounded-xl bg-[#F9F5F0] cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Quick Add Button (Visible on hover on desktop, or tap on mobile) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-white text-[#3E2F20] p-1.5 md:p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-[#3E2F20] hover:text-white"
                  >
                    <ShoppingCart size={14} md={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-2 md:mt-4 text-center pb-2">
                  <h3
                    className="font-merriweather font-bold text-[#3E2F20] text-xs md:text-base leading-tight cursor-pointer hover:text-[#D98829] line-clamp-2 min-h-[2.5em]"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="font-montserrat text-[#D98829] font-bold text-xs md:text-sm mt-1 md:mt-2">
                    ₹{product.price}
                  </p>

                  {/* Add to Cart Button (Full width) */}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 md:mt-3 w-full py-1.5 md:py-2 border border-[#3E2F20] rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider hover:bg-[#3E2F20] hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-stone-400 italic">
              No products found in the hive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
