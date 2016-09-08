'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Topic', {
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
      },
      example: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
    .then(() => {
      return Promise.all([
        queryInterface.addColumn('Problem', 'topicId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Topic',
            key: 'id'
          }
        }),
      ])
    });
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('Topic'),
      queryInterface.removeColumn('Problem', 'topicId')
    ]);
  }
};
