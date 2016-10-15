'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Topic', 'groupId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Group',
          key: 'id'
        }
      }),

      queryInterface.addColumn('Difficulty', 'groupId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Group',
          key: 'id'
        }
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Topic', 'groupId'),
      queryInterface.removeColumn('Difficulty', 'groupId'),
    ]);
  }
};
