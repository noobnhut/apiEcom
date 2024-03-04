const express = require("express");
const { getFullNoti, getNotiByUser, addNoti, deleteNoti } = require("../controllers/notiController");
const routerNoti = express.Router();

routerNoti.get("/api/noti/get", getFullNoti);
routerNoti.get("/api/noti/getbyuser/:id", getNotiByUser);
routerNoti.post("/api/noti/add", addNoti);
routerNoti.delete("/api/noti/delete/:id", deleteNoti);

module.exports = {
    routerNoti,
};