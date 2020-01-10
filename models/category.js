'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      as: "Category",
      foreignKey: "category_Id"
    });
  };
  return Category;
};  