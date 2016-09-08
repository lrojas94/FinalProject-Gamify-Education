'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Answer', {
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
      studentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Student',
              key: 'id'
          }
      },
      problemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Problem',
              key: 'id'
          }
      },
      solutionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Solution',
              key: 'id'
          }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Answer');
  }
};
