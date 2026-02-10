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
    price: "",
    stockQuantity: "",
    category: "Honey",
    description: "",
  });
  const [previewSource, setPreviewSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 1. Authenticate and Fetch All Data
  const fetchData = async (adminPass) => {
    setLoading(true);
    try {
      const orderRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/orders",
        {
          headers: { "x-admin-key": adminPass },
        },
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

  // --- INVENTORY ACTIONS ---
  const handleUpdateProduct = async (id, updatedFields) => {
    try {
      const res = await fetch(
        `https://dr-honey-bee-website.onrender.com/api/admin/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": password,
          },
          body: JSON.stringify(updatedFields),
        },
      );
      if (res.ok) {
        fetchData(password);
      }
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await fetch(
        `https://dr-honey-bee-website.onrender.com/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: { "x-admin-key": password },
        },
      );
      if (res.ok) {
        alert("Product deleted.");
        fetchData(password);
      }
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // --- IMAGE & UPLOAD HANDLING ---
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!previewSource) return alert("Please select a product photo!");
    setIsUploading(true);

    try {
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

      const productRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": password,
          },
          body: JSON.stringify({ ...newProduct, imageUrl: url }),
        },
      );

      if (productRes.ok) {
        alert("Product published successfully!");
        setNewProduct({
          name: "",
          price: "",
          stockQuantity: "",
          category: "Honey",
          description: "",
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

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://dr-honey-bee-website.onrender.com/api/admin/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": password,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) fetchData(password);
    } catch (err) {
      alert("Failed to update order.");
    }
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center"
        >
          <h2 className="text-[#4a3728] text-2xl mb-6 font-serif font-bold">
            🐝 Admin Portal
          </h2>
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
            className="w-full bg-[#4a3728] text-white p-3 rounded-lg font-bold hover:bg-[#5C4D3C] transition-colors"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="min-h-screen bg-[#fdfbf7] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-serif text-[#4a3728] font-bold">
            Honey Farm Dashboard
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8d6e63] text-white px-6 py-2 rounded-lg hover:bg-[#6d4c41] transition-colors text-sm font-bold"
          >
            Logout
          </button>
        </div>

        {/* 1. UPLOAD SECTION */}
        <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-xl text-[#4a3728] font-bold mb-6">
            Add New Product
          </h3>
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Product Name"
              value={newProduct.name}
              className="p-3 border rounded-lg w-full"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Price (₹)"
              type="number"
              value={newProduct.price}
              className="p-3 border rounded-lg w-full"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <select
              value={newProduct.category}
              className="p-3 border rounded-lg w-full"
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="Honey">Honey</option>
              <option value="Equipment">Equipment</option>
              <option value="Soap">Soap</option>
            </select>
            <input
              placeholder="Stock Qty"
              type="number"
              value={newProduct.stockQuantity}
              className="p-3 border rounded-lg w-full"
              onChange={(e) =>
                setNewProduct({ ...newProduct, stockQuantity: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              className="p-3 border rounded-lg w-full md:col-span-2 h-24"
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <div className="md:col-span-2">
              <input
                type="file"
                onChange={handleFileInputChange}
                accept="image/*"
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
              type="submit"
              className="md:col-span-2 bg-[#4a3728] text-white p-3 rounded-lg font-bold hover:bg-[#5C4D3C] transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Publish to Shop"}
            </button>
          </form>
        </section>

        {/* 2. INVENTORY MANAGEMENT */}
        <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-xl text-[#4a3728] font-bold mb-6">
            Manage Inventory
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#4a3728] text-left">
                  <th className="p-3 font-bold text-[#4a3728]">Product</th>
                  <th className="p-3 font-bold text-[#4a3728]">Price (₹)</th>
                  <th className="p-3 font-bold text-[#4a3728]">Stock</th>
                  <th className="p-3 font-bold text-[#4a3728]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100">
                    <td className="p-3 text-sm">{item.name}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        defaultValue={item.price}
                        className="w-20 p-1 border rounded"
                        onBlur={(e) =>
                          handleUpdateProduct(item._id, {
                            price: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        defaultValue={item.stockQuantity}
                        className="w-16 p-1 border rounded"
                        onBlur={(e) =>
                          handleUpdateProduct(item._id, {
                            stockQuantity: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteProduct(item._id)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
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

        {/* 3. ORDERS TABLE */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl text-[#4a3728] font-bold mb-6">
            Customer Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#4a3728] text-white text-left">
                  <th className="p-4 rounded-tl-lg">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Shipping Address</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200">
                    <td className="p-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm">
                      <strong className="block text-[#4a3728]">
                        {order.customer.name}
                      </strong>
                      <span className="text-gray-500">
                        {order.customer.phone}
                      </span>
                    </td>
                    <td className="p-4 text-sm max-w-xs">
                      {order.customer.address}, {order.customer.city} -{" "}
                      {order.customer.pincode}
                    </td>
                    <td className="p-4 text-sm">
                      {order.items.map((item, i) => (
                        <div key={i} className="mb-1">
                          • {item.name} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-bold text-[#4a3728]">
                      ₹{order.totalAmount}
                    </td>
                    <td
                      className={`p-4 font-bold text-sm ${
                        order.status === "PENDING"
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-4">
                      {order.status === "PENDING" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "SHIPPED")
                          }
                          className="bg-green-700 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-800"
                        >
                          Mark Shipped
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
