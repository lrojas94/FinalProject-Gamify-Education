'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('StudentAchievements', {
      studentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Student',
            key: 'id'
        }
      },
      achievementId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Achievement',
            key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('StudentAchievements');
  }
};
