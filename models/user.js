'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    handphone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.TEXT,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Product, {
      as: "Product",
      foreignKey: "created_By"
    });
  };
  return User;
};