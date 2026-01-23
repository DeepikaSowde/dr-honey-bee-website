import React from "react";
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
      {/* 1. Newsletter Section (The Lead Magnet) */}
      {/* Golden top border for separation */}
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
            DR. HONEY
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Ethically harvested, raw, and unfiltered honey from our family farm
            to your table. Preserving nature's sweetness since 1995.
          </p>
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
            {[
              "Raw Honey",
              "Manuka Medicinal",
              "Beeswax Candles",
              "Gift Sets",
              "Wholesale",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
            Support
          </h4>
          <ul className="space-y-3 text-stone-400 text-sm">
            {[
              "Track Order",
              "Shipping Policy",
              "Refunds",
              "FAQ",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  {item}
                </a>
              </li>
            ))}
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
                123 Honeycomb Lane,
                <br />
                Green Valley, CA 90210
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="text-amber-600 shrink-0" size={20} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="text-amber-600 shrink-0" size={20} />
              <span>hello@drhoney.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-stone-600 text-xs">
        <p>&copy; 2026 Dr. Honey Bee Farm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FarmFooter;
