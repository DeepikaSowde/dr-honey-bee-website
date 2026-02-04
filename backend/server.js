import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Limit for Base64 image uploads

// --- 2. CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- 3. MONGODB CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🐝 Connected to Honey Farm Database"))
  .catch((err) => console.error("❌ Database connection error:", err));

// --- 4. SCHEMAS & MODELS ---

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
    status: { type: String, default: "PENDING" },
    createdAt: { type: Date, default: Date.now },
  }),
);

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 }, // Tracks jar count
    description: String,
    imageUrl: String,
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  }),
);

// --- 5. SECURITY MIDDLEWARE ---
const adminAuth = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};

// --- 6. ADMIN ROUTES (Protected) ---

// Image Upload to Cloudinary
app.post("/api/admin/upload", adminAuth, async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "dr_honey_products",
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed" });
  }
});

// Order Management
app.get("/api/admin/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/api/admin/orders/:id", adminAuth, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Product Management
app.post("/api/admin/products", adminAuth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 7. PUBLIC ROUTES ---

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public Checkout with Inventory Deduction
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    // 1. Save the new order
    const newOrder = new Order({ customer, items, totalAmount });
    const savedOrder = await newOrder.save();

    // 2. Loop through items and reduce stock in database
    const stockUpdates = items.map((item) => {
      return Product.findByIdAndUpdate(item._id, {
        $inc: { stockQuantity: -item.quantity }, // Decrease stock by quantity purchased
      });
    });

    await Promise.all(stockUpdates); // Execute all updates at once

    res.status(201).json({
      success: true,
      message: "Order placed and stock updated!",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 8. START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
