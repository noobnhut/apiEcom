const express = require("express");
const {  getAll,
    createProduct,
    updateProduct,
    deleteProduct,
    addImg,
    deleteImg } = require("../controllers/productController");
const routerProduct = express.Router();

routerProduct.get("/api/product/get", getAll);
routerProduct.post("/api/product/add", createProduct);
routerProduct.put("/api/product/update/:id", updateProduct);
routerProduct.delete("/api/product/delete/:id", deleteProduct);

routerProduct.post("/api/product/img/add/:id",addImg)
routerProduct.delete("/api/product/img/delete/:id",deleteImg)

module.exports = {
  routerProduct,
};
