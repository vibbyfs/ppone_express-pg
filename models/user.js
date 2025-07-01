'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const saltRounds = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

  User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
      const saltRounds = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

  return User;
};