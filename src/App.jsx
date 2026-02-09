import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- 1. IMPORT THE CONTEXT PROVIDER ---
import { CartProvider } from "./context/CartContext";

// --- 2. IMPORT NAVBAR & FOOTER ---
import Navbar from "./components/Navbar";
import FarmFooter from "./components/FarmFooter"; // Moved here so we can use it globally

// --- 3. IMPORT COMPONENTS ---
import FarmMapHero from "./components/FarmMapHero";
import CategorySection from "./components/CategorySection";
import PuritySection from "./components/PuritySection";
import Testimonials from "./components/Testimonials";
import TrainingGallery from "./components/TrainingGallery";
import TrainingSection from "./components/TrainingSection";
import BestSellers from "./components/BestSellers";

// --- 4. IMPORT PAGES ---
import ProductShowcase from "./pages/ProductShowcase";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
// Make sure this points to your PAGE component, not the data file
import ProductDetails from "./data/ProductDetails";

// --- 5. NEW: IMPORT RAZORPAY POLICY PAGES ---
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import ShippingPolicy from "./pages/ShippingPolicy";
import ScrollToTop from "./pages/ScrollToTop";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import OrderSuccessPage from "./pages/OrderSuccessPage"; // Import the file
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* NAVBAR: Shows on every page */}
        <Navbar />

        <Routes>
          {/* ================= HOME PAGE ================= */}
          <Route
            path="/"
            element={
              <>
                <FarmMapHero />
                <CategorySection />
                <BestSellers />
                <PuritySection />
                <TrainingSection />
                <TrainingGallery />
                <Testimonials />
                {/* Footer is now global, so removed from here */}
              </>
            }
          />

          {/* ================= SHOPPING PAGES ================= */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<ProductShowcase />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          {/* ================= INFO PAGES ================= */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin-login-secret" element={<AdminDashboard />} />
          {/* ================= NEW: LEGAL PAGES (Required for Razorpay) ================= */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<Terms />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>

        {/* FOOTER: Now shows on every page (Home, Shop, Policies, etc.) */}
        <FarmFooter />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
