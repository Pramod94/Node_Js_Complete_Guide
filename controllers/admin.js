const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  console.log("req body", req.body);

  const product = new Product(title, imageUrl, price, description);

  product
    .save()
    .then(() => {
      console.log("Data posted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("Error posting to DB", err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  //req.query will catch the query params set to the URL
  // "1234?edit=true" here query param edit will be captured
  const editMode = req.query.edit;
  console.log("editMode", editMode);

  if (!editMode) {
    return res.redirect("/");
  }

  // req.params will help to access the route params
  const prodId = req.params.productId;

  console.log("prodId", prodId);

  // findByPk method is used to find data by using specific id
  Product.findOne(prodId).then((product) => {
    console.log("product", product);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const desc = req.body.description;

  const product = new Product(title, imageUrl, price, desc, prodId);

  product
    .save()
    .then(() => {
      console.log("Product Saved to DB..!!!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.delete(prodId)
    .then(() => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("error deleting", err));
};
