'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  Cart.init({
    id_user: DataTypes.INTEGER,
    status: DataTypes.ENUM("Đã Đặt","Đã Hủy"),
    method_payment: DataTypes.ENUM("COD","VNPAY"),
    vnp_orderID: DataTypes.INTEGER,
    total_bank: DataTypes.DOUBLE,
    date_bank: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};