const repo = require('./lane.repository');

/**
 * List all lanes.
 *
 * @async
 * @returns {Promise<Object[]>}
 */
const listLanes = async () => {
  const lanes = await repo.findAll();
  return lanes;
};

/**
 * List lanes with their todos filtered by todo name.
 *
 * @async
 * @param {{name?: string}} filter - Filter object.
 * @returns {Promise<Object[]>}
 */
const listLanesWithTodo = async (filter) => {
  const lanesWithTodo = await repo.laneWIthTodos(filter);
  return lanesWithTodo;
};

/**
 * Get a single lane by ID.
 *
 * @async
 * @param {number} id - Lane ID.
 * @returns {Promise<Object|null>}
 */
const getLane = async (id) => {
  const lane = await repo.findById(id);
  return lane;
};

/**
 * Add a new lane.
 *
 * @async
 * @param {Object} values - Lane values.
 * @returns {Promise<Object>}
 */
const addLane = async (values) => {
  const lane = await repo.create(values);
  return lane;
};

/**
 * Edit an existing lane.
 *
 * @async
 * @param {number} id - Lane ID.
 * @param {Object} values - Fields to update.
 * @returns {Promise<Object|null>}
 */
const editLane = async (id, values) => {
  const lane = await repo.update(id, values);
  return lane;
};

/**
 * Delete a lane by ID.
 *
 * @async
 * @param {number} id - Lane ID.
 * @returns {Promise<boolean>}
 */
const deleteLane = async (id) => {
  const success = await repo.remove(id);
  return success;
};

module.exports = {
  listLanes,
  getLane,
  addLane,
  editLane,
  deleteLane,
  listLanesWithTodo,
};
