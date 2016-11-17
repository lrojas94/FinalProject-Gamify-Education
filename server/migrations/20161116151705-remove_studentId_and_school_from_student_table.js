'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
       queryInterface.removeColumn('Student', 'schoolId'),
       queryInterface.removeColumn('Student', 'studentId'),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Student',
        'schoolId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'School',
            key: 'id',
          },
          unique: true,
          allowNull: false
      }),
      queryInterface.addColumn(
        'Student',
        'studentId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Student',
            key: 'id',
          },
          unique: true,
          allowNull: false
      })
    ]);
  }
};
