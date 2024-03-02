'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Img_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Img_product.init({
    id_product: DataTypes.INTEGER,
    name_img: DataTypes.STRING,
    url_img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Img_product',
  });
  return Img_product;
};