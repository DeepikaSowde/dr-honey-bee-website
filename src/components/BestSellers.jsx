import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const BestSellers = () => {
  const { addToCart } = useCart();

  // --- TOP PRODUCTS DATA ---
  // Using real data structure from your DB to ensure cart compatibility
  const topProducts = [
    {
      _id: "6984446c40a9d38b6388894e", // Real DB ID for Moringa Honey
      name: "Moringa Honey",
      price: 1000, // Number format (matches DB)
      imageUrl:
        "https://res.cloudinary.com/dcrdohie2/image/upload/v1770275947/dr_honey_products/xgatxs0aippyukym5m68.jpg",
      tag: "Top Rated",
    },
    {
      _id: "698445a240a9d38b6388895a", // Real DB ID for Organic Beeswax
      name: "Organic Beeswax",
      price: 600,
      imageUrl:
        "https://res.cloudinary.com/dcrdohie2/image/upload/v1770276257/dr_honey_products/phz63xjoejupe9mbo7hz.jpg",
      tag: "Best Seller",
    },
    {
      _id: "6984472140a9d38b63888966", // Real DB ID for Uncapping Knife
      name: "Uncapping Knife",
      price: 500,
      imageUrl:
        "https://res.cloudinary.com/dcrdohie2/image/upload/v1770276640/dr_honey_products/sfqys08trobglxvxlnpo.jpg",
    },
    {
      _id: "698443eb40a9d38b6388894a", // Real DB ID for Multiflowerhoney
      name: "Multiflower Honey",
      price: 1000,
      imageUrl:
        "https://res.cloudinary.com/dcrdohie2/image/upload/v1770275818/dr_honey_products/iamroe7pfrc1uccko5aa.jpg",
      tag: "Superfood",
    },
  ];

  return (
    <section className="py-20 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">
              Fresh Harvest
            </span>
            <h2 className="text-4xl font-serif font-black text-[#3E2F20] mt-2">
              Farm Favorites
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[#5C4D3C] font-bold uppercase tracking-wider hover:text-amber-600 transition-colors"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        {/* GRID (Limit to 4 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAD2AC]/30"
            >
              {/* IMAGE */}
              <div className="h-56 relative overflow-hidden rounded-xl bg-[#F9F5F0]">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#D98829] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.imageUrl} // Using imageUrl to match DB/Cart
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* QUICK ADD BUTTON (Appears on Hover) */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-white text-[#3E2F20] p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#3E2F20] hover:text-white"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>

              {/* INFO */}
              <div className="mt-4">
                <h3 className="font-merriweather font-bold text-[#3E2F20] text-lg leading-tight">
                  {product.name}
                </h3>
                <p className="font-montserrat text-[#D98829] font-bold mt-1 text-lg">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#3E2F20] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs"
          >
            Shop All <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
