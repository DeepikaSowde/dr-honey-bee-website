import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ShopPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { category } = useParams(); // Retrieves category from URL like "honey"

  // --- LIVE DATA STATES ---
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch live products from your Render backend
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch(
          "https://dr-honey-bee-website.onrender.com/api/products",
        );
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
        }
      } catch (err) {
        console.error("Error fetching from database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);

  // 2. Sync activeTab with URL category change
  useEffect(() => {
    if (!category) {
      setActiveTab("all");
    } else {
      // Ensure we set the tab to lowercase to match our logic below
      setActiveTab(category.toLowerCase());
    }
  }, [category]);

  // --- FILTER LOGIC (UPDATED) ---
  const filteredProducts = dbProducts.filter((product) => {
    // 1. Get product category safely (convert to lowercase & remove spaces)
    // This ensures "Honey" from DB matches "honey" from URL
    const productCategory = product.category
      ? product.category.toLowerCase().trim()
      : "others";

    // 2. Compare with active tab
    // We check if the active tab is "all" OR if the product category matches
    const matchesCategory =
      activeTab === "all" || productCategory === activeTab;

    // 3. Search Filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCF8]">
        <p className="text-[#3E2F20] font-merriweather italic">
          Gathering products from the hive...
        </p>
      </div>
    );
  }

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

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search honey, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#EAD2AC] bg-white text-[#3E2F20] focus:outline-none focus:ring-2 focus:ring-[#D98829] shadow-sm"
          />
          <Search
            className="absolute left-4 top-3.5 text-stone-400"
            size={18}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "honey", "equipment", "bees"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                // Clicking a tab updates the URL
                navigate(tab === "all" ? "/shop" : `/shop/${tab}`);
              }}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-all ${
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2]"
              >
                <div
                  className="h-48 relative overflow-hidden rounded-xl bg-[#F9F5F0] cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-3 right-3 bg-white text-[#3E2F20] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#3E2F20] hover:text-white"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
                <div className="mt-4 text-center pb-2">
                  <h3
                    className="font-merriweather font-bold text-[#3E2F20] text-sm md:text-base leading-tight cursor-pointer hover:text-[#D98829]"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="font-montserrat text-[#D98829] font-bold text-sm mt-2">
                    ₹{product.price}
                  </p>
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
