'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn('users', 'updatedBy', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'system',
    });

    await queryInterface.addColumn('statistic', 'updatedBy', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'system',
    });

    await queryInterface.addColumn('user_damage', 'updatedBy', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'system',
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('users', 'updatedBy');
    await queryInterface.removeColumn('statistic', 'updatedBy');
    await queryInterface.removeColumn('user_damage', 'updatedBy');
  },
};
