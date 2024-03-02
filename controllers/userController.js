const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const getUser = async (req, res) => {
    try {
      const result = await User.findAll();
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (req, res) => {
    try {
      const { fullname, address, password, email } = req.body;
      console.log(fullname);
      const exsitEmail = await User.findOne({ where: { email: email } });
        if (!exsitEmail) {
          let salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          await User.create({
            fullname: fullname,
            address: address,
            password: hash,
            email: email,
            // isactive: true,
          });
          return res.json({ success: true, message: "Đăng ký thành công"});
        } else {
          return res.json({ success: false, message: "Email đã tồn tại." });
        }
    } catch (error) {
      console.log(error);
    }
  };
  
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Tìm kiếm user bằng email
      const exsitUser = await User.findOne({
        where: {
            email: email
        },
      });
  
      if (exsitUser) {
        const ismatch = await bcrypt.compare(password, exsitUser.password);
        if (!ismatch) {
          return res.json({ success: false, message: "Mật khẩu không chính xác." });
        } else {
          // Tạo JWT
          const token = jwt.sign(
            {
              userId: exsitUser.id,
            },
            JWT_SECRET,
            {
              expiresIn: JWT_EXPIRES_IN,
            }
          );
          return res.status(200).json({
            id: exsitUser.id,
            fullname: exsitUser.fullname,
            address: exsitUser.address,
            email: exsitUser.email,
            token,
          });
        }
      } else {
        return res.json({ success: false, message: "Tài khoản sai hoặc không tồn tại." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    getUser,
    register,
    login
  }