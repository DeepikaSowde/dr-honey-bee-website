import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext"; // <--- 1. Import the Context Hook

const ProductListPage = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();

  // --- PRODUCT DATA BASE ---
  const products = {
    // 1. THE PANTRY (Honey, Wax, Pollen)
    pantry: [
      {
        id: 101,
        name: "Murunga Honey",
        price: "₹650",
        tag: "Medicinal",
        img: "/images/pantry/Moringahoney.jpeg",
      },
      {
        id: 102,
        name: "Sunflower Honey",
        price: "₹550",
        tag: "Seasonal",
        img: "/images/pantry/Sunflowerhoney.jpeg",
      },
      {
        id: 103,
        name: "Multiflower Honey",
        price: "₹450",
        tag: "Popular",
        img: "/images/pantry/Multiflowerhoney.jpeg",
      },
      {
        id: 104,
        name: "Leaf Honey",
        price: "₹600",
        tag: "Rare",
        img: "/images/pantry/Leafhoney.jpeg",
      },
      {
        id: 105,
        name: "Pure Beeswax",
        price: "₹800/kg",
        tag: "Raw Block",
        img: "/images/pantry/Beewax.jpeg",
      },
      {
        id: 106,
        name: "Bee Pollen",
        price: "₹1200",
        tag: "Superfood",
        img: "/images/pantry/beepollen.jpeg",
      },
    ],

    // 2. THE APIARY (Equipment & Gear)
    apiary: [
      {
        id: 201,
        name: "Honey Extractor",
        price: "₹12,500",
        tag: "Machinery",
        img: "/images/apiary/Honey extractor.jpeg",
      },
      {
        id: 202,
        name: "Bee Smoker",
        price: "₹850",
        tag: "Essential",
        img: "/images/apiary/Bee smoker.jpeg",
      },
      {
        id: 203,
        name: "Uncapping Knife",
        price: "₹450",
        tag: "Tool",
        img: "/images/apiary/Bee Knife.jpeg",
      },
      {
        id: 204,
        name: "Bee Veil",
        price: "₹350",
        tag: "Safety",
        img: "/images/apiary/Bee vail.jpeg",
      },
      {
        id: 205,
        name: "Bee Gloves",
        price: "₹600",
        tag: "Leather",
        img: "/images/apiary/Gloves.jpeg",
      },
      {
        id: 206,
        name: "Full Bee Suit",
        price: "₹2,200",
        tag: "Protection",
        img: "/images/apiary/Full suite.jpeg",
      },
      {
        id: 207,
        name: "Half Bee Jacket",
        price: "₹1,500",
        tag: "Protection",
        img: "/images/apiary/Half suite.jpeg",
      },
      {
        id: 208,
        name: "Indian Bee Hive",
        price: "₹2,500",
        tag: "Wooden Box",
        img: "/images/colony/wooden-beehive.jpeg",
      },
      {
        id: 209,
        name: "Italian Bee Hive",
        price: "₹3,200",
        tag: "Langstroth",
        img: "/images/colony/Italian bee hive.jpeg",
      },
      {
        id: 210,
        name: "Stingless Hive Box",
        price: "₹1,800",
        tag: "Specialized",
        img: "/images/colony/bee hive types.jpg",
      },
    ],

    // 3. THE COLONY (Live Bees)
    colony: [
      {
        id: 301,
        name: "Italian Bee Colony",
        price: "₹4,500",
        tag: "Apis Mellifera",
        img: "/images/colony/Italian bee.jpg",
      },
      {
        id: 302,
        name: "Indian Bee Colony",
        price: "₹3,000",
        tag: "Apis Cerana",
        img: "/images/colony/indianbees.jpg",
      },
      {
        id: 303,
        name: "Stingless Bee Colony",
        price: "₹2,500",
        tag: "Dammer Bee",
        img: "/images/colony/stinglessbee.jpg",
      },
    ],
  };

  const currentProducts = products[categoryId] || [];

  // Title formatting helper
  const titles = {
    pantry: "The Pantry (Honey & Goods)",
    apiary: "The Apiary (Equipment)",
    colony: "The Colony (Live Bees)",
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header Banner */}
      <div className="bg-[#3E2F20] text-[#EAD2AC] py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-merriweather mb-4 capitalize">
          {titles[categoryId] || "Our Shop"}
        </h1>
        <p className="font-montserrat text-sm tracking-widest uppercase opacity-80">
          Farm Fresh & Quality Tested
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-bold text-[#5C4D3C] hover:text-[#D98829] mb-8 transition-colors"
        >
          ← BACK TO HOME
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#EAD2AC]/30"
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-3 right-3 bg-[#D98829] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info Area */}
                <div className="p-6">
                  <h3 className="font-merriweather text-xl text-[#3E2F20] mb-2 group-hover:text-[#D98829] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-[#5C4D3C]">
                      {product.price}
                    </p>
                    {/* --- ADD TO CART BUTTON --- */}
                    <button
                      onClick={() => addToCart(product)} // <--- 3. Connected Action
                      className="bg-[#3E2F20] text-white p-2 rounded-full hover:bg-[#D98829] transition-colors shadow-md active:scale-95"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </button>
                    {/* ------------------------- */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500 font-serif">
                Select a valid category to view products.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block text-[#D98829] underline"
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
