'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_order.init({
    id_product: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    single_price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Cart_order',
  });
  return Cart_order;
};