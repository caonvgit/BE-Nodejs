const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  //Phân trang
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm ",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// Patch /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};
// Patch /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id:{$in : ids} },{ status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id:{$in : ids} },{ status: "inactive" });

      break;
    default:
      break;
  }
   res.redirect("back");
};
