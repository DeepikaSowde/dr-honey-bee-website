import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import crypto from "crypto";
import path from "path"; // <--- ADDED
import { fileURLToPath } from "url"; // <--- ADDED

dotenv.config();

// --- CONFIG FOR DIRECTORY PATHS (Required for ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// --- 2. CONFIGURATIONS ---

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay (Initialized with your LIVE keys)
const razorpay = new Razorpay({
  key_id: "rzp_live_SBZoaPcLlvwrSr",
  key_secret: "u7vgiCn290tKZwNpZt5rMcbt",
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
    orderId: String, // Razorpay Order ID
    paymentId: String, // Razorpay Payment ID
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
    status: { type: String, default: "PAID" }, // Default is PAID for online orders
    createdAt: { type: Date, default: Date.now },
  }),
);

// --- UPDATED PRODUCT SCHEMA (Now supports Variants) ---
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    imageUrl: String,

    // For Equipment/Soap (Single Price)
    price: { type: Number },
    stockQuantity: { type: Number, default: 0 },

    // For Honey (Multiple Sizes)
    variants: [
      {
        size: String, // e.g., "500g", "1kg"
        price: Number, // e.g., 350, 650
        stock: Number, // e.g., 20
      },
    ],

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

// Image Upload
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

// PRODUCT MANAGEMENT

// Create Product
app.post("/api/admin/products", adminAuth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Product
app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete Product
app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 7. PUBLIC ROUTES (Products) ---

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 8. PAYMENT ROUTES (Razorpay) ---

// Step 1: Create Order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise (e.g., 500 INR = 50000 paise)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: "rzp_live_SBZoaPcLlvwrSr", // Sending Key ID to frontend
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment initiation failed" });
  }
});

// Step 2: Verify Payment & Save Order
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      totalAmount,
    } = req.body;

    // Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "u7vgiCn290tKZwNpZt5rMcbt") // Using your Secret Key
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. Save Order to Database
      const newOrder = new Order({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        customer,
        items,
        totalAmount,
        status: "PAID", // Confirmed paid status
      });
      await newOrder.save();

      // 2. Reduce Stock Quantity
      const stockUpdates = items.map((item) => {
        // Handle both _id and id just in case
        const productId = item._id || item.id;
        return Product.findByIdAndUpdate(productId, {
          $inc: { stockQuantity: -item.quantity },
        });
      });
      await Promise.all(stockUpdates);

      res.json({ success: true, message: "Payment verified and order saved!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
});

// --- 9. SERVE FRONTEND (This fixes "Cannot GET /") ---
// Ensure this comes AFTER all API routes
// NOTE: Ensure your frontend build folder is named 'client/dist' or 'frontend/dist'
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// --- 10. START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
