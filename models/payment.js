'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    quantity: DataTypes.INTEGER,
    totalHarga: DataTypes.INTEGER,
    status: DataTypes.STRING,
    image: DataTypes.TEXT,
    buyer_Id: DataTypes.INTEGER,
    product_Id: DataTypes.INTEGER
  }, {});
  Payment.associate = function(models) {

  };
  return Payment;
};