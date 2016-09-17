'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Group', {
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
      year: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      grade: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              isIn: {
                  args: [['7', '8']],
              }
          }
      },
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teacher',
          key: 'id'
        }
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'School',
          key: 'id'
        }
      }
    })
    .then(() => {
      return Promise.all([
        queryInterface.addColumn('Student', 'groupId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Group',
            key: 'id'
          }
        }),
        queryInterface.addColumn('Problem', 'groupId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Group',
            key: 'id'
          }
        }),
      ])
    });
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('Group'),
      queryInterface.removeColumn('Student', 'groupId'),
      queryInterface.removeColumn('Problem', 'groupId'),
    ])
  }
};
