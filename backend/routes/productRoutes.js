const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'backImage', maxCount: 1 }
]);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post('/', upload, async (req, res) => {
  const { id, name, description, price, category, quantity } = req.body;
  const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : '';
  const backImage = req.files.backImage ? `/uploads/${req.files.backImage[0].filename}` : '';

  const product = new Product({ id, image, backImage, name, description, price, category, quantity });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product quantity
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;

  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedStock = product.quantity - quantity;

    if (updatedStock < 0) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    product.quantity = updatedStock;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
