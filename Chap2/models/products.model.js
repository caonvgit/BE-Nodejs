const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  thumbnail: String,
  discountPercentage: Number,
  rating: Number,
  stoke: Number,
  brand: String,
  status: String,
  position: String,
  delete: Boolean,
  createdAt: { type: Date, default: Date.now },
},{
  timestamps : true, versionKey:false
})

const Product = mongoose.model('Product', productSchema,"products");
module.exports = Product;