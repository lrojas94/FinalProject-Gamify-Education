'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Teacher', 'personId')
    .then(() => {
      return queryInterface.addColumn(
        'Teacher',
        'personId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Person',
            key: 'id',
          },
          unique: true
        }
      )
    })

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Teacher', 'personId')
    .then(() => {
      return queryInterface.addColumn(
        'Teacher',
        'personId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Person',
            key: 'id',
          },
          unique: true,
          allowNull: false
      })
    })
  }
};
