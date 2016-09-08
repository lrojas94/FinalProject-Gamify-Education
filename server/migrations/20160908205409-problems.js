'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Problem', {
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
      problem: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              min: 6
          }
      },
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teacher',
          key: 'id'
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Problem');
  }
};
