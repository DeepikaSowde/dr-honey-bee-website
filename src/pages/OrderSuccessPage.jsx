import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-6">
      {/* Icon Circle */}
      <div className="bg-[#FDF8E8] p-4 md:p-6 rounded-full mb-6 animate-bounce shadow-sm border border-[#EAD2AC]/30">
        {/* Icon Size: 48px on mobile, 64px on desktop */}
        <CheckCircle className="text-[#2e7d32] w-12 h-12 md:w-16 md:h-16" />
      </div>

      {/* Heading: text-2xl on mobile, text-4xl on desktop */}
      <h1 className="font-merriweather text-2xl md:text-4xl font-bold text-[#3E2F20] mb-3 md:mb-4">
        Order Placed Successfully!
      </h1>

      {/* Subtext: text-sm on mobile */}
      <p className="font-montserrat text-stone-600 text-sm md:text-base mb-8 max-w-md leading-relaxed">
        Thank you for choosing Dr. Honey Bee Farm. Your fresh honey is being
        prepared for shipment. You will receive a confirmation email shortly.
      </p>

      {/* Button Group: Stacks vertically on mobile (flex-col), side-by-side on desktop (sm:flex-row) */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          to="/"
          className="bg-[#3E2F20] text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-[#D98829] transition-colors w-full sm:w-auto shadow-lg text-xs md:text-sm flex justify-center"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="border-2 border-[#3E2F20] text-[#3E2F20] px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-[#FDF8E8] transition-colors w-full sm:w-auto text-xs md:text-sm flex justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
