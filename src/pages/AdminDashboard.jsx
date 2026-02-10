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
    // If category is Honey, we use variants. If Equipment, we use base price/stock.
    price: "",
    stockQuantity: "",
    variants: [], // Array for sizes: [{ size: "500g", price: 600, stock: 20 }]
  });

  // State for the temporary variant being added
  const [tempVariant, setTempVariant] = useState({
    size: "500g",
    price: "",
    stock: "",
  });

  const [previewSource, setPreviewSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // ... [fetchData and handleLogin functions remain the same] ...
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
        setError("Invalid Admin Password. Please try again.");
      }
    } catch (err) {
      setError("Server connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  // --- HELPER: Add Variant to List ---
  const addVariant = (e) => {
    e.preventDefault();
    if (!tempVariant.price || !tempVariant.stock)
      return alert("Enter price and stock for this size");

    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, tempVariant],
    });
    // Reset temp variant
    setTempVariant({ size: "500g", price: "", stock: "" });
  };

  // --- HELPER: Remove Variant ---
  const removeVariant = (index) => {
    const updated = newProduct.variants.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, variants: updated });
  };

  // --- UPLOAD & SUBMIT ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!previewSource) return alert("Please select a product photo!");

    // Validation: If Honey, must have variants. If Equipment, must have price.
    if (newProduct.category === "Honey" && newProduct.variants.length === 0) {
      return alert("Please add at least one size (e.g., 500g) for the honey.");
    }
    if (
      newProduct.category !== "Honey" &&
      (!newProduct.price || !newProduct.stockQuantity)
    ) {
      return alert("Please enter price and stock.");
    }

    setIsUploading(true);

    try {
      // 1. Upload Image
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

      // 2. Prepare Data Payload
      // If it's honey, we send the variants. If equipment, we send standard price.
      const payload = {
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: url,
        // Conditional data based on category
        ...(newProduct.category === "Honey"
          ? {
              variants: newProduct.variants,
              price: newProduct.variants[0].price,
            } // Use 1st variant price as display
          : {
              price: newProduct.price,
              stockQuantity: newProduct.stockQuantity,
            }),
      };

      // 3. Create Product
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
        alert("Product published successfully!");
        // Reset Form
        setNewProduct({
          name: "",
          price: "",
          stockQuantity: "",
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

  // ... [handleUpdateProduct, handleDeleteProduct, updateOrderStatus remain the same] ...
  const handleUpdateProduct = async (id, updatedFields) => {
    /* Same as before */
  };
  const handleDeleteProduct = async (id) => {
    /* Same as before */
  };
  const updateOrderStatus = async (id, newStatus) => {
    /* Same as before */
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  // --- RENDER ---
  if (!isAuthenticated) {
    /* Login form code remains same */ return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center"
        >
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#4a3728] text-white p-3 rounded-lg font-bold"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-serif text-[#4a3728] font-bold">
            Honey Farm Dashboard
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8d6e63] text-white px-6 py-2 rounded-lg text-sm font-bold"
          >
            Logout
          </button>
        </div>

        {/* 1. ADD PRODUCT SECTION (UPDATED) */}
        <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-xl text-[#4a3728] font-bold mb-6">
            Add New Product
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Fields */}
            <input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="p-3 border rounded-lg w-full"
            />

            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="p-3 border rounded-lg w-full"
            >
              <option value="Honey">Honey (Sold by Volume)</option>
              <option value="Equipment">Equipment (Sold by Unit)</option>
              <option value="Soap">Soap (Sold by Unit)</option>
            </select>

            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="p-3 border rounded-lg w-full md:col-span-2 h-20"
            />

            {/* --- CONDITIONAL INPUTS --- */}
            {newProduct.category === "Honey" ? (
              <div className="md:col-span-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-[#4a3728] mb-3 text-sm">
                  Add Honey Sizes (Variants)
                </h4>

                {/* Variant Entry Row */}
                <div className="flex gap-2 mb-4">
                  <select
                    value={tempVariant.size}
                    onChange={(e) =>
                      setTempVariant({ ...tempVariant, size: e.target.value })
                    }
                    className="p-2 border rounded w-1/3"
                  >
                    <option value="250g">250g</option>
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                    <option value="Liter">1 Liter</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={tempVariant.price}
                    onChange={(e) =>
                      setTempVariant({ ...tempVariant, price: e.target.value })
                    }
                    className="p-2 border rounded w-1/3"
                  />
                  <input
                    type="number"
                    placeholder="Stock Qty"
                    value={tempVariant.stock}
                    onChange={(e) =>
                      setTempVariant({ ...tempVariant, stock: e.target.value })
                    }
                    className="p-2 border rounded w-1/3"
                  />
                  <button
                    onClick={addVariant}
                    className="bg-[#4a3728] text-white px-4 rounded font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Added Variants List */}
                {newProduct.variants.length > 0 && (
                  <div className="space-y-2">
                    {newProduct.variants.map((v, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-white p-2 rounded shadow-sm text-sm"
                      >
                        <span>
                          <strong>{v.size}</strong> - ₹{v.price} ({v.stock} in
                          stock)
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeVariant(i);
                          }}
                          className="text-red-500 font-bold"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // STANDARD INPUTS (For Equipment/Soap)
              <>
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProduct.stockQuantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stockQuantity: e.target.value,
                    })
                  }
                  className="p-3 border rounded-lg w-full"
                />
              </>
            )}

            {/* Image Upload & Submit */}
            <div className="md:col-span-2">
              <input
                type="file"
                onChange={handleFileInputChange}
                className="mb-2"
              />
              {previewSource && (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md mt-2"
                />
              )}
            </div>

            <button
              onClick={handleAddProduct}
              className="md:col-span-2 bg-[#4a3728] text-white p-3 rounded-lg font-bold hover:bg-[#5C4D3C] transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Publish Product"}
            </button>
          </form>
        </section>

        {/* 2. INVENTORY LIST (Simplified for Overview) */}
        <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-xl text-[#4a3728] font-bold mb-6">
            Current Inventory
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#4a3728] text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3">Info</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100">
                    <td className="p-3 font-bold">
                      {item.name}{" "}
                      <span className="text-gray-400 text-xs block">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3">
                      {item.variants && item.variants.length > 0 ? (
                        // Display Honey Variants
                        <div className="text-sm space-y-1">
                          {item.variants.map((v, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="font-bold text-[#D98829] w-12">
                                {v.size}
                              </span>
                              <span>₹{v.price}</span>
                              <span className="text-gray-500">
                                ({v.stock} left)
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Display Standard Product
                        <div className="text-sm">
                          Price: ₹{item.price} <br /> Stock:{" "}
                          {item.stockQuantity}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteProduct(item._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. ORDERS TABLE (Same as before) */}
        {/* ... (Keep your existing Orders Table code here) ... */}
      </div>
    </div>
  );
};

export default AdminDashboard;
