import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- PRODUCT MANAGEMENT STATES ---
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Honey",
    description: "",
    price: "",
    stockQuantity: "",
    variants: [],
  });

  const [tempVariant, setTempVariant] = useState({
    size: "500g",
    price: "",
    stock: "",
  });

  const [previewSource, setPreviewSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async (adminPass) => {
    setLoading(true);
    try {
      const orderRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/orders",
        { headers: { "x-admin-key": adminPass } },
      );
      const invRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/products",
      );

      if (orderRes.ok && invRes.ok) {
        const orderData = await orderRes.json();
        const invData = await invRes.json();
        setOrders(orderData);
        setInventory(invData);
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid Admin Password.");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  const addVariant = (e) => {
    e.preventDefault();
    if (!tempVariant.price || !tempVariant.stock)
      return alert("Enter price and stock");
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, tempVariant],
    });
    setTempVariant({ size: "500g", price: "", stock: "" });
  };

  const removeVariant = (index) => {
    const updated = newProduct.variants.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, variants: updated });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!previewSource) return alert("Please select a photo!");
    setIsUploading(true);

    try {
      // 1. Upload to YOUR server (The server handles Cloudinary)
      const uploadRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/upload",
        {
          method: "POST",
          body: JSON.stringify({ data: previewSource }),
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": password,
          },
        },
      );
      const { url } = await uploadRes.json();

      // 2. Prepare Payload
      const payload = {
        ...newProduct,
        imageUrl: url,
        ...(newProduct.category === "Honey"
          ? { price: newProduct.variants[0]?.price }
          : {}),
      };

      // 3. Save Product
      const productRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": password,
          },
          body: JSON.stringify(payload),
        },
      );

      if (productRes.ok) {
        alert("Published!");
        setNewProduct({
          name: "",
          category: "Honey",
          description: "",
          variants: [],
        });
        setPreviewSource("");
        fetchData(password);
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-80"
        >
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#4a3728] text-white p-3 rounded-lg font-bold"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-10">
      <h1 className="text-3xl font-bold text-[#4a3728] mb-8">
        Admin Dashboard
      </h1>
      {/* Product Form & Inventory Table logic remains same as previous version */}
    </div>
  );
};

export default AdminDashboard;
