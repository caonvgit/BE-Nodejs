const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

// Get /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status)

  //Loc
  const filterStatus = filterStatusHelper(req.query);
  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  // search
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }

 
  const products = await Product.find(find);
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm ",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
