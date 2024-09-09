const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
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
  position: Number,
  slug:{
    type: String,
    slug: 'title',
    unique: true,
  },
  deleted: {
    type: Boolean,
        default: false,
  },
  createdAt: { type: Date, default: Date.now },
},{
  timestamps : true, versionKey:false
})

const Product = mongoose.model('Product', productSchema,"products");
module.exports = Product;