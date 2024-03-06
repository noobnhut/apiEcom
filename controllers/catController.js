const db = require("../models");
const Cat = db.Category;
const Product = db.Product;
const sequelize = require("sequelize");
const Op = sequelize.Op;

const getCat = async (req, res) => {
    try {
      const result = await Cat.findAll();
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
    }
};

const addCat = async (req, res) => {
    try {
      const { cat_name } = req.body;
  
      // Kiểm tra xem Cat đã tồn tại hay chưa
      const existingCat = await Cat.findOne({
        where: {
          cat_name: cat_name,
        },
      });
  
      if (existingCat) {
        // Nếu Cat đã tồn tại, trả về thông báo lỗi
        res.json({ success: false, message: "Cat đã tồn tại." });
      } else {
        // Nếu Cat chưa tồn tại, thêm vào cơ sở dữ liệu
        const result = await Cat.create({
          cat_name: cat_name,
        });
  
        res.json({ success: true, message: "Thêm thành công Cat." });
      }
    } catch (error) {
      console.log(error);
    }
};

  const updateCat = async (req, res) => {
    try {
      const { cat_name } = req.body;
      const id = req.params.id;
  
      // Kiểm tra xem name Cat mới đã tồn tại (ngoại trừ Cat đang được cập nhật) hay chưa
      const existingCat = await Cat.findOne({
        where: {
          cat_name: cat_name,
          id: {
            [Op.not]: id, // Loại trừ Cat có id là id đang được cập nhật
          },
        },
      });
  
      if (existingCat) {
        // Nếu name Cat đã tồn tại, trả về thông báo lỗi
        res.json({ success: false, message: "Cat đã tồn tại." });
      } else {
        // Nếu name Cat chưa tồn tại, thì update
        await Cat.update(
          {
            cat_name: cat_name,
          },
          {
            where: { id: id },
          }
        );
  
        res.json({ success: true, message: "Cập nhật thành công Cat." });
      }
    } catch (error) {
      console.log(error);
    }
};

  const deleteCat = async (req, res) => {
    try {
      const id = req.params.id;
      const existingCat = await Cat.findByPk(id);
      if (!existingCat) {
        res.json({ success: false, message: "Cat không tồn tại." });
      } else {
        const product = await Product.findAll({
          where: { id_cat: id },
        });
        if (product.length > 0) {
          res.json({ success: false, message: "Cat này đang được sử dụng không thể xóa." });
        }
        else
        {
          await existingCat.destroy()
          res.json({ success: true, message: "Xóa thành công Cat." });
        }
      }
    } catch (error) {
      console.log(error);
    }
};

  module.exports = {
    getCat,
    addCat,
    updateCat,
    deleteCat
  }
  