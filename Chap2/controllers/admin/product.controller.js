const Product = require('../../models/products.model')
   // Get /admin/products
  module.exports.index = async(req,res)=>{
    // console.log(req.query.status)
    let find ={
      
    };
    if(req.query.status){
      find.status = req.query.status;
    }   
    
    const products = await Product.find(find);
    // console.log(products);


    res.render("admin/pages/products/index",{
      pageTitle : "Danh sách sản phẩm ",
      products : products
    })
    }