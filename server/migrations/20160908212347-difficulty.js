'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Difficulty', {
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
      description: {
        type: Sequelize.STRING,
        allowNull: true
      }
    })
    .then(() => {
      return queryInterface.addColumn('Problem', 'difficultyId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Difficulty',
          key: 'id'
        }
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Difficulty');
  }
};
