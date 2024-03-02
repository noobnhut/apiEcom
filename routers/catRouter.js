const express = require("express");
const { getCat, addCat, updateCat, deleteCat } = require("../controllers/catController");
const routercat = express.Router();

routercat.get("/api/category/get", getCat);
routercat.post("/api/category/add", addCat);
routercat.put("/api/category/update/:id", updateCat);
routercat.delete("/api/category/delete/:id", deleteCat);

module.exports = {
  routercat,
};
