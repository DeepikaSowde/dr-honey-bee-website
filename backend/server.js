import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// --- CONFIGURATIONS ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_SBZoaPcLlvwrSr",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- DATABASE ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🐝 Connected to Honey Farm Database"))
  .catch((err) => console.error("❌ DB Error:", err));

// --- SCHEMAS ---
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    imageUrl: String,
    price: Number,
    variants: [{ size: String, price: Number, stock: Number }],
    inStock: { type: Boolean, default: true },
  }),
);

// --- ROUTES ---

// Prevents "Cannot GET /" and "Not Found"
app.get("/", (req, res) => {
  res.send("🐝 Dr. Honey Farm API is Online!");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));
