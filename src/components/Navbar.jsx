import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext"; // Ensure this path matches your folder structure

const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FDFCF8] sticky top-0 z-50 border-b border-[#EAD2AC]/50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= DESKTOP LAYOUT (Split Menu) ================= */}
        <div className="hidden md:flex items-center justify-between h-24">
          {/* LEFT MENU (Home & Shop) */}
          <div className="flex items-center gap-8 flex-1 justify-end pr-12">
            <Link
              to="/"
              className="font-montserrat text-sm font-bold text-[#5C4D3C] hover:text-[#D98829] tracking-wider transition-colors"
            >
              HOME
            </Link>
            {/* LINK TO YOUR NEW PRODUCT SHOWCASE PAGE */}
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

          {/* CENTER LOGO (The Round Circle) */}
          <Link to="/" className="flex-shrink-0 relative z-10 group">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-[#FDFCF8] shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 mt-4">
              <img
                src="/logodrhoney.jpeg" // Make sure this matches your public folder image name
                alt="Dr. Honey Logo"
                className="w-14 object-contain opacity-90"
              />
            </div>
          </Link>

          {/* RIGHT MENU (Contact & Cart) */}
          <div className="flex items-center gap-8 flex-1 pl-12">
            <Link
              to="/contact"
              className="font-montserrat text-sm font-bold text-[#5C4D3C] hover:text-[#D98829] tracking-wider transition-colors"
            >
              CONTACT
            </Link>

            {/* CART ICON WITH BADGE */}
            <Link
              to="/cart"
              className="text-[#5C4D3C] hover:text-[#D98829] transition-colors relative"
            >
              <ShoppingCart size={22} strokeWidth={2.5} />

              {/* Red Badge Logic */}
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ================= MOBILE LAYOUT (Hamburger) ================= */}
        <div className="md:hidden flex items-center justify-between h-20">
          {/* Mobile Logo */}
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
            {/* Mobile Cart */}
            <Link to="/cart" className="relative text-[#5C4D3C]">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu Button */}
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
        className={`md:hidden bg-[#FDFCF8] border-t border-[#EAD2AC] overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-60 opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
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
            to="/products"
            onClick={() => setIsMenuOpen(false)}
            className="font-montserrat font-bold text-[#5C4D3C] hover:text-amber-600"
          >
            SHOP PRODUCTS
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
