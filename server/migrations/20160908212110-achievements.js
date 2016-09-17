'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Achievement', {
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
          len: [3, 256]
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      thresholdQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      thresholdPercent: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      iconUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      topicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Topic',
          key: 'id'
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Achievement');
  }
};
