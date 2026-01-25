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
    <footer className="bg-[#2A2118] text-[#EAD2AC] relative pt-20 pb-10 overflow-hidden font-sans">
      {/* 1. Newsletter Section */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="bg-[#3E2F20] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-[#5C4D3C] shadow-2xl">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h3 className="text-3xl font-serif text-white mb-2">
              Join the Colony
            </h3>
            <p className="text-stone-400">
              Get weekly beekeeping tips & 10% off your first jar of raw honey.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 md:max-w-md">
            <div className="flex bg-[#2A2118] p-1 rounded-full border border-[#5C4D3C]">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-grow bg-transparent px-6 py-3 text-white outline-none placeholder-stone-600 w-full"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 md:px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shrink-0">
                <span className="hidden md:inline">Subscribe</span>{" "}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#3E2F20] pb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-black text-white tracking-widest">
            DR. HONEY BEE FARM
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
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

          <div className="flex gap-4 pt-4">
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
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
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

        {/* Support & Legal (UPDATED FOR RAZORPAY) */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
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

            {/* 👇 THESE LINKS ARE REQUIRED FOR APPROVAL */}
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
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
            Visit Us
          </h4>
          <ul className="space-y-4 text-stone-400 text-sm">
            <li className="flex gap-3 items-start">
              <MapPin className="text-amber-600 shrink-0" size={20} />
              <span>
                115A, Ottar Street, Ayakudi,
                <br />
                Palani, Dindigul (Tamilnadu)
                <br />
                Pin: 624 613
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="text-amber-600 shrink-0" size={20} />
              <a
                href="tel:+919994087710"
                className="hover:text-amber-500 transition-colors"
              >
                +91 99940 87710
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="text-amber-600 shrink-0" size={20} />
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
      <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-stone-600 text-xs">
        <p>
          &copy; {new Date().getFullYear()} DR. Honey Bee Farm. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default FarmFooter;
