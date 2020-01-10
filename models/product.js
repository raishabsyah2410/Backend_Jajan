'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    tittle: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    category_Id: DataTypes.INTEGER,
    created_By: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.User, {
      foreignKey: "created_By",
      as:"User"
    });
    Product.belongsTo(models.Category, {
      foreignKey: "category_Id",
      as:"Category"
    });
  };
  return Product;
};