import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increased limit for base64 image uploads

// --- CONFIGURATIONS ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🐝 Connected to Honey Farm Database"))
  .catch((err) => console.error("❌ DB Error:", err));

// --- SCHEMAS ---

// 1. Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Honey, Equipment, Soap
  description: String,
  imageUrl: String,
  price: Number, // Base price or display price
  stockQuantity: Number, // For Equipment/Soap
  variants: [
    {
      size: String,
      price: Number,
      stock: Number,
    },
  ], // For Honey
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", productSchema);

// 2. Order Schema (Crucial for the Admin Dashboard to show data)
const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  items: Array,
  totalAmount: Number,
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// --- AUTH MIDDLEWARE ---
const adminAuth = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid Admin Key" });
  }
};

// --- ROUTES ---

// Public: Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get All Orders
app.get("/api/admin/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Upload Image to Cloudinary
app.post("/api/admin/upload", adminAuth, async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "honey_farm_products",
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed" });
  }
});

// Admin: Add New Product
app.post("/api/admin/products", adminAuth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Delete Product
app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update Order Status
app.patch("/api/admin/orders/:id", adminAuth, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health Check
app.get("/", (req, res) => {
  res.send("🐝 Dr. Honey Farm API is Online!");
});

// --- SERVER START ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
