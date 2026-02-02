import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Initialize dotenv
const app = express();

// --- 1. MIDDLEWARE ---
// Allows your Cloudflare frontend to talk to this Render backend
app.use(cors());
app.use(express.json());

// --- 2. MONGODB CONNECTION ---
// The MONGO_URI is pulled from your .env file for security
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🐝 Connected to Honey Farm Database"))
  .catch((err) => console.error("❌ Database connection error:", err));

// --- 3. ORDER MODEL ---
// Defines the structure for storing orders in MongoDB
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "PENDING" }, // Status defaults to PENDING
    createdAt: { type: Date, default: Date.now },
  }),
);

// --- 4. CHECKOUT ROUTE ---
// Receives data from the CheckoutPage.jsx frontend
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    // Create a new order document based on the model
    const newOrder = new Order({
      customer,
      items,
      totalAmount,
    });

    // Save the order to MongoDB Atlas
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order received and saved!",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 5. START SERVER ---
// Render automatically provides a PORT environment variable
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
