const db = require("../models");
const Product = db.Product;
const Cat = db.Category;
const Img = db.Img_product;
const OD = db.Cart_order;
const fs = require("fs"); // package thao tác vs file
const multer = require("multer"); // package sử dụng để thao tác upload file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Hàm sử dụng để thao tác với file = multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // giới hạn dung lượng file 5MB
  },
});

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
};

const getAll = async (req, res) => {
  try {
    const result = await Product.findAll({
      include: [
        { model: Cat, attributes: ["cat_name"] },
        { model: Img, attributes: ["url_img"] },
      ],
    });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name_product, price, id_cat } = req.body;
    const exitsProduct = await Product.findOne({
      where: { name_product: name_product },
    });
    if (exitsProduct) {
      res.json({ success: false, message: "Tồn tại tên sản phẩm." });
    } else {
      const result = await Product.create({
        name_product: name_product,
        price: price,
        id_cat: id_cat,
      });

      res.json({ success: true, message: "Thêm thành công", result });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name_product, price, id_cat } = req.body;
    const exitsProduct = await Product.findOne({
      where: { name_product: name_product ,
        id: {
          [Op.not]: id, 
        },},
    });
    if (exitsProduct) {
      res.json({ success: false, message: "Tồn tại tên sản phẩm." });
    } else {
      exitsProduct.name_product = name_product;
      exitsProduct.price = price;
      exitsProduct.id_cat = id_cat;
      await exitsProduct.save();
      res.json({ success: true, message: "Cập nhập thành công", result });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const exitsProduct = await Product.findByPk(id);
    if (exitsProduct) {
      const getOrder = await OD.findAll({ where: { id_product: id } });
      if (getOrder.length == 0) {
        const imgs = await Img.findAll({
          where: { id_product: exitsProduct.id },
        });
        if (imgs.length > 0) {
          for (const img of imgs) {
            const imagePath = `./uploads/${img.name_img}`;
            deleteFile(imagePath);
            await img.destroy();
          }
        }
        await exitsProduct.destroy();
      } else {
        res.json({ success: false, message: "Tồn tại hóa đơn không thể xóa" });
      }
    } else {
      res.json({ success: false, message: "Không tồn tại tên sản phẩm." });
    }
  } catch (error) {}
};

const addImg = async(req,res)=>
{
  try {
     const id_product = req.params.id
    const exitsProduct= await Product.findByPk(id_product)
    if(!exitsProduct)
    {
      res.json({ success: false, message: "Không tồn tại sản phẩm" });
    }else
    {
      upload.array("avatar", 10)(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        // Kiểm tra nếu có file ảnh mới được chọn
        if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
                const img = await Img.create({ url_img: imageUrl, name_img: req.files[i].filename, id_product: id_product });
            }
            res.json({ success: true, message: "Thành công" });

        } else {
          res.json({ success: false, message: "Thêm tối thiểu 1 ảnh" });
        }
    });
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteImg = async(req,res)=>
{
  try {
    const id = req.params.id;
    const existImg = await Img.findByPk(id);

    if (!existImg) {
      res.json({ success: false, message: "Không tồn tại ảnh" });
    }
    const imagePath = `./uploads/${existImg.name_img}`;
    deleteFile(imagePath);
    await existImg.destroy();
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
  addImg,
  deleteImg
};
