'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Problem', 'deletedAt', {
      type: Sequelize.DATE
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Problem', 'deletedAt');
  }
};
