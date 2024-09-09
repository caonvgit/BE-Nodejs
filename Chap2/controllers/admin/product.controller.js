const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

// Get /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status)

  //Loc
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted : false,
  };
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

  const products = await Product.find(find)
  .sort({position: 'asc'})
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);
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
  req.flash("success"," Cập nhập trạng thái thành công !")
  res.redirect("back");
};

// Patch /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id:{$in : ids} },{ status: "active" });
      req.flash("success",` Cập nhập trạng thái thành công ${ids.length} sản phẩm ! `)
      break;
    case "inactive":
      await Product.updateMany({ _id:{$in : ids} },{ status: "inactive" });
      req.flash("success",` Cập nhập trạng thái thành công ${ids.length} sản phẩm ! `)

      break;
      case "delete-all":
    await Product.updateMany({ _id:{$in : ids} },{ deleted: true,  deletedAt: new Date() });
    req.flash("success",` Đã xóa thành công ${ids.length} sản phẩm ! `)

      break;
      case "change-position":
        for (const product of ids) {
          let [id, position] = product.split("-");
          position = parseInt(position);
          await Product.updateOne({ _id: ids},{ 
            position: position});

        }
        req.flash("success",` Cập nhập thành công ${ids.length} số thứ tự sản phẩm ! `)
        break;
    default:
      break;
  }
   res.redirect("back");
};

// delete /admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  // Xoa vinh vien
  // await Product.deleteOne({ _id: id });

  // Xoa mem
  await Product.updateOne({ _id: id },{
    deleted: true,
    deletedAt: new Date()
  });
  req.flash("success",` Đã xóa thành công ${ids.length} sản phẩm ! `)

  res.redirect("back");
};




//[GET] Admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm ",
   
  });
};
//[POST] Admin/products/createPost
module.exports.createPost = async (req, res) => {
  if(req.body.position == ""){
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }else{
    req.body.position = parseInt(req.body.position)
  }
  const product = new Product(req.body);
  await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`)

  
};