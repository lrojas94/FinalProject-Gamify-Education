'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('persons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 3
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 3
        }
      },
      birthDay: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        validate: {
          isIn: {
            args: [['m', 'f']],
            msg: lang.es.errors.db.person.genderValidation
          }
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('persons');
  }
};
