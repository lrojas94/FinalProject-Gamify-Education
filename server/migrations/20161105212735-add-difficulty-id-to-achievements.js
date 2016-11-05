'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Achievement', 'difficultyId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Difficulty',
          key: 'id'
        }
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Achievement', 'difficultyId'),
    ]);
  }
};
