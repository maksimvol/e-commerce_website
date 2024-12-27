const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  backImage: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;