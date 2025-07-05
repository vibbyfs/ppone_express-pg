'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static formatCurrency(amount) {
      return 'Rp ' + Number(amount).toLocaleString('id-ID');
    }

    static associate(models) {
      Account.hasMany(models.Transaction, { foreignKey: 'account_id' })
      Account.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Account.init({
    balance: DataTypes.DECIMAL,
    account_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};