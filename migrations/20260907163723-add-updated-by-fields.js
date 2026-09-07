'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'updatedBy', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'dima',
    });

    await queryInterface.addColumn('statistic', 'updatedBy', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'dima',
    });

    await queryInterface.addColumn('user_damage', 'updatedBy', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'dima',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'updatedBy');
    await queryInterface.removeColumn('statistic', 'updatedBy');
    await queryInterface.removeColumn('user_damage', 'updatedBy');
  },
};
