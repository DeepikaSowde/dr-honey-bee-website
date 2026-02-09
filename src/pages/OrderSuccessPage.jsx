import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Ensure you have lucide-react installed

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-[#FDF8E8] p-6 rounded-full mb-6 animate-bounce">
        <CheckCircle size={64} className="text-[#2e7d32]" />
      </div>

      <h1 className="font-merriweather text-3xl md:text-4xl font-bold text-[#3E2F20] mb-4">
        Order Placed Successfully!
      </h1>

      <p className="font-montserrat text-stone-600 mb-8 max-w-md">
        Thank you for choosing Dr. Honey Bee Farm. Your fresh honey is being
        prepared for shipment. You will receive a confirmation email shortly.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-[#3E2F20] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#D98829] transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="border-2 border-[#3E2F20] text-[#3E2F20] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#FDF8E8] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
