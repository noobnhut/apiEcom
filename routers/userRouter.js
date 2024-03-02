const express = require("express");
const { register, login, getUser  } = require("../controllers/userController");
const routerUser = express.Router();

routerUser.post("/api/user/login", login);
routerUser.post("/api/user/register", register);

routerUser.get("/api/user/get", getUser);

module.exports = {
  routerUser,
};
