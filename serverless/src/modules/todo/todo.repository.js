const { Op } = require('sequelize');
const Todo   = require('./todo.model');

/**
 * Find all todos with optional filtering.
 *
 * @async
 * @param {{id?: number, name?: string}} [filter={}] - Filter options.
 * @returns {Promise<Object[]>}
 */
const findAll = async (filter = {}) => {
  const where = {};
  if (filter.id)   where.id   = filter.id;
  if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };

  const items = await Todo.findAll({ where });

  return items;
};

/**
 * Find a single todo by exact name.
 *
 * @async
 * @param {string} name - Todo name.
 * @returns {Promise<Object|null>}
 */
const findByName = async (name) => {
  const item = await Todo.findOne({ where: { name } });

  return item;
};

/**
 * Insert a new todo with default lane id 1.
 *
 * @async
 * @param {{name: string, priority_id?: number}} values - Todo values.
 * @returns {Promise<Object>} The created todo.
 */
const insert = async ({ name, priority_id = 1 }) => {
  const created = await Todo.create({
    name,
    lane_id: 1,
    priority_id,
  });

  return created;
};

/**
 * Update a todo by id.
 *
 * @async
 * @param {number} id - Todo ID.
 * @param {Object} values - Fields to update.
 * @returns {Promise<boolean>} True if exactly one row was updated.
 */
const update = async (id, values) => {
  const [rows] = await Todo.update(
    { ...values, updated_at: new Date() },
    { where: { id } },
  );
  const success = rows === 1;

  return success;
};

/**
 * Update the lane_id of a todo.
 *
 * @async
 * @param {number} id - Todo ID.
 * @param {number} laneId - New lane ID.
 * @returns {Promise<void>}
 */
const updateLaneId = async (id, laneId) => {
  await Todo.update(
    { lane_id: laneId, updated_at: new Date() },
    { where: { id } },
  );
};

/**
 * Delete a todo by id.
 *
 * @async
 * @param {number} id - Todo ID.
 * @returns {Promise<boolean>} True if exactly one row was deleted.
 */
const deleteById = async (id) => {
  const rows = await Todo.destroy({ where: { id } });
  const success = rows === 1;

  return success;
};

module.exports = {
  findAll,
  findByName,
  insert,
  update,
  deleteById,
  updateLaneId,
};
