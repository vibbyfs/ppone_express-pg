'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'user_id' })
    }

    get formatDate() {
      return this.date_of_birth.toISOString().split('T')[0]
    }

  }
  UserProfile.init({
    user_id: DataTypes.INTEGER,
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Fullname is required" },
        notEmpty: { msg: "Fullname cannot be empty" },
        len: {
          args: [3, 100],
          msg: "Fullname must be between 3 and 100 characters"
        }
      }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Date of birth is required" },
        isDate: { msg: "Date of birth must be a valid date" },
        isValidAge(value) {
          const now = new Date()
          const birth = new Date(value)
          const age = now.getFullYear() - birth.getFullYear()
          if (age < 18) {
            throw new Error("Minimal age 18 year")
          }
        }
      }
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Address is required" },
        notEmpty: { msg: "Address cannot be empty" }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone number is required" },
        notEmpty: { msg: "Phone number cannot be empty" },
        isNumeric: { msg: "Phone number must contain only numbers" },
        len: {
          args: [10, 15],
          msg: "Phone number must be 10 to 15 digits"
        }
      }
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};