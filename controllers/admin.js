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

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  });

  // save() comes as part of mongoose which helps to save data to db
  product
    .save()
    .then(() => {
      console.log("Data posted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("Error posting to DB", err));
};

exports.getProducts = (req, res, next) => {
  // find() method from mongoose will fetch all the products
  Product.find()
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

  // findById from mongoose will find the product with specific id
  Product.findById(prodId).then((product) => {
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

  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = desc;
      // save() from mongoose will save the product to db
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

  // findByIdAndDelete(id) will find and remove the product from db
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("error deleting", err));
};
