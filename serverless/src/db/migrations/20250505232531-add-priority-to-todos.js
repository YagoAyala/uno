'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('priorities', {
      id:         { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name:       { type: Sequelize.STRING,  allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE,    allowNull: false },
      updated_at: { type: Sequelize.DATE,    allowNull: false },
    });

    const now = new Date();
    await queryInterface.bulkInsert('priorities', [
      { id: 1, name: 'without_priority', created_at: now, updated_at: now },
      { id: 2, name: 'low',              created_at: now, updated_at: now },
      { id: 3, name: 'medium',           created_at: now, updated_at: now },
      { id: 4, name: 'high',             created_at: now, updated_at: now },
    ]);

    await queryInterface.addColumn('todos', 'priority_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: { model: 'priorities', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('todos', 'priority_id');
    await queryInterface.dropTable('priorities');
  },
};
