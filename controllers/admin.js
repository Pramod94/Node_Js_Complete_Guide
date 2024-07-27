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

  // create method will create and immediately post to DB
  // where as build method will create and return a new object
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log("Data posted", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("Error posting to DB", err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(prodId).then((product) => {
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

  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = desc;
      // save() method saves the product to the db and returns the promise
      return product.save();
    })
    .then(() => {
      console.log("Product Saved to DB..!!!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("error deleting", err));
};
