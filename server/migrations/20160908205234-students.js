'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Student', {
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
      username: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              min: 6
          }
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              min: 3
          }
      },
      studentId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              notEmpty: true,
              min: 7
          }
      },
      personId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person',
          key: 'id',
        },
        unique: true,
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Student');
  }
};
