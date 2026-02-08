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

  // --- INVENTORY ACTIONS (Update Price/Stock/Delete) ---
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

  if (!isAuthenticated) {
    return (
      <div style={loginContainer}>
        <form onSubmit={handleLogin} style={loginBox}>
          <h2 style={{ color: "#4a3728", marginBottom: "20px" }}>
            🐝 Admin Portal
          </h2>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
          {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#4a3728", fontFamily: "serif" }}>
          Honey Farm Dashboard
        </h1>
        <button onClick={() => window.location.reload()} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* 1. UPLOAD SECTION */}
      <section style={formSectionStyle}>
        <h3 style={{ marginTop: 0, color: "#4a3728" }}>Add New Product</h3>
        <form
          onSubmit={handleAddProduct}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <input
            placeholder="Product Name"
            value={newProduct.name}
            style={inputStyle}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <input
            placeholder="Price (₹)"
            type="number"
            value={newProduct.price}
            style={inputStyle}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
          <select
            value={newProduct.category}
            style={inputStyle}
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
            style={inputStyle}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stockQuantity: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            style={{ ...inputStyle, gridColumn: "span 2" }}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <div style={{ gridColumn: "span 2" }}>
            <input
              type="file"
              onChange={handleFileInputChange}
              accept="image/*"
            />
            {previewSource && (
              <img
                src={previewSource}
                alt="Preview"
                style={{
                  width: "60px",
                  marginTop: "10px",
                  borderRadius: "4px",
                }}
              />
            )}
          </div>
          <button
            type="submit"
            style={{ ...btnStyle, gridColumn: "span 2" }}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Publish to Shop"}
          </button>
        </form>
      </section>

      {/* 2. INVENTORY MANAGEMENT */}
      <section style={formSectionStyle}>
        <h3 style={{ color: "#4a3728" }}>Manage Inventory</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{ borderBottom: "2px solid #4a3728", textAlign: "left" }}
              >
                <th style={tdStyle}>Product</th>
                <th style={tdStyle}>Price (₹)</th>
                <th style={tdStyle}>Stock</th>
                <th style={tdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      defaultValue={item.price}
                      style={{ width: "80px" }}
                      onBlur={(e) =>
                        handleUpdateProduct(item._id, { price: e.target.value })
                      }
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      defaultValue={item.stockQuantity}
                      style={{ width: "60px" }}
                      onBlur={(e) =>
                        handleUpdateProduct(item._id, {
                          stockQuantity: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDeleteProduct(item._id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                      }}
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
      <h3 style={{ color: "#4a3728" }}>Customer Orders</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#4a3728", color: "white" }}>
            <th style={tableHeader}>Date</th>
            <th style={tableHeader}>Customer</th>
            <th style={tableHeader}>Shipping Address</th>
            <th style={tableHeader}>Items</th>
            <th style={tableHeader}>Total</th>
            <th style={tableHeader}>Status</th>
            <th style={tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td style={tdStyle}>
                <strong>{order.customer.name}</strong>
                <br />
                {order.customer.phone}
              </td>
              <td style={tdStyle}>
                {order.customer.address}, {order.customer.city} -{" "}
                {order.customer.pincode}
              </td>
              <td style={tdStyle}>
                {order.items.map((item, i) => (
                  <div key={i}>
                    • {item.name} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td style={tdStyle}>₹{order.totalAmount}</td>
              <td
                style={{
                  ...tdStyle,
                  color: order.status === "PENDING" ? "orange" : "green",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </td>
              <td style={tdStyle}>
                {order.status === "PENDING" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "SHIPPED")}
                    style={shipBtn}
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
  );
};

// --- STYLES ---
const loginContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#fdfbf7",
};
const loginBox = {
  padding: "40px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "350px",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};
const formSectionStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  marginBottom: "40px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
};
const tableHeader = { padding: "15px", textAlign: "left" };
const tdStyle = { padding: "12px", verticalAlign: "top" };
const btnStyle = {
  backgroundColor: "#4a3728",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
const shipBtn = {
  backgroundColor: "#2e7d32",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};
const logoutBtn = {
  backgroundColor: "#8d6e63",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminDashboard;
