import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const FarmFooter = () => {
  return (
    // Responsive Padding: pt-12 for mobile, pt-20 for desktop
    <footer className="bg-[#2A2118] text-[#EAD2AC] relative pt-12 pb-8 md:pt-20 md:pb-10 overflow-hidden font-sans">
      {/* 1. Newsletter Section */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900"></div>

      {/* Margin Bottom: mb-10 on mobile, mb-16 on desktop */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16 relative z-10">
        <div className="bg-[#3E2F20] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between border border-[#5C4D3C] shadow-2xl">
          <div className="mb-6 md:mb-0 md:w-1/2 text-center md:text-left">
            {/* Title Size: text-2xl on mobile */}
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
              Join the Colony
            </h3>
            <p className="text-stone-400 text-sm md:text-base">
              Get weekly beekeeping tips & 10% off your first jar of raw honey.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 md:max-w-md">
            <div className="flex bg-[#2A2118] p-1 rounded-full border border-[#5C4D3C]">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-grow bg-transparent px-4 md:px-6 py-2 md:py-3 text-white outline-none placeholder-stone-600 w-full text-sm md:text-base"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-bold transition-all flex items-center gap-2 shrink-0">
                <span className="hidden md:inline">Subscribe</span>{" "}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      {/* Grid Gap: gap-8 on mobile, gap-12 on desktop */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-b border-[#3E2F20] pb-8 md:pb-12 text-center md:text-left">
        {/* Brand Column */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h2 className="text-xl md:text-2xl font-serif font-black text-white tracking-widest">
            DR. HONEY BEE FARM
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            <span className="text-stone-300 font-bold">
              Proprietor: A. Esak
            </span>
            <br />
            Ethically harvested, raw, and unfiltered honey from our family farm
            to your table.
          </p>

          <div className="inline-block bg-[#1f1811] border border-[#5C4D3C] px-3 py-1 rounded text-xs text-stone-400 tracking-wider">
            GSTIN: 33AAZPE3054F1ZR
          </div>

          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-[#3E2F20] p-3 rounded-full hover:bg-amber-600 hover:text-white transition-all text-amber-600"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-4 md:mb-6 text-sm">
            Shop
          </h4>
          <ul className="space-y-3 text-stone-400 text-sm">
            <li>
              <Link
                to="/shop/honey"
                className="hover:text-amber-500 transition-colors"
              >
                Raw Honey
              </Link>
            </li>
            <li>
              <Link
                to="/shop/equipment"
                className="hover:text-amber-500 transition-colors"
              >
                Beekeeping Equipment
              </Link>
            </li>
            <li>
              <Link
                to="/shop/bees"
                className="hover:text-amber-500 transition-colors"
              >
                Live Bee Colonies
              </Link>
            </li>
            <li>
              <Link
                to="/shop/honey"
                className="hover:text-amber-500 transition-colors"
              >
                Gift Sets
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-4 md:mb-6 text-sm">
            Support
          </h4>
          <ul className="space-y-3 text-stone-400 text-sm">
            <li>
              <Link
                to="/contact"
                className="hover:text-amber-500 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-amber-500 transition-colors"
              >
                About the Farm
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-policy"
                className="hover:text-amber-500 transition-colors"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                to="/refund-policy"
                className="hover:text-amber-500 transition-colors"
              >
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                className="hover:text-amber-500 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-white font-bold uppercase tracking-widest mb-4 md:mb-6 text-sm">
            Visit Us
          </h4>
          <ul className="space-y-4 text-stone-400 text-sm">
            <li className="flex gap-3 items-start justify-center md:justify-start text-left">
              <MapPin className="text-amber-600 shrink-0 mt-1" size={18} />
              <span>
                115A, Ottar Street, Ayakudi,
                <br />
                Palani, Dindigul (Tamilnadu)
                <br />
                Pin: 624 613
              </span>
            </li>
            <li className="flex gap-3 items-center justify-center md:justify-start">
              <Phone className="text-amber-600 shrink-0" size={18} />
              <a
                href="tel:+919994087710"
                className="hover:text-amber-500 transition-colors"
              >
                +91 99940 87710
              </a>
            </li>
            <li className="flex gap-3 items-center justify-center md:justify-start">
              <Mail className="text-amber-600 shrink-0" size={18} />
              <a
                href="mailto:esakreemas@gmail.com"
                className="hover:text-amber-500 transition-colors"
              >
                esakreemas@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-stone-600 text-[10px] md:text-xs">
        <p>
          &copy; {new Date().getFullYear()} DR. Honey Bee Farm. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default FarmFooter;
