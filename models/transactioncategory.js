'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionCategory.belongsTo(models.Transaction, {foreignKey : 'transaction_id'})
      TransactionCategory.belongsTo(models.Category, {foreignKey : 'category_id'})
    }
  }
  TransactionCategory.init({
    transaction_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionCategory',
  });
  return TransactionCategory;
};