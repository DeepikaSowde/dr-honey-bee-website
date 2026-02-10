import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// Ensure this path is correct based on your project structure
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find product by ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF8]">
        <h2 className="text-xl md:text-2xl font-serif text-[#3E2F20]">
          Product not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-[#D98829] underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    // Padding: py-6 on mobile, py-10 on desktop
    <div className="bg-[#FDFCF8] min-h-screen py-6 md:py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#8C7A63] hover:text-[#3E2F20] mb-6 md:mb-8 transition group text-sm md:text-base"
        >
          <ArrowLeft
            size={18}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to Shop
        </button>

        {/* Grid Layout: Stacked on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side: Image */}
          {/* Sticky positioning keeps image in view on desktop scrolling */}
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-[#EAD2AC]/30 md:sticky md:top-24">
            <div className="relative overflow-hidden rounded-xl bg-[#F9F5F0]">
              {product.tag && (
                <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#D98829] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wide shadow-sm">
                  {product.tag}
                </span>
              )}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="pt-2 md:pt-4">
            <span className="text-[#D98829] font-bold tracking-widest text-[10px] md:text-xs uppercase border border-[#D98829]/30 px-3 py-1 rounded-full bg-[#FFF8EE]">
              {product.category}
            </span>

            {/* Title Size: text-3xl on mobile, text-5xl on desktop */}
            <h1 className="text-3xl md:text-5xl font-merriweather font-black text-[#3E2F20] mt-3 md:mt-4 mb-3 md:mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-2xl md:text-3xl font-montserrat font-bold text-[#D98829] mb-4 md:mb-6">
              {product.price}
            </p>

            <p className="text-[#5C4D3C] text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {product.description}
            </p>

            {/* Benefits Section */}
            {product.benefits && (
              <div className="mb-8 md:mb-10 bg-white p-5 md:p-6 rounded-2xl border border-[#EAD2AC]/30 shadow-sm">
                <h3 className="font-bold text-[#3E2F20] mb-3 md:mb-4 font-serif text-base md:text-lg">
                  Key Benefits:
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start text-[#5C4D3C] font-medium text-sm md:text-base"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-600 mr-3 flex-shrink-0 mt-0.5"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-3 md:py-4 bg-[#3E2F20] text-white font-bold rounded-xl hover:bg-[#5C4D3C] transition flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-[#3E2F20]/20 text-sm md:text-base"
              >
                <ShoppingCart size={18} md={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
