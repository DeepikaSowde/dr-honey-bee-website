import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
// 👇 1. Import hook
import { useCart } from "../context/CartContext";

const Navbar = () => {
  // 👇 2. Destructure 'cartItems' (to check if empty) and 'totalItems' (for the number)
  // We rename cartItems to 'cart' here just to make the rest of the code easier to read,
  // or you can just change the variables below.
  const { cartItems, totalItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FDFCF8] sticky top-0 z-50 border-b border-[#EAD2AC]/50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:flex items-center justify-between h-24">
          {/* LEFT MENU */}
          <div className="flex items-center gap-8 flex-1 justify-end pr-12">
            <Link
              to="/"
              className="font-montserrat text-sm font-bold text-[#5C4D3C] hover:text-[#D98829] tracking-wider transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/shop"
              className="font-montserrat text-sm font-bold text-[#3E2F20] hover:text-[#D98829] tracking-wider transition-colors"
            >
              SHOP
            </Link>
            <Link
              to="/about"
              className="font-montserrat text-sm font-bold text-[#3E2F20] hover:text-[#D98829] tracking-wider transition-colors"
            >
              ABOUT
            </Link>
          </div>

          {/* CENTER LOGO */}
          <Link to="/" className="flex-shrink-0 relative z-10 group">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-[#FDFCF8] shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 mt-4">
              <img
                src="/logodrhoney.jpeg"
                alt="Dr. Honey Logo"
                className="w-14 object-contain opacity-90"
              />
            </div>
          </Link>

          {/* RIGHT MENU */}
          <div className="flex items-center gap-8 flex-1 pl-12">
            <Link
              to="/contact"
              className="font-montserrat text-sm font-bold text-[#5C4D3C] hover:text-[#D98829] tracking-wider transition-colors"
            >
              CONTACT
            </Link>

            {/* CART ICON */}
            <Link
              to="/cart"
              className="text-[#5C4D3C] hover:text-[#D98829] transition-colors relative"
            >
              <ShoppingCart size={22} strokeWidth={2.5} />

              {/* 👇 3. Check if cartItems has length */}
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {/* 👇 4. Use totalItems (calculated in context) for the badge number */}
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full border border-[#EAD2AC] flex items-center justify-center">
              <img
                src="/logodrhoney.jpeg"
                alt="Logo"
                className="w-6 opacity-90"
              />
            </div>
            <span className="font-merriweather font-bold text-[#3E2F20]">
              Dr. Honey
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative text-[#5C4D3C]">
              <ShoppingCart size={24} />

              {/* Mobile Badge Logic */}
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3E2F20] hover:text-amber-600 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      <div
        className={`md:hidden bg-[#FDFCF8] border-t border-[#EAD2AC] overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-60 opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}
      >
        <div className="flex flex-col gap-6 text-center">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="font-montserrat font-bold text-[#5C4D3C] hover:text-amber-600"
          >
            HOME
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="font-montserrat font-bold text-[#5C4D3C] hover:text-amber-600"
          >
            SHOP PRODUCTS
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="font-montserrat font-bold text-[#5C4D3C] hover:text-amber-600"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="font-montserrat font-bold text-[#5C4D3C] hover:text-amber-600"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
