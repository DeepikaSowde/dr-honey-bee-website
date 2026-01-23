import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- 1. IMPORT THE CONTEXT PROVIDER (CRITICAL!) ---
import { CartProvider } from "./context/CartContext";

// --- 2. IMPORT NAVBAR ---
import Navbar from "./components/Navbar";

// --- 3. IMPORT COMPONENTS ---
// Note: Check your file paths! If these are in a 'components' folder,
// change "./FarmMapHero" to "./components/FarmMapHero"
import FarmMapHero from "./components/FarmMapHero";
import CategorySection from "./components/CategorySection";
import PuritySection from "./components/PuritySection";
import Testimonials from "./components/Testimonials";
import FarmFooter from "./components/FarmFooter";
import TrainingGallery from "./components/TrainingGallery";
import TrainingSection from "./components/TrainingSection";
import BestSellers from "./components/BestSellers";

// --- 4. IMPORT PAGES ---
import ProductShowcase from "./pages/ProductShowcase"; // The "Shop All" page
import ProductListPage from "./pages/ProductListPage"; // The "Category" page
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
function App() {
  return (
    // STEP 1: Wrap everything in CartProvider so the cart works everywhere
    <CartProvider>
      <BrowserRouter>
        {/* STEP 2: Add Navbar here so it shows on EVERY page */}
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

                {/* Note: We usually DON'T put ProductShowcase on Home 
                    if we have a dedicated /products route. 
                    But if you want a preview, keep it. 
                    Otherwise, remove <ProductShowcase /> from here. */}

                <PuritySection />
                <TrainingSection />
                <TrainingGallery />
                <Testimonials />
                <FarmFooter />
              </>
            }
          />

          {/* ================= DYNAMIC SHOP PAGE ================= */}
          <Route path="/shop" element={<ShopPage />} />
          {/* ================= ALL PRODUCTS PAGE ================= */}
          <Route path="/products" element={<ProductShowcase />} />

          {/* ================= CART PAGE ================= */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
