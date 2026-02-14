import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartItems, totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // UPDATED: Path for GALLERY changed from "/#gallery" to "/gallery"
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "GALLERY", path: "/gallery" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FDFCF8] sticky top-0 z-50 border-b border-[#EAD2AC]/50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:flex items-center justify-between h-24">
          {/* LEFT MENU */}
          <div className="flex items-center gap-8 flex-1 justify-end pr-12">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-montserrat text-[11px] font-bold tracking-[0.2em] transition-colors ${
                  isActive(link.path)
                    ? "text-[#D98829]"
                    : "text-[#5C4D3C] hover:text-[#D98829]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link to="/" className="flex-shrink-0 relative z-10 group">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-[#FDFCF8] shadow-md flex items-center justify-center transition-transform group-hover:scale-105 mt-2 overflow-hidden">
              <img
                src="/logodrhoney.jpeg"
                alt="Dr. Honey Logo"
                className="w-14 object-contain"
              />
            </div>
          </Link>

          {/* RIGHT MENU */}
          <div className="flex items-center gap-8 flex-1 pl-12">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-montserrat text-[11px] font-bold tracking-[0.2em] transition-colors ${
                  isActive(link.path)
                    ? "text-[#D98829]"
                    : "text-[#5C4D3C] hover:text-[#D98829]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* CART ICON */}
            <Link
              to="/cart"
              className="text-[#5C4D3C] hover:text-[#D98829] transition-colors relative"
            >
              <ShoppingCart size={20} strokeWidth={2.5} />
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logodrhoney.jpeg"
              alt="Logo"
              className="w-8 h-8 rounded-full shadow-sm"
            />
            <span className="font-merriweather font-bold text-[#3E2F20] text-sm">
              Dr. Honey
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/cart" className="relative text-[#5C4D3C]">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3E2F20] focus:outline-none"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FDFCF8] border-t border-[#EAD2AC]/30 overflow-hidden"
          >
            <div className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-montserrat text-sm font-bold py-2 border-b border-amber-50/50 transition-colors ${
                    isActive(link.path) ? "text-[#D98829]" : "text-[#5C4D3C]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
