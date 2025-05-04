const Lane = require('./lane.model');
const Todo = require('../todo/todo.model');
const { Op } = require('sequelize');

/**
 * Retrieve all lanes including their todos, optionally filtered by todo name.
 *
 * @async
 * @param {{name?: string}} [filter] - Optional filter object.
 * @returns {Promise<Object[]>} Array of plain lane objects with embedded todos.
 */
const laneWIthTodos = async (filter) => {
  const todoWhere = filter?.name ? { name: { [Op.iLike]: `%${filter.name}%` } } : undefined;

  const lanes = await Lane.findAll({
    include: {
      model: Todo,
      as: 'todos',
      where: todoWhere,
      required: false,
    },
    order: [['position', 'ASC']],
  });

  return lanes.map((lane) => lane.get({ plain: true }));
};

/**
 * Fetch all lanes ordered by position.
 *
 * @async
 * @returns {Promise<import('./lane.model').default[]>} All lane rows.
 */
const findAll = async () => {
  const rows = await Lane.findAll({ order: [['position', 'ASC']] });
  return rows;
};

/**
 * Find a lane by its primary key.
 *
 * @async
 * @param {number} id - Lane ID.
 * @returns {Promise<import('./lane.model').default|null>} The lane row or null if not found.
 */
const findById = async (id) => {
  const row = await Lane.findByPk(id);
  return row;
};

/**
 * Create a new lane.
 *
 * @async
 * @param {Object} values - Values to create the lane with.
 * @returns {Promise<import('./lane.model').default>} The created lane row.
 */
const create = async (values) => {
  const row = await Lane.create(values);
  return row;
};

/**
 * Update an existing lane.
 *
 * @async
 * @param {number} id - Lane ID.
 * @param {Object} values - Values to update.
 * @returns {Promise<import('./lane.model').default|null>} The updated lane row or null if not found.
 */
const update = async (id, values) => {
  const row = await Lane.findByPk(id);

  if (row) {
    await row.update(values);
  }

  return row;
};

/**
 * Delete a lane by its ID.
 *
 * @async
 * @param {number} id - Lane ID.
 * @returns {Promise<boolean>} True if deletion succeeded.
 */
const remove = async (id) => {
  const deletedRows = await Lane.destroy({ where: { id } });
  const success = deletedRows === 1;
  return success;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  laneWIthTodos,
};
