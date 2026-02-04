import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
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

  // 1. Authenticate and Fetch Orders
  const fetchOrders = async (adminPass) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/orders",
        {
          headers: { "x-admin-key": adminPass },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
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
    fetchOrders(password);
  };

  // --- IMAGE HANDLING ---
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  // 2. Automated Product Upload (Cloudinary -> MongoDB)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!previewSource) return alert("Please select a product photo!");
    setIsUploading(true);

    try {
      // Step A: Upload Image to Cloudinary via Backend
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

      // Step B: Save Product Info + Cloudinary URL to MongoDB
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
        alert("Success! The product is now live on the website.");
        setNewProduct({
          name: "",
          price: "",
          stockQuantity: "",
          category: "Honey",
          description: "",
        });
        setPreviewSource("");
      }
    } catch (err) {
      alert("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Update order status to 'SHIPPED'
  const updateStatus = async (id, newStatus) => {
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

      if (res.ok) {
        fetchOrders(password); // Refresh the list after update
      }
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  // --- LOGIN SCREEN (Shown if not authenticated) ---
  if (!isAuthenticated) {
    return (
      <div style={loginContainer}>
        <form onSubmit={handleLogin} style={loginBox}>
          <h2 style={{ color: "#4a3728", marginBottom: "20px" }}>
            🐝 Admin Portal
          </h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
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

  // --- MAIN DASHBOARD SCREEN ---
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
          Honey Farm Admin Dashboard
        </h1>
        <button onClick={() => window.location.reload()} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* PRODUCT UPLOAD SECTION */}
      <section style={formSectionStyle}>
        <h3 style={{ marginTop: 0, color: "#4a3728" }}>Upload New Item</h3>
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
            <option value="Bees">Bees</option>
          </select>

          <input
            placeholder="Stock Quantity"
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
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.9rem",
              }}
            >
              Product Photo:
            </label>
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
                  width: "80px",
                  display: "block",
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
            {isUploading ? "Uploading to Cloud..." : "Publish to Shop"}
          </button>
        </form>
      </section>

      {/* ORDERS TABLE */}
      <h3 style={{ color: "#4a3728" }}>Customer Orders</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#4a3728", color: "white" }}>
            <th style={tableHeader}>Date</th>
            <th style={tableHeader}>Customer Details</th>
            <th style={tableHeader}>Shipping Address</th>
            <th style={tableHeader}>Items Ordered</th>
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
              <td style={tdStyle}>{order.customer.city}</td>
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
                    onClick={() => updateStatus(order._id, "SHIPPED")}
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
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};
const tableHeader = { padding: "15px", textAlign: "left" };
const tdStyle = { padding: "15px", verticalAlign: "top" };
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
  fontSize: "0.8rem",
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
