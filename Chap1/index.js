const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')
const Products = mongoose.model('Product',{
  title: String,
  price: Number,
  description: String,
  thumbnail: String,
})

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static("public"))
app.get('/', (req, res) => {
  res.render("products.pug",{
    title: "Danh sach san pham",
 
  });
})
app.get('/products',async(req, res) => {
  const products =  await Products.find({})
  console.log(products);
  res.send("<h1>Trang danh sach san pham </h1>")
});
app.get('/blog',(req,res)=>{
res.send("<h1>Trang danh sach bai viet </h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})