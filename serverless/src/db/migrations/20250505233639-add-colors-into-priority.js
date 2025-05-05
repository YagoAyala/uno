'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('priorities', 'color', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#9e9e9e',
    });

    await queryInterface.bulkUpdate('priorities', { color: '#9e9e9e' }, { id: 1 });
    await queryInterface.bulkUpdate('priorities', { color: '#4caf50' }, { id: 2 });
    await queryInterface.bulkUpdate('priorities', { color: '#ff9800' }, { id: 3 });
    await queryInterface.bulkUpdate('priorities', { color: '#f44336' }, { id: 4 });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('priorities', 'color');
  },
};
