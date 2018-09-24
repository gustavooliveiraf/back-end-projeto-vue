'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    secret_key: DataTypes.STRING,
    name: DataTypes.STRING,
    uid_short: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user: DataTypes.STRING
  }, {underscored: true});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};