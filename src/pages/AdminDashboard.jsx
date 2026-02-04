import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Function to fetch orders using the password in headers
  const fetchOrders = async (adminPass) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/admin/orders",
        {
          headers: { "x-admin-key": adminPass }, // Sends password for server verification
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

  // 2. Function to update order status to 'SHIPPED'
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

  // 3. Login Screen (Shown if not authenticated)
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

  // 4. Main Dashboard Screen
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

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
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
                <br />
                <span style={{ fontSize: "0.8rem", color: "#666" }}>
                  {order.customer.email}
                </span>
              </td>
              <td style={tdStyle}>
                {order.customer.address}, {order.customer.city} -{" "}
                {order.customer.pincode}
              </td>
              <td style={tdStyle}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ fontSize: "0.9rem" }}>
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
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};
const tableHeader = { padding: "15px", textAlign: "left" };
const tdStyle = { padding: "15px", verticalAlign: "top" };
const btnStyle = {
  width: "100%",
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
