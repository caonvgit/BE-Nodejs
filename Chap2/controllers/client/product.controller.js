const Product = require('../../models/products.model')
// Get /products
module.exports.index= async(req, res) => {
const products = await Product.find({
  status: "active",
  deleted : false
}).sort({position: "asc"})

const newProducts = products.map(product => {
product.priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(0);
return product;
})





  res.render("client/pages/products/index",{
    pageTitle: "Danh sách sản phẩm ",
    products: newProducts,
  })
}