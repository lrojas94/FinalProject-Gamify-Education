'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('School', {
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
          min: 3
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 10
        }
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      }
    })
    .then(() => {
      return Promise.all([
        queryInterface.addColumn('Student', 'schoolId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'School',
            key: 'id'
          }
        }),
        queryInterface.addColumn('Teacher', 'schoolId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'School',
            key: 'id'
          }
        }),
      ])
    });
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('School'),
      queryInterface.removeColumn('Student', 'schoolId'),
      queryInterface.removeColumn('Teacher', 'schoolId'),
    ])
  }
};
