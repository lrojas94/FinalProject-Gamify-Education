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
              len: [6, 256]
          }
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              len: [6, 256]
          }
      },
      studentId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              notEmpty: true,
              len: [7, 256]
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
