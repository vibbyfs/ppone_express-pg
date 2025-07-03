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
    user_id: DataTypes.INTEGER,
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Fullname required.'
        },
        notEmpty: {
          msg: 'Fullname required.'
        },
        len: {
          args: [3, 100],
          msg: 'Fullname 3-100 chars.'
        }
      }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date of birth required.'
        },
        isDate: {
          msg: 'Invalid date of birth.'
        },

      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address required.'
        },
        notEmpty: {
          msg: 'Address required.'
        },
        len: {
          args: [10, 255],
          msg: 'Address 10-255 chars.'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Phone number required.'
        },
        notEmpty: {
          msg: 'Phone number required.'
        },
        isNumeric: {
          msg: 'Phone number must be numeric.'
        },
        len: {
          args: [10, 15],
          msg: 'Phone number 10-15 digits.'
        },
        is: {
          args: /^(\+62|0)\d{9,13}$/,
          msg: 'Invalid phone number format.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};