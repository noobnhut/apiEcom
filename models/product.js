'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart_order, { foreignKey: 'id_product' });
      Product.hasMany(models.Img_product, { foreignKey: 'id_product' });

      Product.belongsTo(models.Category, { foreignKey: 'id_cat' });
    }
  }
  Product.init({
    id_cat: DataTypes.INTEGER,
    name_product: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};