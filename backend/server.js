import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();
const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// --- 2. CONFIGURATIONS ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const razorpay = new Razorpay({
  // Using environment variables is safer than hardcoding live keys
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_SBZoaPcLlvwrSr",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "u7vgiCn290tKZwNpZt5rMcbt",
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
    orderId: String,
    paymentId: String,
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
    status: { type: String, default: "PAID" },
    createdAt: { type: Date, default: Date.now },
  }),
);

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    imageUrl: String,
    price: Number, // For single-price items
    stockQuantity: { type: Number, default: 0 },
    variants: [{ size: String, price: Number, stock: Number }], // For honey variants
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
    // If this fails, you will see a 401 error in the Network tab
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};

// --- 6. ROUTES ---

// Health Check / Root Route (Fixes "Cannot GET /" or "Not Found")
app.get("/", (req, res) => {
  res.send("🐝 Dr. Honey Farm API is Online!");
});

// PUBLIC: Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Secure routes
app.post("/api/admin/upload", adminAuth, async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.data, {
      folder: "dr_honey_products",
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

app.get("/api/admin/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 7. PAYMENTS (RAZORPAY) ---
app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_live_SBZoaPcLlvwrSr",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment setup failed" });
  }
});

app.post("/api/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET || "u7vgiCn290tKZwNpZt5rMcbt",
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const newOrder = new Order({ ...req.body, status: "PAID" });
      await newOrder.save();
      res.json({ success: true, message: "Payment verified!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// --- 8. START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
